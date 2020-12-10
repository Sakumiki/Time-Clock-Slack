const app = require('polka');

function route() {
    app()
        .use('/dialog', dialog);
}


exports.routes = routes;
