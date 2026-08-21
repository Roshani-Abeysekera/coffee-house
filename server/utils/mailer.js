const nodemailer = require("nodemailer");

// Builds a real SMTP transporter if credentials are supplied via .env,
// otherwise falls back to logging the email to the console so the app
// still "works" in a fresh checkout with no mail provider configured.
function buildTransporter() {
    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
        return null;
    }

    return nodemailer.createTransport({
        host: SMTP_HOST,
        port: Number(SMTP_PORT) || 587,
        secure: Number(SMTP_PORT) === 465,
        auth: { user: SMTP_USER, pass: SMTP_PASS },
    });
}

const transporter = buildTransporter();

exports.sendMail = async ({ to, subject, html, text }) => {
    if (!transporter) {
        console.log("\n---- EMAIL (SMTP not configured, printing instead) ----");
        console.log(`To: ${to}`);
        console.log(`Subject: ${subject}`);
        console.log(text || html);
        console.log("---------------------------------------------------------\n");
        return { delivered: false };
    }

    await transporter.sendMail({
        from: process.env.EMAIL_FROM || `"Coffee House" <no-reply@coffeehouse.local>`,
        to,
        subject,
        html,
        text,
    });

    return { delivered: true };
};
