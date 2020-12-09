const app = require('polka');
const dialog = require(`./dialog`);
const {
    PORT = 3000
} = process.env;

app()
    .use(`/`, dialog),
    .listen(PORT, err => {
        if (err) throw err;
        console.log(`> Running on localhost:${PORT}`);
    });
