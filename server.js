const polka = require('polka');

function one(req, res, next) {
    req.hello = 'world';
    next();
}

function two(req, res, next) {
    req.foo = '...needs better demo 😔';
    next();
}

polka()
    .use(one, two)
    .get('/', (req, res) => {
        console.log(`~> Hello, ${req.hello}`);
        res.end(`Polka oruka?`);
    })
    .listen(3000, err => {
        if (err) throw err;
        console.log(`> Running on localhost:3000`);
    });
