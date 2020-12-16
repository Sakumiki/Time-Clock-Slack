const gl = require('google-geolocation')({
    key: 'AIzaSyDJ3NEdG_00sOLbA70grnutCIMP-rkTnS0',
    timeout: 2500
});


// Get data
const getLocation = async =>{

    if (navigator.geolocation) {
        console.log("この端末では位置情報が取得できます");
        // Geolocation APIに対応していない
    } else {
        console.log("この端末では位置情報が取得できません");
    }

};


module.exports = {
    getLocation
};
