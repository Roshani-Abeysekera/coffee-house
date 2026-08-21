const db = require("../config/db");

const createUser = async (name, email, password) => {
    const query = `
        INSERT INTO users (name, email, password)
        VALUES ($1, $2, $3)
        RETURNING *`;

    const values = [name, email, password];
    const result = await db.query(query, values);

    return result.rows[0];
};

const findUserByEmail = async (email) => {
    const result = await db.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
    );

    return result.rows[0];
};

const findUserById = async (id) => {
    const result = await db.query(
        "SELECT * FROM users WHERE id = $1",
        [id]
    );

    return result.rows[0];
};

const updateUserPassword = async (id, hashedPassword) => {
    const result = await db.query(
        "UPDATE users SET password = $1 WHERE id = $2 RETURNING *",
        [hashedPassword, id]
    );

    return result.rows[0];
};

module.exports = {
    createUser,
    findUserByEmail,
    findUserById,
    updateUserPassword,
};
