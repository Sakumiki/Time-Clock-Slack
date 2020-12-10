const app = require('polka');

function events(type, evetype) {
    console.log(type);
    console.log(evetype);
    app()
        .post('/slack/events', async (req, res) => {
            switch (type) {

                case 'url_verification': {
                    // verify Events API endpoint by returning challenge if present
                    res.send({
                        challenge: req.body.challenge
                    });
                    break;
                }

                case 'event_callback': {
                    // Verify the signing secret
                    if (!signature.isVerified(req)) {
                        res.sendStatus(404);
                        return;
                    }
                    // Request is verified --
                    else {
                        // Triggered when the App Home is opened by a user
                        if (evetype === 'app_home_opened') {
                            // Display App Home
                        }
                    }
                    break;
                }

                default: {
                    res.sendStatus(404);
                }
            }

        });
};


module.exports = events;
