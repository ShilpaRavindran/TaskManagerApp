const express = require("express");
const path = require('path');
const fs = require('fs')
const taskData = require("./tasks.json");
const validate = require("./helpers/validator");
const PORT = 3008;
const app = express();
app.use(express.json());


app.get('/',(req,res)=>{
    res.status(200).send("hellooo check tasks with /tasks");
});

//  Retrieve all tasks.
app.get('/tasks',(req,res)=>{
    res.status(200).json(taskData);
})

// Retrieve a single task by its ID
app.get('/tasks/:id',(req,res)=>{
    let tasks = taskData.tasks;
    let taskidPassed = req.params.id;
    let filterTask = tasks.filter(tasks=> tasks.taskId == taskidPassed)
    if(filterTask.length === 0){
        return res.status(404).send("No appropriate task found with the provided id!")
    }
    else{
        return res.status(200).json(filterTask);
    }
})

// Create a new task.
app.post('/tasks',(req,res)=>{
    const useProvidedDetails = req.body;
    let writePath = path.join(__dirname,'','tasks.json');
    if(validate.validateTaskInfo(useProvidedDetails).status == true){
        let taskDataModified =taskData;
        taskDataModified.tasks.push(useProvidedDetails);
        fs.writeFile(writePath,JSON.stringify(taskDataModified),{encoding:'utf8',flag:'w'},(err,data)=>{
            if(err){
                return res.status(500).send("Something went wrong while creating the task")
            }
            else{
                return res.status(200).send(validate.validateTaskInfo(useProvidedDetails).message);
            }
        })
    }
    else{
        return res.status(400).json(validate.validateTaskInfo(useProvidedDetails))
    }
})

// Update an existing task by its ID.
app.put('/tasks/:id', (req, res) => {
    let tasks = taskData.tasks;
    let writePath = path.join(__dirname,'','tasks.json');
    const taskId = parseInt(req.params.id);
    const taskTitle= req.body.taskTitle;
    const description = req.body.description;
    const completionStatus = req.body.completionStatus;

    const taskIndex = tasks.findIndex((t) => t.taskId === taskId);
  
    if (taskIndex === -1) {
      return res.status(404).json({ error: 'Task not found!' });
    }
  
    if (!taskTitle || !description || typeof(completionStatus) !='boolean' ) {
      return res.status(400).json({ error: 'Invalid input!' });
    }
  
    tasks[taskIndex] = {
      ...tasks[taskIndex],
      taskTitle,
      description,
      completionStatus,
    };
    fs.writeFile(writePath,JSON.stringify({ tasks }),{encoding:'utf8',flag:'w'},(err,data) => {
        if (err) {
        return res.status(500).json({ error: 'Failed to update task data!' });
        }
        res.json(tasks[taskIndex]);
    });
  });

// DELETE a task by ID
app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    let tasks = taskData.tasks;
    const taskIndex = tasks.findIndex((t) => t.taskId === taskId);
    let writePath = path.join(__dirname,'','tasks.json');
  
    if (taskIndex === -1) {
      return res.status(404).json({ error: 'Task not found' });
    }

    tasks.splice(taskIndex, 1)[0];

    fs.writeFile(writePath,JSON.stringify({ tasks }),{encoding:'utf8',flag:'w'},(err,data)=> {
      if (err) {
        return res.status(500).json({ error: 'Failed to update task data' });
      }
      res.status(204).send();
    });
  });


app.listen(PORT,(error)=>{
    if(error){
        console.log('Something Went Wrong!');
    }
    else{
        console.log('Server Running on Port 3008!')
    }
})