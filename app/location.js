const client = new Client({});


// Get data
const getLocation = async =>{
    client
        .places({
            params: {
                key: process.env.GOOGLE_MAPS_API_KEY
            },
            timeout: 1000 // milliseconds
        }, axiosInstance)
        .then(r => {
            console.log(r.data.results[0].elevation);
        })
        .catch(e => {
            console.log(e);
        });
};


module.exports = {
    getLocation
};
