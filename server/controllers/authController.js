const bcrypt = require("bcrypt");
const {
    createUser,
    findUserByEmail,
    findUserById,
    updateUserPassword,
} = require("../models/userModel");
const { generateToken, generateResetToken, verifyResetToken } = require("../utils/jwt");
const { sendMail } = require("../utils/mailer");

exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Name, email and password are required" });
        }

        const existingUser = await findUserByEmail(email);

        if (existingUser) {
            return res.status(400).json({ message: "Email already registered" });
        }

        const hashed = await bcrypt.hash(password, 10);
        const newUser = await createUser(name, email, hashed);

        const token = generateToken(newUser);

        const user = { ...newUser };
        delete user.password;

        res.status(201).json({ token, user });
    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ message: "Server error during signup" });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await findUserByEmail(email);

        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const valid = await bcrypt.compare(password, user.password);

        if (!valid) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = generateToken(user);

        const userData = { ...user };
        delete userData.password;

        res.json({ token, user: userData });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Server error during login" });
    }
};

// Returns the profile of the currently authenticated user
exports.profile = async (req, res) => {
    try {
        const user = await findUserById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const userData = { ...user };
        delete userData.password;

        res.json(userData);
    } catch (error) {
        console.error("Profile Error:", error);
        res.status(500).json({ message: "Server error fetching profile" });
    }
};

// Sends a real password-reset email (or logs it to the console if SMTP
// isn't configured yet). Always responds with a generic success message
// so we don't leak whether an email address is registered.
exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const user = await findUserByEmail(email);

        if (user) {
            const resetToken = generateResetToken(user);
            const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";
            const resetLink = `${clientUrl}/reset-password?token=${resetToken}`;

            await sendMail({
                to: user.email,
                subject: "Reset your Coffee House password",
                html: `
                    <p>Hi ${user.name},</p>
                    <p>Click the link below to reset your password. This link expires in 15 minutes.</p>
                    <p><a href="${resetLink}">${resetLink}</a></p>
                    <p>If you didn't request this, you can safely ignore this email.</p>
                `,
                text: `Reset your password: ${resetLink} (expires in 15 minutes)`,
            });
        }

        res.json({ message: "If that email is registered, a reset link has been sent." });
    } catch (error) {
        console.error("Forgot Password Error:", error);
        res.status(500).json({ message: "Server error processing request" });
    }
};

// Completes the reset flow: verifies the token from the email link and
// sets a new password.
exports.resetPassword = async (req, res) => {
    try {
        const { token, password } = req.body;

        if (!token || !password) {
            return res.status(400).json({ message: "Token and new password are required" });
        }

        let decoded;
        try {
            decoded = verifyResetToken(token);
        } catch (err) {
            return res.status(400).json({ message: "Reset link is invalid or has expired" });
        }

        const hashed = await bcrypt.hash(password, 10);
        await updateUserPassword(decoded.id, hashed);

        res.json({ message: "Password updated. You can now log in." });
    } catch (error) {
        console.error("Reset Password Error:", error);
        res.status(500).json({ message: "Server error resetting password" });
    }
};

exports.seedAdmin = async (req, res) => {
    try {
        const existing = await findUserByEmail("test@test.com");

        if (existing) {
            return res.status(200).json({ message: "Admin user already exists" });
        }

        const hashedPassword = await bcrypt.hash("password", 10);
        await createUser("Test User", "test@test.com", hashedPassword);

        res.status(201).json({ message: "Admin user seeded successfully" });
    } catch (error) {
        console.error("Error seeding admin user:", error);
        res.status(500).json({ message: "Failed to seed admin user" });
    }
};
