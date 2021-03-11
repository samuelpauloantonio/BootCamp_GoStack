const  express = require('express')
const { uuid } = require('uuidv4')
const app = express()


//app.use(express.urlencoded({ extended : true}))
app.use(express.json())

const allProjects  = [];



app.get('/projects', (requeste, response) => {
 
 return response.json(allProjects)
})



app.post('/projects' , (requeste, response) =>{

    const { nameProject, owner } = requeste.body

    const id  = uuid()

    console.log(owner)
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
    console.log('Server  is started! 🚀🚀') 
}) 