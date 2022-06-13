const router = require("express").Router();
const db = require("../models");
const auth = require("../middlewares/requiredAuth");

router.use(auth);

router.get("/", async (req, res) => {
    const user_id = req.user.id;
    const tracks = await db.track.findAll({
        where: { user_id },
        include: [db.location],
    });
    res.status(200).send(tracks);
});

router.post("/", async (req, res) => {
    const { title } = req.body;
    if (!title) {
        return res
            .status(422)
            .send({ message: "Please provide a valid title!" });
    }
    try {
        const track = await db.track.create({
            name: `${req.user.first_name} ${req.user.last_name}`,
            title,
            user_id: req.user.id,
        });
        req.track = track;
        res.send(track);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

module.exports = router;
