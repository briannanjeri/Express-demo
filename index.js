const express=require('express')
const app=express()
app.use(express.json())

courses=[
    {id:1, name:"brian"},
    {id:2, name:"brian"},
    {id:3, name:"brian"}

]

app.get('/', (req, res)=>{
    res.send('hello world')
})

app.get('/api/courses', (req, res)=>{
    res.send(courses)
})

app.get('/api/courses/:id',(req, res)=>{
    const course=courses.find(c=>c.id==req.params.id)
    if(!course) return res.status(404).send("course id was not found");
    else
    return res.send(course)
})

app.post('/api/courses', (req,res)=>{

   if (!req.body.name || req.body.name < 3) {
  return res.status(404).send("name should be required and should be not be a minimum of 3 characters")
    return;
}
    const course={id:courses.length+1, name:req.body.name}
    courses.push(course)
    res.send(course)
    
})

app.put('/api/courses/:id', (req, res)=>{
    const course=courses.find(c=>c.id==parseInt(req.params.id));

    if (!course)
     return res.status(404).send('name with the given id was not found')
   
    if (!req.body.name || req.body.name.length < 3) {
        res.status(404).send("name should be required and should be not be a minimum of 3 characters")
         return;
     }

    course.name=req.body.name;
    res.json(course)

})

app.delete('/api/courses/:id',(req, res)=>{
    const course=courses.find(c=>c.id==parseInt(req.params.id));
    if (!course)
     return res.status(404).send('name with the given id was not found') 

    const index=courses.indexOf(course)
    courses.splice(index, 1)
    res.send(course)

 })

const port=process.env.PORT || 3000

app.listen(port, ()=>console.log(`listening on port ${port}`))