const app = require('polka');
const {
    PORT = 3000
} = process.env;

app().listen(PORT, err => {
    if (err) throw err;
    console.log(`> Running on localhost:${PORT}`);
});
