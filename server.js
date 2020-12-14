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
    .app.post('/slack/actions', async (req, res) => {
        const {
            token,
            trigger_id,
            user,
            actions,
            type
        } = JSON.parse(req.body.payload);
        if (actions && actions[0].action_id.match(/add_/)) {
            openModal(trigger_id);
        }
    })
    .listen(PORT, err => {
        if (err) throw err;
        console.log(`> Running on localhost:${PORT}`);
    });
