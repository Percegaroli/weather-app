const path = require ('path')
const express = require ('express')
const hbs = require( 'hbs')
const app = express()
const geocode = require ('./util/geocode')
const forecast = require ('./util/forecast')
const port = process.env.PORT || 3000
//variaveis de caminho
    const caminhoPublic = path.join(__dirname,'../public')
    const caminhoView = path.join(__dirname,'../templates/views')
    const caminhoPartials = path.join(__dirname, '../templates/partials')
//configura express
    app.use(express.static(caminhoPublic))
    app.set('view engine', 'hbs')
//setup handlebars
    hbs.registerPartials(caminhoPartials)    
    app.set('views',caminhoView)
//rotas    
    app.get('' , (req,res) =>{
        res.render('index.hbs',{
            titulo:'Previsão do tempo',
            name:'Bruno'
        })
    })
    app.get('/help' , (req,res) =>{
        res.render('help.hbs', {
            name:'Bruno',
        })
    })
    app.get ('/weather' , (req, res) => {
        if (!req.query.address){
            return res.send('Você não forneceu um endereço')
        }
        if (req.query.address ===''){
            return res.send('Você não forneceu um endereço')
        }
        geocode(req.query.address, (error, geocodeData) =>{
            if (error != undefined){
                return res.send({error:error})
            }
             forecast(geocodeData, (error,forecastgeocodeData) =>{
                if (error != undefined){
                    return res.send({error:error})
                }
                res.send({
                    forecast: forecastgeocodeData,
                    location: geocodeData.lugar,
                    address: req.query.address
                })
            })
            
        })
      
    })
    app.get('/help/*', (req,res) =>{
        res.render('404', {
            titulo:"Artigo não encontrado",
            erro:"Artigo de ajuda não encontrado",
            name:'Bruno'
        })
    })
    app.get('*', (req,res) =>{ // tem que ser a ultima coisa do código, antes do listen
        res.render('404', {
            titulo:'Not found',
            erro: 'Erro 404, página não encontrada',
            name:'Bruno'
        })
    })
app.listen(port, () =>{
    console.log('Server up and running on port' + port)
})