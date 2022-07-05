const puppteer = require('puppeteer')
const parseRouletteFromElements = require('./src/utils/parseRouletteFromElements')
const isSameRouletteColors = require('./src/utils/isSameRouletteColors')
const mongoose = require("mongoose")
const blazeSchema = require("./src/banco/blazeSchema")
const moment  = require('moment')
const saveDb = require("./src/banco/p4/save")
const saveUpdateDb = require("./src/banco/p4/saveUpdate")
const saveUpdateWinDb = require("./src/banco/p4/saveUpdateWin")
const saveUpdateLossDb = require("./src/banco/p4/saveUpdateLoss")
require('moment/locale/pt-br') 
moment.locale("pt-br")

var entrada = 0
var corBlack = 0
var corRed = 0
var corWhite = 0
var corWhiteGale1 = 0
var corWhiteGale2 = 0
var corGaleRed1 = 0
var corGaleRed2 = 0
var corGaleBlack1 = 0
var corGaleBlack2 = 0
var green = 0
var loss = 0
var galeRed1 = 0
var galeRed2 = 0
var galeBlack1 = 0
var galeBlack2 = 0
var primeiro = true
var segundo = false
var arrayUltimo = []
var array = []
var lossArray = 0
var winArray = 0
var arrayWin = []
var count = 0
var id = []

