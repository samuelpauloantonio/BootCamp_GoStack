const  express = require('express')
const { uuid, isUuid } = require('uuidv4')
const app = express()


//app.use(express.urlencoded({ extended : true}))
app.use(express.json())

const allProjects  = [];



function middlewares(requeste , response, next){
    
    
    const { url , method } = requeste
    
    const  logtabel = `[${method.toUpperCase()} , ${url}]`
    
    console.time(logtabel)
    
    
    next()
    
    console.timeEnd(logtabel)
    
}



function verifyId(requeste, response,  next) {

    const { id } = requeste.params

    const valueId  = allProjects.find(project => project.id == id)


    
    if(!isUuid(id)) {
        return response.status(400).json({error : "Invalid project Id"})
    }

    return next()
 
}

app.use('/projects/:id', middlewares, verifyId)




app.get('/projects', (requeste, response) => {
 

    // fazendo filtro com  o methodo  http == queryparams ( ?filtro=term&page=2)

    const { owner } = requeste.query

    const  filtered = owner ? allProjects.filter(outhor => outhor.owner.includes(owner)) 
    : allProjects

    return response.json(filtered)
})



app.post('/projects' , (requeste, response) =>{

    const { nameProject, owner } = requeste.body

    const id  = uuid()


    allProjects.push( {
        id,
        nameProject,
        owner
    }


    )


    return response.json(allProjects)

    
})

app.put('/projects/:id' , (requeste, response) =>{

    


    const  { id }  = requeste.params;
    let index = 0

    const  findProject  = allProjects.find((projectfind, findIndex, arr) => {

        if(projectfind.id == id) {
            index = findIndex
            return projectfind
        }
 
    
    })

    if(!findProject) return response.status(400).json({error: "project Not_found"})

    const  project = {
        id,
        ...requeste.body
    }
    allProjects[index] = project

    return response.json(allProjects)
})

app.delete('/projects/:id' , (requeste, response) =>{

   const { id } = requeste.params 

   const findIndexProject = allProjects.findIndex(project => project.id === id)

   if(findIndexProject < 0) return response.status(400).json({error: "project not found"})

    
   allProjects.splice(findIndexProject,1)

   return response.status(204).send()
}) 



app.listen(3333, ()=> {
    console.log('🚀 Server  is started! ') 
}) 