const { db } = require("../config/db.js");
// const bcrypt = require('bcrypt');


const _register = (user_email, password) => {
    return db("users")
        .insert({ user_email, password })
        .returning(["id", "user_email"])
};


const _login = (user_email) => {
    return db("users")
        .select("id", "user_email", "password")
        .where({ user_email })
};
// const _register = async (user_email, password) => {
//     try {
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);

//         const [newUser] = await db("users")
//             .insert({ user_email, password: hashedPassword })
//             .returning(["id", "user_email"]);

//         return { user_email: newUser.user_email };
//     } catch (error) {
//         throw error;
//     }
// };

// const _login = async (user_email, password) => {
//     try {
//         const user = await db("users")
//             .select("id", "user_email", "password")
//             .where({ user_email })
//             .first();

//         if (!user) {
//             return null; // User not found
//         }

//         const passwordMatch = await bcrypt.compare(password, user.password);

//         if (!passwordMatch) {
//             return null; // Incorrect password
//         }

//         return { id: user.id, user_email: user.user_email };
//     } catch (error) {
//         throw error;
//     }
// };

module.exports = {
    _register,
    _login
};
