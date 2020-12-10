const app = require("polka");
const axios = require("axios");
const qs = require("qs");
const apiUrl = 'https://slack.com/api';


const events = async (type, user) => {
    console.log(type);
    // Triggered when the App Home is opened by a user
    if (type === "app_home_opened") {
        // Display App Home
        const args = {
            token: process.env.SLACK_BOT_TOKEN,
            user_id: user,
            view: await updateView(user)
        };
        const result = await axios.post(`${apiUrl}/views.publish`, qs.stringify(args));
    }
};

const updateView = async user => {
    console.log("aaa");
    let blocks = [
        {
            // Section with text and a button
            type: "section",
            text: {
                type: "mrkdwn",
                text: "*Welcome!* \nThis is a home for Stickers app. You can add small notes here!"
            },
            accessory: {
                type: "button",
                action_id: "add_note",
                text: {
                    type: "plain_text",
                    text: "Add a Stickie"
                }
            }
        },
        // Horizontal divider line
        {
            type: "divider"
        }
    ];

    let view = {
        type: "home",
        title: {
            type: "plain_text",
            text: "Keep notes!"
        },
        blocks: blocks
    };

    return JSON.stringify(view);
};

module.exports = {
    events
};
