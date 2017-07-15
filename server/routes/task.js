import ProjectSchema from '../model/projectModel';

export default {

  CreateTask(req,res) {
    // console.log("TITLE==>"+req.body.project_title);

    ProjectSchema.find({project_title:req.body.project_title}, function(err, response){
        if(response.length != 0){
          function search(members_task, member_name){
            for (let i=0; i < members_task.length; i++) {
              if (members_task[i].member_name === member_name) {
                return i;
              }
            }
            return null;
          }
          let ObjectIndex = search(response[0].members_task, req.body.member_name);
          console.log(response[0].members_task[ObjectIndex].tasks);
          // let Tasks = response[0].members_task[ObjectIndex].tasks;

          // Tasks = Tasks[ObjectIndex].tasks;
          //
          // Tasks.push({
          //   task_title: req.body.task_title,
          //   task_description: req.body.task_title,
          //   status: req.body.task_status,
          //   id: req.body.task_id
          // });

          response[0].members_task[ObjectIndex].tasks.push({
            task_title: req.body.task_title,
            task_description: req.body.task_description,
            status: req.body.task_status,
            id: req.body.task_id
          });

          // console.log("Task-->"+ ObjectIndex+"///"+Tasks[ObjectIndex].tasks);

          ProjectSchema.update({project_title:req.body.project_title},
            {
              members_task: response[0].members_task
            },
            { upsert: true },
             function(err, respons){
               res.send(respons);
              //  console.log(respons);
               res.end();
             });

        }
        else{res.send("Error");}

      });
  },


  UpdateTaskStatus(req,res) {
    // console.log("TITLE==>"+req.body.project_title);

    ProjectSchema.find({project_title:req.body.project_title}, function(err, response){
        if(response.length != 0){
          function searchByProject(members_task, member_name){
            for (let i=0; i < members_task.length; i++) {
              if (members_task[i].member_name === member_name) {
                return i;
              }
            }
            return null;
          }
          let ObjectIndex = searchByProject(response[0].members_task, req.body.member_name);
          // console.log(response[0].members_task[ObjectIndex].tasks);

          function searchByTask(tasks, id){
            for (let i=0; i < tasks.length; i++) {
              if (tasks[i].id === id) {

                response[0].members_task[ObjectIndex].tasks[i] =  {
                  task_title : tasks[i].task_title,
                  task_description : tasks[i].task_description,
                  status : req.body.status,
                  id : tasks[i].id
                }

                return i;
              }
            }
            return null;
          }

          let ObjectIndex1 = searchByTask(response[0].members_task[ObjectIndex].tasks, req.body.task_id);
          // let Tasks = response[0].members_task[ObjectIndex].tasks;

          // console.log("Task-->"+ ObjectIndex+"///"+Tasks[ObjectIndex].tasks);

          ProjectSchema.update({project_title:req.body.project_title},
            {
              members_task: response[0].members_task
            },
            { upsert: true },
             function(err, respons){
               res.send(respons);
              //  console.log(respons);
               res.end();
             });

        }
        else{res.send("Error");}

      });
  },


  UpdateDragAndDropCard(req,res) {
    // console.log("TITLE==>"+req.body.dragListId+","+req.body.dropListId+","+req.body.cardId+","+req.body.project_title);
    let dragListId = req.body.dragListId;
    let dropListId = req.body.dropListId;
    ProjectSchema.find({project_title:req.body.project_title}, function(err, response){
        if(response.length != 0){

          function searchByTask(tasks, id){
            for (let i=0; i < tasks.length; i++) {
              if (tasks[i].id === id) {

                response[0].members_task[dropListId].tasks.push({
                  task_title : tasks[i].task_title,
                  task_description : tasks[i].task_description,
                  status : tasks[i].status,
                  id : tasks[i].id
                });

                response[0].members_task[dragListId].tasks.splice(i, 1);
                return i;
              }
            }
            return null;
          }

          let ObjectIndex1 = searchByTask(response[0].members_task[dragListId].tasks, req.body.cardId);

          ProjectSchema.update({project_title:req.body.project_title},
            {
              members_task: response[0].members_task
            },
            { upsert: true },
             function(err, respons){
               res.send(respons);
              //  console.log(respons);
               res.end();
             });

        }
        else{res.send("Error");}

      });
  },


  AddMember(req,res) {
    // console.log("TITLE==>"+req.body.project_title);

    ProjectSchema.find({project_title:req.body.project_title}, function(err, response){
        if(response.length != 0){

          response[0].members_task.push({
            member_name: req.body.member_name,
            tasks: []
          });

          ProjectSchema.update({project_title:req.body.project_title},
            {
              members_task: response[0].members_task
            },
            { upsert: true },
             function(err, respons){
               res.send(respons);
              //  console.log(respons);
               res.end();
             });

        }
        else{res.send("Error");}

      });
  }

}
