const app = require('polka');
const body = require('body-parser');
const {
    PORT = 3000
} = process.env;

app()
    .use(body.urlencoded({
        extended: true
    }))
    .post('/syukkin', (req, res) => {
        res.writeHead(200, {
            'Content-Type': 'application/json',
            'X-Error-Code': 'Please dont do this IRL'
        });
        console.log(req.body.text);
        let data = JSON.stringify({
            response_type: `in_channel`,
            text: `ポルカおるよ`
        });
        console.log(data);
        res.end(data);
    });
