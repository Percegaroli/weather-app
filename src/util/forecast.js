const request = require ('request')
const Forecast = (data,callback) =>{
    let latitude = data.latitude
    let longitude = data.longitude
    let url = "https://api.darksky.net/forecast/e8f37375bdb2e12b9560ed30e776d74b/" + latitude + "," + longitude + "?units=si&lang=pt"
    request({url: url, json: true}, (error,response) => {
        if (error){
            callback('Não foi possível se conectar com a API de previsão do tempo, verifique sua conexão com a internet',undefined)
        }
        else if (response.body.error){
            callback(response.body.error,undefined)
        }
        else{
            let hoje = response.body.daily.data[0]
            let temperatura = response.body.currently.temperature
            let chanceChuva = response.body.currently.precipProbability
            callback(undefined, hoje.summary + " Está fazendo " + temperatura + " graus, e a chance de chuva é de " + chanceChuva + "%")
        }
    })
}
module.exports = Forecast