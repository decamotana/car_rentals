import { useEffect, useState } from "react";
import { Modal, Row, Col, Button, Empty } from "antd";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import { PDFDocument, rgb, StandardFonts, degrees } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import downloadjs from "downloadjs";

import { Container } from "./draggable_components/Container";
import { CustomDragLayer } from "./draggable_components/CustomDragLayer";
import moment from "moment";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

export default function ModalPdfFilePreview(props) {
    const { toggleModalPdfFilePreview, setToggleModalPdfFilePreview } = props;

    const [numPages, setNumPages] = useState();
    const [pageNumber, setPageNumber] = useState(1);
    const [signatureX, setSignatureX] = useState(360);
    const [signatureY, setSignatureY] = useState(-150);
    const [pdfWidth, setPdfWidth] = useState(0);
    const [pdfHeight, setpdfHeight] = useState(0);

    useEffect(() => {
        if (
            toggleModalPdfFilePreview.data &&
            toggleModalPdfFilePreview.data.file_path
        ) {
            console.log(
                "toggleModalPdfFilePreview.data",
                toggleModalPdfFilePreview.data
            );
            async function getPdfPropertyValue() {
                const url = toggleModalPdfFilePreview.data.file_path;
                const existingPdfBytes = await fetch(url).then((res) =>
                    res.arrayBuffer()
                );
                const pdfDoc = await PDFDocument.load(existingPdfBytes);
                const pages = pdfDoc.getPages();
                const firstPage = pages[0];
                const { width, height } = firstPage.getSize();
                setpdfHeight(height);
                setPdfWidth(width);
            }

            getPdfPropertyValue();
        }

        return () => {};
    }, [signatureX, signatureY, toggleModalPdfFilePreview]);

    const onDocumentLoadSuccess = (e) => {
        setNumPages(e.numPages);
    };

    const downloadPdf = async () => {
        console.log("downloadPdf signatureY", signatureY);
        console.log("downloadPdf signatureX", signatureX);
        let pdf_file_name =
            toggleModalPdfFilePreview.data.pdf_file_name ?? "epdffsuudsac.pdf";

        const url = toggleModalPdfFilePreview.data.file_path;
        const existingPdfBytes = await fetch(url).then((res) =>
            res.arrayBuffer()
        );

        // const fontBytes =
        //     "../../../../assets/fonts/Montserrat/Montserrat-Regular.ttf";

        // Font.register({
        //     family: "Montserrat-Regular",
        //     format: "truetype",
        //     src: fontBytes,
        // });

        const pdfDoc = await PDFDocument.load(existingPdfBytes);

        // Register the `fontkit` instance
        // pdfDoc.registerFontkit(fontkit);

        const signatureUrl = toggleModalPdfFilePreview.data.signature;
        const signatureImageBytes = await fetch(signatureUrl).then((res) =>
            res.arrayBuffer()
        );

        const signatureImage = await pdfDoc.embedPng(signatureImageBytes);
        const signatureImageDims = signatureImage.scale(0.25);

        const pages = pdfDoc.getPages();
        const firstPage = pages[0];
        const { width, height } = firstPage.getSize();

        let signXPos = signatureX;
        let signYPos = Math.round(250 + signatureY);

        console.log("bef signYPos", signYPos);
        // if (signYPos < 100) {
        //     signYPos = 100 - parseInt(signatureY);
        // }
        console.log("aft signYPos", signYPos);

        firstPage.drawImage(signatureImage, {
            x: signXPos,
            y: signYPos,
            width: signatureImageDims.width,
            height: signatureImageDims.height,
        });

        // const customFont = await pdfDoc.embedFont(fontBytes);
        let dateCreated = `Date Created`;
        let textMoment = `${moment().format("MM/DD/YYYY")}`;

        firstPage.drawText(dateCreated, {
            x: signXPos + 120,
            y: signYPos + 20,
            size: 8,
            // font: customFont,
            // color: rgb(0, 0.53, 0.71),
        });
        firstPage.drawText(textMoment, {
            x: signXPos + 120,
            y: signYPos + 10,
            size: 8,
            // font: customFont,
            // color: rgb(0, 0.53, 0.71),
        });

        const pdfBytes = await pdfDoc.save();
        downloadjs(pdfBytes, pdf_file_name, "application/pdf");
    };

    const handlePdfFileRender = () => {
        if (
            toggleModalPdfFilePreview.data &&
            toggleModalPdfFilePreview.data.file_path
        ) {
            return (
                <>
                    <DndProvider backend={HTML5Backend}>
                        <Container
                            height={pdfHeight}
                            content={
                                toggleModalPdfFilePreview.data.signature && (
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 5,
                                        }}
                                    >
                                        <img
                                            src={
                                                toggleModalPdfFilePreview.data
                                                    .signature
                                            }
                                            alt="pdf"
                                            style={{
                                                width: 120,
                                            }}
                                        />
                                        <div
                                            style={{
                                                fontSize: 10,
                                                width: 60,
                                            }}
                                        >
                                            Date Created <br />
                                            {moment().format("MM/DD/YYYY")}
                                        </div>
                                    </div>
                                )
                            }
                            setSignatureX={setSignatureX}
                            setSignatureY={setSignatureY}
                        >
                            <Document
                                file={toggleModalPdfFilePreview.data.file_path}
                                onLoadSuccess={onDocumentLoadSuccess}
                            >
                                <Page
                                    pageNumber={pageNumber}
                                    renderTextLayer={false}
                                />
                            </Document>
                        </Container>

                        <CustomDragLayer />
                    </DndProvider>

                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            gap: 12,
                        }}
                    >
                        <div className="action">
                            <Button
                                onClick={() =>
                                    setPageNumber((ps) => (ps > 1 ? ps - 1 : 1))
                                }
                                className={
                                    pageNumber > 1 ? "btn-main-primary" : ""
                                }
                            >
                                PREV
                            </Button>
                            <Button
                                onClick={() =>
                                    setPageNumber((ps) =>
                                        ps < numPages ? ps + 1 : numPages
                                    )
                                }
                                className={
                                    numPages !== pageNumber
                                        ? "btn-main-primary"
                                        : ""
                                }
                            >
                                NEXT
                            </Button>
                        </div>

                        <div
                            style={{
                                width: "100%",
                                textAlign: "center",
                            }}
                        >
                            <Button
                                onClick={() => downloadPdf()}
                                className="btn-main-primary"
                            >
                                DOWNLOAD
                            </Button>
                        </div>
                    </div>
                </>
            );
        } else {
            <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="No File Pdf"
            />;
        }
    };

    return (
        <Modal
            classNames={{
                wrapper: "modal-form-pdf-file-preview",
            }}
            width={pdfWidth + 30}
            title="PDF File Form"
            open={toggleModalPdfFilePreview.open}
            onCancel={() =>
                setToggleModalPdfFilePreview({
                    open: false,
                    data: null,
                })
            }
            footer={[
                <Button
                    className="btn-main-primary outlined"
                    key={0}
                    onClick={() =>
                        setToggleModalPdfFilePreview({
                            open: false,
                            data: null,
                        })
                    }
                >
                    Close
                </Button>,
            ]}
            forceRender
        >
            <Row gutter={[12, 0]}>
                <Col xs={24} sm={24} md={24}>
                    {handlePdfFileRender()}
                </Col>
            </Row>
        </Modal>
    );
}
