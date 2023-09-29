const taskData = require("../tasks.json");
 
 class Validator{
    static validateTaskInfo(taskInfo){
        if(taskInfo.hasOwnProperty("taskId")
        && taskInfo.hasOwnProperty("taskTitle")
        && taskInfo.hasOwnProperty("description")
        && taskInfo.hasOwnProperty("complitionStatus") ){
                return{
                    "status":true,
                    "message":"Course has been added."
                }
        }
        else{
            return{
                "status":false,
                "message":"Course info is malformed, please provide all the parameters."
            }
        }
    }

 }
  module.exports = Validator