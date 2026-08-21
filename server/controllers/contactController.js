const { sendMail } = require("../utils/mailer");

exports.sendContactMessage = async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ message: "Name, email and message are all required" });
        }

        const to = process.env.CONTACT_EMAIL || process.env.EMAIL_FROM || "hello@coffeehouse.local";

        await sendMail({
            to,
            subject: `New contact form message from ${name}`,
            html: `
                <p><strong>From:</strong> ${name} (${email})</p>
                <p><strong>Message:</strong></p>
                <p>${message.replace(/\n/g, "<br />")}</p>
            `,
            text: `From: ${name} (${email})\n\n${message}`,
        });

        res.json({ message: "Message sent! We'll get back to you soon." });
    } catch (error) {
        console.error("Contact form error:", error);
        res.status(500).json({ message: "Couldn't send your message right now. Please try again." });
    }
};
