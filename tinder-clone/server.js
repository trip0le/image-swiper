import express from 'express'
import mongoose from 'mongoose'
import Cors from 'cors'
import Cards from './dbCards.js'

//App Config
const app = express();
const port = process.env.PORT || 8001
const connection_url = 'mongodb+srv://titasnath:shyamnagar123@cluster0.h7kp7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

//Middlewares
app.use(express.json())
app.use(Cors())

//DB Config
mongoose.connect(connection_url, {
    useNewUrlParser : true,
    // useCreateIndex : true,
    // useUnifiedTopology : true
})

//API Endpoints
app.get('/', (req, res) => {
    res.status(200).send('hellow world')
})

app.post('/tinder/cards', (req, res)=>{
    const dbCard = req.body
    Cards.create(dbCard, (err, data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(201).send(data)
        }
    })
})

app.get('/tinder/cards', (req, res)=>{

    Cards.find((err, data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(200).send(data)
        }
    })
    // Cards.find((data)=>{
    //     res.status(200).send(data)
    // })
})

app.delete('/tinder/cards/:id', async(req, res)=>{
    try{
        const cards = await Cards.findById(req.params.id)
        await cards.remove()
        res.json(`element with id : ${req.params.id} has been deleted from the database`)
    }catch(err){
        res.send('Error')
    }
})

//Listener
app.listen(port, ()=> {
    console.log(`listening on localhost : ${port}`)
})