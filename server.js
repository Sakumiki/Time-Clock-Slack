const app = require('polka');
const modal = require('./app/modal');
const arrive = require('./app/arrive');
const hoem = require('./app/home');
const {
    PORT = 3000
} = process.env;

app()
    .use('/syukkin', arrive)
    .post('/slack/events', async (req, res) => {
                const {
                    type,
                    user,
                    channel,
                    tab,
                    text,
                    subtype
                } = req.body.event;

                await home.events(req.body.type, type);
            }
            .listen(PORT, err => {
                if (err) throw err;
                console.log(`> Running on localhost:${PORT}`);
            });