async function watchRoulette(){
    const browser = await puppteer.launch({
      headless: true,
      args: ['--no-sandbox']
    })
    const page = await browser.newPage()
    await page.goto("https://blaze.com/pt/games/double")     
   
      
    async function monitor (selector, callback, prevValue) {
        const newVal = await page.$$(selector);
        if (newVal !== prevValue) {
          callback(newVal);
        }
  
        await new Promise(_ => setTimeout(_, 1000))

        monitor (selector, callback, newVal);
      }
      let lastRoulette = [];
      monitor('.roulette-previous .sm-box', async ( status ) =>{
 
        const reverseElements = status.reverse().slice(-16);
        const roulette = await parseRouletteFromElements(reverseElements, true);

        const rouletteSlice = roulette.slice(-16);
        const hasChanged = !isSameRouletteColors(rouletteSlice, lastRoulette);

        if (hasChanged) {      
            
            var data = new Date()           

            var horaAtual1 = moment(data).format('HH:mm')

            var dayNameCurrent = moment(data).format("dddd");        
            
           const {color, number} = roulette[roulette.length - 1]

            if(galeRed2 === 1){   
              if(color === "red"){     
                green = green + 1   
                corGaleRed2 = corGaleRed2 + 1 
                array = []
                winArray = 1
                entrada = 0  
                console.log('GREEN')
                count = count + 1       
              }else if(color === "white"){
                corWhiteGale2 = corWhiteGale2 + 1      
                winArray = 1
                array = []
                entrada = 0  
                console.log('GREEN') 
                count = count + 1      
              }else{
                loss = loss + 1
                count = 0
                lossArray = 1                
                winArray = 0
                entrada = 0
                console.log('Essa rodada não deu')            
              }
              galeRed2 = 0
            }

            if(galeRed1 === 1){    
              if(color === "red"){     
                green = green + 1 
                corGaleRed1 = corGaleRed1 + 1
                array = [] 
                winArray = 1
                entrada = 0  
                console.log('GREEN')    
                count = count + 1     
              }else if(color === "white"){
                corWhiteGale1 = corWhiteGale1 + 1     
                array = []  
                winArray = 1  
                entrada = 0  
                console.log('GREEN') 
                count = count + 1                  
              }else{
                galeRed2 = 1  
                console.log('Segundo martigale -💰 Entrar no  VERMELHOR')        
              }
              galeRed1 = 0
            }


            if(corRed === 1){    
              if(color === "red"){     
                green = green + 1   
                array = []   
                winArray = 1 
                entrada = 0  
                console.log('GREEN') 
                count = count + 1    
              }else if(color === "white"){
                corWhite = corWhite + 1               
                array = []  
                winArray = 1
                entrada = 0  
                console.log('GREEN') 
                count = count + 1      
              }else{    
                galeRed1 = 1
                console.log('Primeiro martigale -💰 Entrar no  VERMELHOR') 
                  
              }
              corRed = 0
            }

            //-------------------

            if(galeBlack2 === 1){    
              if(color === "black"){     
                green = green + 1   
                count = count + 1
                corGaleBlack2 = corGaleBlack2 + 1
                array = []  
                winArray = 1  
                entrada = 0  
                console.log('GREEN')       
              }else if(color === "white"){
                corWhiteGale2 = corWhiteGale2 + 1      
                count = count + 1
                array = []  
                winArray = 1 
                entrada = 0    
                console.log('GREEN')       
              }else{
                entrada = 0
                loss = loss + 1
                count = 0
                lossArray = 1                
                winArray = 0
                console.log('Essa rodada não deu')       
              }
              galeBlack2 = 0
            }

            if(galeBlack1 === 1){    
              if(color === "black"){     
                green = green + 1
                corGaleBlack1 = corGaleBlack1 + 1
                array = [] 
                winArray = 1     
                entrada = 0  
                console.log('GREEN') 
                count = count + 1     
              }else if(color === "white"){
                corWhiteGale1 = corWhiteGale1 + 1      
                array = [] 
                winArray = 1  
                entrada = 0    
                console.log('GREEN') 
                count = count + 1      
              }else{
                galeBlack2 = 1  
                console.log('Segundo martigale')   
                    
              }
              galeBlack1 = 0
            }


            if(corBlack === 1){   
              if(color === "black"){     
                green = green + 1  
                count = count + 1
                array = []  
                winArray = 1 
                entrada = 0  
                console.log('GREEN')       
              }else if(color === "white"){
                corWhite = corWhite + 1     
                count = count + 1  
                array = [] 
                winArray = 1
                entrada = 0
                console.log('GREEN')       
              }else{
                galeBlack1 = 1 
                console.log('Primeiro martigale -💰 Entrar no  PRETO')      
              }
              corBlack = 0
            }

            const resultDB = await find()

            if(lossArray === 1){

            resultDB.forEach(async(element) => {
              if(element.resultado.padrao1[0].number === arrayWin[0].number){
                if(element.resultado.padrao1[1].number === arrayWin[1].number){                         
                  if(element.horas === arrayWin[2].horaAtual1){                         
                      if(element.dayName === arrayWin[2].dayNameCurrent){                       
                        await saveUpdateLossDb(element._id)
                      }
                  }
                }
            }    
          });

              lossArray = 0
              array = []
              arrayWin = []
            } 
            
            if(winArray === 1){

                resultDB.forEach(async(element) => {
                  if(element.resultado.padrao1[0].number === arrayWin[0].number){
                      if(element.resultado.padrao1[1].number === arrayWin[1].number){                         
                        if(element.horas === arrayWin[2].horaAtual1){                         
                            if(element.dayName === arrayWin[2].dayNameCurrent){                         
                              await saveUpdateLossDb(element._id)   
                          }
                        }
                      }
                    }     
                });

              winArray = 0
              arrayWin = []
            }
            


            const resultado = roulette.slice(Math.max(roulette.length - 2, 1))  
            const padrao2 = roulette.slice(Math.max(roulette.length - 2, 1))

            

            if(entrada !== 1){

              resultDB.forEach(async(element) => {
                if(element.resultado.padrao1[0].number === resultado[0].number
                  && element.resultado.padrao1[1].number === resultado[1].number
                  && element.horas === horaAtual1
                  && element.dayName === dayNameCurrent
                  ){
                     if(element.ativo > 0) {                                                   
                        if(element.cor === "red"){
                            corRed = 1
                            entrada = 1
                            console.log('💰 Entrar no  VERMELHO')                     
                          }
                          
                          if(element.cor === "black"){
                            corBlack = 1
                            entrada = 1
                            console.log('💰 Entrar no  PRETO')                     
                        }
                      }
                }      
              
            });  
            }

            if(corRed === 1 || corBlack === 1){
              array.push(...resultado, {dayNameCurrent, horaAtual1})
              arrayWin.push(...resultado, {dayNameCurrent, horaAtual1}) 
          }

          if(segundo === true){ 
            primeiro = true
            segundo = false
            arrayUltimo = []
          }


          if(primeiro === false){
            await saveUpdateDb(color, arrayUltimo, id) 
            segundo = true 
            id = []
          }

          if(primeiro === true){
            arrayUltimo.push(...resultado, {dayNameCurrent, horaAtual1})
            const newDados = await saveDb(padrao2, dayNameCurrent, horaAtual1)
            id.push(...newDados)
            primeiro = false  
          }

            console.log( { 
              corBlack,
              corRed,
              corWhite,
              green,
              loss,
              corWhiteGale1,
              corWhiteGale2,
              corGaleRed1,
              corGaleRed2,
              corGaleBlack1,
              corGaleBlack2,
              array,
              lossArray,
              winArray,
              arrayWin, 
              number,
              entrada,
            })          
          }
          
          lastRoulette = rouletteSlice;          
        
      })
      return monitor
}


module.exports = watchRoulette()

async function find(){
    const createModel = mongoose.model('result4', blazeSchema)
    const result = await createModel.find({}).exec() 
  
    return result
  }
  
  async function base(){
    mongoose.connect('mongodb+srv://blazePu:34860760@cluster0.zc6va.mongodb.net/?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }).then(result => {
      console.log("mongodb conectado!")
    }).catch(error => {
      console.log("erro" + error)
    })  
  }
  base()