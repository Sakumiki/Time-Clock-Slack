const app = require('polka');
const body = require('body-parser');

const openModal = async (trigger_id) => {

    const modal = {
        "type": "modal",
        "title": {
            "type": "plain_text",
            "text": "My App",
            "emoji": true
        },
        "submit": {
            "type": "plain_text",
            "text": "Submit",
            "emoji": true
        },
        "close": {
            "type": "plain_text",
            "text": "Cancel",
            "emoji": true
        },
        "blocks": [
            {
                "type": "divider"
            }
        ]
    };

    const args = {
        token: process.env.SLACK_BOT_TOKEN,
        trigger_id: trigger_id,
        view: JSON.stringify(modal)
    };

    const result = await axios.post('/views.open', qs.stringify(args));
};
