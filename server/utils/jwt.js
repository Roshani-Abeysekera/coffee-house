const jwt = require("jsonwebtoken");

// Auth token used to identify a logged-in user
exports.generateToken = (user) => {
    return jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );
};

// Short-lived token used only for password-reset links
exports.generateResetToken = (user) => {
    return jwt.sign(
        { id: user.id, purpose: "reset" },
        process.env.JWT_SECRET,
        { expiresIn: "15m" }
    );
};

exports.verifyResetToken = (token) => {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.purpose !== "reset") {
        throw new Error("Invalid token purpose");
    }

    return decoded;
};
