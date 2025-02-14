import React from "react";
import { Button, message, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { POST } from "../../../providers/useAxiosQuery";

const VerifyEmail = () => {
    const navigate = useNavigate();
    const { mutate: resendVerification, isLoading } = POST(
        `api/email/resend`,
        "users_verification"
    );

    const handleResendEmail = () => {
        resendVerification(null, {
            onSuccess: () => message.success("Verification email resent!"),
            onError: () => message.error("Failed to resend email."),
        });
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <Typography.Title level={3}>Verify Your Email</Typography.Title>
            <Typography.Paragraph>
                A verification link has been sent to your email. Please check
                your inbox and follow the link to verify your account.
            </Typography.Paragraph>
            {/* <Button type="primary" onClick={() => navigate("/sign-in")}>
                Go to Login
            </Button> */}
            {/* <br /> */}
            <Button type="link" onClick={handleResendEmail} loading={isLoading}>
                Resend Verification Email
            </Button>
        </div>
    );
};

export default VerifyEmail;
