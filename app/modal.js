const app = require("polka");
const body = require("body-parser");
const axios = require("axios");
const qs = require("qs");
const apiUrl = "https://slack.com/api";

const openModal = async trigger_id => {
    const modal = {
        type: "modal",
        title: {
            type: "plain_text",
            text: "My App",
            emoji: true
        },
        submit: {
            type: "plain_text",
            text: "Submit",
            emoji: true
        },
        close: {
            type: "plain_text",
            text: "Cancel",
            emoji: true
        },
        "blocks": [
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": "This is a section block with a button."
                },
                "accessory": {
                    "type": "button",
                    "text": {
                        "type": "plain_text",
                        "text": "Click Me",
                        "emoji": true
                    },
                    "value": "click_me_123",
                    "action_id": "button-action"
                }
            }
        ]
    };

    const args = {
        token: process.env.SLACK_BOT_TOKEN,
        trigger_id: trigger_id,
        view: JSON.stringify(modal)
    };

    const result = await axios.post(`${apiUrl}/views.open`, qs.stringify(args));
};




module.exports = {
    openModal
};
