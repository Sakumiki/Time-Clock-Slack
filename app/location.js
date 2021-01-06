const {
    Client
} = require("@googlemaps/google-maps-services-js");
const client = new Client({});
const axios = require("axios");

// Get data
const getLocation = async =>{
    client
        .geolocate({
                params: {
                    outputFormat: "json",
                    languege: "ja",
                    key: process.env.GOOGLE_MAPS_API_KEY
                },
                timeout: 1000 // milliseconds
            },
            axios
        )
        .geocode({
                params: {
                    outputFormat: "json",
                    languege: "ja",
                    key: process.env.GOOGLE_MAPS_API_KEY
                },
                timeout: 1000 // milliseconds
            },
            axios
        )
        .then(r => {
            console.log(r);
        })
        .catch(e => {
            console.log(e.data);
        });
};

module.exports = {
    getLocation
};
