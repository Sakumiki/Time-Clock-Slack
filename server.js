const app = require("polka");
var geolocation = require("geolocation");
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
    .post("/slack/actions", async (req, res) => {
        const {
            token,
            trigger_id,
            user,
            actions,
            type
        } = JSON.parse(
            req.body.payload
        );
        if (actions && actions[0].action_id.match(/add_/)) {
            // Open a modal window with forms to be submitted by a user
            modal.openModal(trigger_id);
        } else if (actions && actions[0].action_id.match(/button-action/)) {
            console.log("pushed button");
            // geolocation test
            geolocation.getCurrentPosition(function (err, position) {
                if (err) throw err;
                console.log(position);
            });
        }
        // Modal forms submitted --
        else if (type === "view_submission") {
            res.send(""); // Make sure to respond to the server to avoid an error

            const ts = new Date();
            const {
                user,
                view
            } = JSON.parse(req.body.payload);

            const data = {};

            home.events(user.id, data);
        } else {
            console.log("button error");
        }
    })
    .listen(PORT, err => {
        if (err) throw err;
        console.log(`> Running on localhost:${PORT}`);
    });
