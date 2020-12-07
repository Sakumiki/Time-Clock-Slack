const polka = require('polka');
const {
    json
} = require('body-parser');
const {
    PORT = 3000
} = process.env;

polka()
    .use(json())
    .post('/', (req, res) => {
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        let text = req.body.text;
        let data = {
            reponse_tipe: `in_channel`,
            text: `ポルカおるよ`,
        };
        res.json(data);
    })
    .listen(PORT, err => {
        if (err) throw err;
        console.log(`> Running on localhost:${PORT}`);
    });
