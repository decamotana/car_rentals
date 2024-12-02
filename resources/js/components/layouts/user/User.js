import React, { useEffect, useState } from "react";
import { faGifts, faHome, faRefresh } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Breadcrumb, Button, Layout } from "antd";
import ClearCache from "react-clear-cache";
import { Link } from "react-router-dom";
import { SpinnerDotted } from "spinners-react";

import { bgColor } from "../../providers/companyInfo";
import Header from "./Header";
import Footer from "./Footer";

export default function User(props) {
    const {
        children,
        moduleName,
        moduleCode,
        title,
        subtitle,
        breadcrumb,
        pageHeaderIcon,
        pageHeaderClass,
        pageId,
        className,
    } = props;

    // console.log("User props", props);

    const items = new Array(15).fill(null).map((_, index) => ({
        key: index + 1,
        label: `nav ${index + 1}`,
    }));

    return (
        <ClearCache>
            {({ isLatestVersion, emptyCacheStorage }) => (
                <>
                    {!isLatestVersion && (
                        <div className="notification-notice">
                            <div className="notification-notice-content">
                                <div className="notification-notice-icon">
                                    <FontAwesomeIcon icon={faGifts} />
                                </div>
                                <div className="notification-notice-message">
                                    <div className="title">
                                        Updates Now Available
                                    </div>
                                    <div className="description">
                                        A new version of this Web App is ready
                                    </div>
                                    <div className="action">
                                        <Button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                emptyCacheStorage();
                                            }}
                                            icon={
                                                <FontAwesomeIcon
                                                    icon={faRefresh}
                                                />
                                            }
                                        >
                                            Refresh
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="globalLoading hide">
                        <SpinnerDotted
                            thickness="100"
                            color={bgColor}
                            enabled={true}
                        />
                    </div>

                    <Layout className="layout-client">
                        <Header />

                        <Layout.Content style={{ padding: "0 48px" }}>
                            <Breadcrumb
                                className="mt-15 mb-15"
                                separator={<span className="arrow" />}
                                items={[
                                    {
                                        title: (
                                            <Link to="/userHome">
                                                <FontAwesomeIcon
                                                    icon={faHome}
                                                />
                                            </Link>
                                        ),
                                    },
                                    ...(breadcrumb && breadcrumb.length > 0
                                        ? breadcrumb.map((item, index) => {
                                              let colorRed = "";
                                              if (breadcrumb.length > 1) {
                                                  if (
                                                      breadcrumb.length ===
                                                      index + 1
                                                  ) {
                                                      colorRed =
                                                          "breadcrumb-item-last";
                                                  }
                                              }
                                              return {
                                                  title: item.name,
                                                  className: `cursor-pointer font-14px breadcrumb-item-text ${colorRed} ${
                                                      item.className
                                                          ? ` ${item.className}`
                                                          : ""
                                                  }`,
                                                  id: item.id ?? "",
                                                  onClick: () => {
                                                      if (item.link) {
                                                          navigate(item.link);
                                                      }
                                                  },
                                              };
                                          })
                                        : []),
                                ]}
                            />

                            {/* <div
                                style={{
                                    background: colorBgContainer,
                                    minHeight: 280,
                                    padding: 24,
                                    borderRadius: borderRadiusLG,
                                }}
                            >
                                Content
                            </div> */}

                            {children}
                        </Layout.Content>

                        <Footer />
                    </Layout>
                </>
            )}
        </ClearCache>
    );
}
