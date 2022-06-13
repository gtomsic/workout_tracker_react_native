const jwt = require("jsonwebtoken");
const db = require("../models");

module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res
            .status(401)
            .send({ message: `You must login to access this routes!` });
    }

    jwt.verify(authorization, process.env.JWT_SECRET, async (err, payload) => {
        if (err) {
            return res
                .status(401)
                .send({ message: `You must login to access this routes!` });
        }
        const { user_id } = payload;

        const user = await db.user.findOne({ where: { id: user_id } });
        req.user = user;
        next();
    });
};
