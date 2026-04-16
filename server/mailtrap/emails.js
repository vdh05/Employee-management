import { VERIFICATION_EMAIL_TEMPLATE, PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE } from "./emailtemplates.js";
import { transporter, sender } from "./mailtrap.config.js";

const fromAddress = `"${sender.name}" <${sender.email}>`;

export const SendVerificationEmail = async (email, verificationcode) => {
    try {
        const info = await transporter.sendMail({
            from: fromAddress,
            to: email,
            subject: "Verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationcode),
        });
        console.log("Verification email sent:", info.messageId);
        return true;
    } catch (error) {
        console.error("Error sending verification email:", error);
        return false;
    }
};

export const SendWelcomeEmail = async (email, firstname, lastname, role) => {
    try {
        const subject = role === "HR-Admin"
            ? "Welcome to EMS - HR Admin"
            : "Welcome to EMS";

        const html = role === "HR-Admin"
            ? `<p>Welcome <b>${firstname} ${lastname}</b> (HR) to EMS!</p>`
            : `<p>Welcome <b>${firstname} ${lastname}</b> to EMS!</p>`;

        const info = await transporter.sendMail({
            from: fromAddress,
            to: email,
            subject,
            html,
        });
        console.log("Welcome email sent:", info.messageId);
        return true;
    } catch (error) {
        console.error("Error sending welcome email:", error);
        return false;
    }
};

export const SendForgotPasswordEmail = async (email, resetURL) => {
    try {
        const info = await transporter.sendMail({
            from: fromAddress,
            to: email,
            subject: "Reset Your Password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
        });
        console.log("Forgot password email sent:", info.messageId);
        return true;
    } catch (error) {
        console.error("Error sending forgot password email:", error);
        return false;
    }
};

export const SendResetPasswordConfimation = async (email) => {
    try {
        const info = await transporter.sendMail({
            from: fromAddress,
            to: email,
            subject: "Password Reset Successfully",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
        });
        console.log("Reset password confirmation email sent:", info.messageId);
        return true;
    } catch (error) {
        console.error("Error sending reset password confirmation email:", error);
        return false;
    }
};
