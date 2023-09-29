# Task Manager Application

This is a simple RESTful API for managing tasks using Node.js and Express.js.


-Endpoints
GET /tasks: Retrieve all tasks.
GET /tasks/:id: Retrieve a single task by its ID.
POST /tasks: Create a new task.
PUT /tasks/:id: Update an existing task by its ID.
DELETE /tasks/:id: Delete a task by its ID.

Examples : 
Retrieve all tasks.
GET http://localhost:3000/tasks

Retrieve a single task by its ID.
GET http://localhost:3000/tasks/2

Create a new task.
POST http://localhost:3000/tasks
Content-Type: application/json

{
  "taskId":3,
  "taskTitle": "Test Task",
  "description": "Description of the task",
  "completionStatus": false
}

Delete a task:
DELETE http://localhost:3000/tasks/1
# TaskManagerApp
