require("dotenv").config();
const express = require("express");
const cors = require("cors");
const colors = require("colors");

const db = require("./models");

const app = express();

app.use(cors());
app.use(express.json());

const auth = require("./middlewares/requiredAuth");

app.get("/", auth, (req, res) => {
    res.end(`Email is ${req.user.email}`);
});

const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, () =>
    console.log(`Listening on http://localhost:${PORT}`.yellow.inverse.bold)
);

db.user.hasOne(db.config, { foreignKey: "user_id", onDelete: "cascade" });

db.sequelize.sync().then(() => server);

const authRoutes = require("./routes/authRoutes");

app.use("/api/auth", authRoutes);
