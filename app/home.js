const app = require('polka');

function events(type, user) {
    console.log(type);
    console.log(evetype);
    app()
        .post('/slack/events', async (req, res) => {
            // Triggered when the App Home is opened by a user
            if (type === 'app_home_opened') {
                // Display App Home
                console.log('home');
            }
        });
};


module.exports = events;
