import ProjectSchema from '../model/projectModel';

export default {
  GetProjects(req,res) {
    ProjectSchema.find({ }, function (err, response) {
      if(response.length != 0){
        res.send(response);
        // console.log(response);
        res.end();
      }
      else{res.send("Error");}
    }
    );
  },

  CreateProject(req,res) {
    // console.log("TITLE==>"+req.body.project_title);

    ProjectSchema.update({project_title:req.body.project_title},
      {
        project_title:req.body.project_title,
        project_description:req.body.project_description,
        members:req.body.members,
        members_task: []
      },
      { upsert: true },
      function(err, response){
        if(response.length != 0){
          res.send(response);
          // console.log(response);
          res.end();
        }
        else{res.send("Error");}
      });

  }
}
