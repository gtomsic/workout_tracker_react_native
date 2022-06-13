const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuid } = require("uuid");
const db = require("../models");

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res
            .status(422)
            .send({ message: "Valid email or password is required!" });
    }
    try {
        const user = await db.user.findOne({ where: { email } });
        if (!user) {
            return res
                .status(422)
                .send({ message: "Invalid email or password!" });
        } else {
            const getPass = await db.config.findOne({
                where: { user_id: user.id },
            });
            const decryptPass = bcrypt.compareSync(password, getPass.password);
            if (decryptPass) {
                const token = jwt.sign(
                    { user_id: user.id },
                    process.env.JWT_SECRET
                );
                res.status(201).send({ token });
            } else {
                return res
                    .status(401)
                    .send({ message: `Username or password don't match!` });
            }
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("Server error!");
    }
});

router.post("/register", async (req, res) => {
    const data = { ...req.body, id: uuid() };
    try {
        if (data.password !== data.confirmed_password) {
            return res.status(401).send({ message: `Password don't mactch!` });
        }
        const user = await db.user.findOne({ where: { email: data.email } });
        if (!user) {
            const hashPass = await bcrypt.hashSync(data.password, 10);
            const createdUser = await db.user.create(data);
            const config = await db.config.create({
                user_id: createdUser.id,
                password: hashPass,
            });
            if (createdUser && config) {
                const token = jwt.sign(
                    { user_id: createdUser.id },
                    process.env.JWT_SECRET
                );
                res.status(201).send({ token });
            }
        } else {
            res.send({ message: "User already exist!" });
        }
    } catch (err) {
        console.log(err.message);
        return res.status(500).send("Server error!");
    }
});

module.exports = router;
