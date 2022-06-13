const router = require("express").Router();
const db = require("../models");
const auth = require("../middlewares/requiredAuth");

router.use(auth);

router.get("/", async (req, res) => {
    const track_id = req.track.id;
    const tracks = await db.point.findAll({
        where: { track_id },
        include: [db.point],
    });
    res.status(200).send(tracks);
});

router.post("/", async (req, res) => {
    const {
        track_id,
        timestamp,
        latitude,
        longitude,
        altitude,
        accuracy,
        heading,
        speed,
    } = req.body;
    console.log(req.track);
    if (
        !timestamp ||
        !latitude ||
        !longitude ||
        !altitude ||
        !accuracy ||
        !heading ||
        !speed
    ) {
        return res.status(422).send({ message: "Location is not valid!" });
    }
    try {
        const location = await db.location.create({
            user_id: req.user.id,
            track_id,
            timestamp,
            latitude,
            longitude,
            altitude,
            accuracy,
            heading,
            speed,
        });

        res.send(location);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

module.exports = router;
