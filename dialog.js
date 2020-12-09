const app = require('polka');
const body = require('body-parser');

module.exports = app()
    .use(body.json())
    .use(body.urlencoded({
        extended: true
    }))
    .post('/', (req, res) => {
        res.writeHead(200, {
            'Content-Type': 'application/json',
            'X-Error-Code': 'Please dont do this IRL'
        });
        console.log(req.body.text);
        let data = JSON.stringify({
            response_type: 'in_channel',
            text: 'ポルカおるよ'
        });
        console.log(data);
        res.end(data);
    });
