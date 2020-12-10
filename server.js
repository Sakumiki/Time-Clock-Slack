const app = require("polka");
const body = require("body-parser");
const modal = require("./app/modal");
const arrive = require("./app/arrive");
const home = require("./app/home");
const {
    PORT = 3000
} = process.env;

app()
    .use(body.json())
    .use(
        body.urlencoded({
            extended: true
        })
    )
    .use("/syukkin", arrive)
    .post("/slack/events", async (req, res) => {
        const {
            type,
            user,
            channel,
            tab,
            text,
            subtype
        } = req.body.event;

        await home.events(type, user);
    })
    .listen(PORT, err => {
        if (err) throw err;
        console.log(`> Running on localhost:${PORT}`);
    });
