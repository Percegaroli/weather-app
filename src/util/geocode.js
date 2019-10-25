const request = require ('request')
const Geocode = (address, callback) =>{
    if (address === undefined){
        callback ("Você não forneceu um endereço", undefined)
    }
    let url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoicGVyY2VnYXJvbGkiLCJhIjoiY2sxemluZnhjMGR1MDNscGNkbm83ZnpyYyJ9.o3-LA2R3zc5U4-rEAe471Q&limit=1&language=pt"
    request({url: url, json: true}, (error,response) =>{
        if (error){
            callback("Não foi possível se conectar com a API de geolocalização, verifique sua conexão com a internet",undefined)
        }
        else if (response.body.features.length === 0){
            callback('Não foram encontrados resultados para sua busca. Tente buscar por outras palavras.',undefined)
        }
        else{
            let features, latitude , longitude, lugar
            features = response.body.features[0]
            latitude = features.center[1]
            longitude = features.center[0]
            lugar = features.place_name
            callback(undefined,{
                lugar:lugar,
                latitude:latitude,
                longitude:longitude
            })
        }
    })
}
module.exports = Geocode