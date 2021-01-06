const app = require("polka");
const body = require("body-parser");
const axios = require("axios");
const qs = require("qs");
const apiUrl = "https://slack.com/api";

const openModal = async trigger_id => {
    const modal = {
        "title": {
            "type": "plain_text",
            "text": "出退勤登録",
            "emoji": true
        },
        "submit": {
            "type": "plain_text",
            "text": "Submit",
            "emoji": true
        },
        "type": "modal",
        "close": {
            "type": "plain_text",
            "text": "Cancel",
            "emoji": true
        },
        "blocks": [
            {
                "type": "divider"
            },
            {
                "type": "section",
                "text": {
                    "type": "plain_text",
                    "text": "出退勤日時",
                    "emoji": true
                }
            },
            {
                "type": "actions",
                "elements": [
                    {
                        "type": "static_select",
                        "placeholder": {
                            "type": "plain_text",
                            "text": "Select item",
                            "emoji": true
                        },
                        "options": [
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "出勤",
                                    "emoji": true
                                },
                                "value": "svalue-0"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "退勤",
                                    "emoji": true
                                },
                                "value": "svalue-1"
                            }
                        ]
                    },
                    {
                        "type": "datepicker",
                        "initial_date": "1990-04-28",
                        "placeholder": {
                            "type": "plain_text",
                            "text": "Select a date",
                            "emoji": true
                        }
                    },
                    {
                        "type": "static_select",
                        "placeholder": {
                            "type": "plain_text",
                            "text": "Select item",
                            "emoji": true
                        },
                        "options": [
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "0時"
                                },
                                "value": "hvalue-0"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "1時"
                                },
                                "value": "hvalue-1"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "2時"
                                },
                                "value": "hvalue-2"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "3時"
                                },
                                "value": "hvalue-3"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "4時"
                                },
                                "value": "hvalue-4"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "5時"
                                },
                                "value": "hvalue-5"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "6時"
                                },
                                "value": "hvalue-6"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "7時"
                                },
                                "value": "hvalue-7"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "8時"
                                },
                                "value": "hvalue-8"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "9時"
                                },
                                "value": "hvalue-9"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "10時"
                                },
                                "value": "hvalue-10"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "11時"
                                },
                                "value": "hvalue-11"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "12時"
                                },
                                "value": "hvalue-12"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "13時"
                                },
                                "value": "hvalue-13"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "14時"
                                },
                                "value": "hvalue-14"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "15時"
                                },
                                "value": "hvalue-15"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "16時"
                                },
                                "value": "hvalue-16"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "17時"
                                },
                                "value": "hvalue-17"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "18時"
                                },
                                "value": "hvalue-18"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "19時"
                                },
                                "value": "hvalue-19"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "20時"
                                },
                                "value": "hvalue-20"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "21時"
                                },
                                "value": "hvalue-21"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "22時"
                                },
                                "value": "hvalue-22"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "23時"
                                },
                                "value": "hvalue-23"
                            }

                        ]
                    },
                    {
                        "type": "static_select",
                        "placeholder": {
                            "type": "plain_text",
                            "text": "Select an item",
                            "emoji": true
                        },
                        "options": [
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "00分"
                                },
                                "value": "mvalue-0"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "10分"
                                },
                                "value": "mvalue-10"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "20分"
                                },
                                "value": "mvalue-20"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "30分"
                                },
                                "value": "mvalue-30"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "40分"
                                },
                                "value": "mvalue-40"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "50分"
                                },
                                "value": "mvalue-50"
                            }
                        ]
                    },
                    {
                        "type": "checkboxes",
                        "options": [
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "夜勤",
                                },
                                "value": "stvalue-0"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "遅刻",
                                },
                                "value": "stvalue-1"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "残業",
                                },
                                "value": "stvalue-2"
                            }
                        ]
                    }
                ]
            },
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": "位置情報の付与"
                },
                "accessory": {
                    "type": "radio_buttons",
                    "options": [
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "位置情報を付与する",
                                "emoji": true
                            },
                            "value": "value-1"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "位置情報を付与しない",
                                "emoji": true
                            },
                            "value": "value-2"
                        }
                    ]
                }
            },
            {
                "type": "input",
                "element": {
                    "type": "plain_text_input",
                    "multiline": true,
                },
                "label": {
                    "type": "plain_text",
                    "text": "作業内容",
                    "emoji": true
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
