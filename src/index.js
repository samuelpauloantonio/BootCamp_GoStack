const  express = require('express')

const app = express()


app.get('/', (requeste, response) => {
    return response.json({
        message: "Hello word"
    })
})

app.listen(3333, ()=> {
    console.log('o servidor esta rodando')
})