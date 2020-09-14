const express = require ('express')
const app = express();
const joi = require('joi');
const courses=[
    {id:1,name:'course1'},
    {id:2,name:'course2'},
    {id:3,name:'course3'},
]
app.use(express.json());//to parse body data as it is not unable pehle se
app.get('/',(req,res)=>{
   res.send('hello worldd');  
})
app.get('/api/courses',(req,res)=>{
    res.send(courses);
})

const port=process.env.PORT || 3000;
app.listen(3000,()=>{
    console.log(`listenting on port ${port}...`)
})
// 
// app.get('/api/cources/:id/:name?',(req,res)=>{
//     // res.send(req.params);
//     res.send(req.query);//after question mark
// })
app.get('/api/courses/:id',(req,res)=>{
    var course= courses.find(c=>c.id===parseInt(req.params.id))
    if(!course){   /*404 error */
        res.status(404).send('the course not there');
        return;
    }
    else {
        res.send(course);
    }
})

app.post('/api/courses',(req,res)=>{
    const schema={
        name: joi.string().min(3).required()
    };
    const result=joi.validate(req.body,schema);
    console.log(result);    
    // if(!req.body.name || req.body.name.length< 3){
    //     res.status(400).send("name should have more than 3 character")

    //     return ;
    // }
    if(result.error){
        res.status(400).send(result.error)

        return ;
    }
    const course={
        id: courses.length +1,
        name: req.body.name
    }
    courses.push(course);
    res.send(course);
})
app.put('/api/courses/:id',(req,res)=>{
    console.log(req.params.id)
    var course= courses.find(c=>c.id===parseInt(req.params.id))
    if(!course){   /*404 error */
        res.status(404).send('the course not there');
    }
    

    const schema={
        name: joi.string().min(3).required()
    };
    const result=joi.validate(req.body,schema);
    if(result.error){
        res.status(400).send(result.error)

        return ;
    }
    course.name=req.body.name;
    res.send(course);


})

app.delete('/api/courses/:id',(req,res)=>{
    console.log(req.params.id)
    var course= courses.find(c=>c.id===parseInt(req.params.id))
    if(!course){   /*404 error */
        res.status(404).send('the course not there');
    }
    

   
    
    const index=courses.indexOf(course)
    courses.splice(index,1);
    // course.name=req.body.name;
    res.send(course);


})