import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ProjectSchema = Schema({
  project_title:{
    type:String,
    required:true
  },
	project_description:{
    type:String,
    required:true
  },
  members:{
    type:Number,
    required:true
  },
  members_task:{
    type:Array
  }
});

module.exports=mongoose.model('project',ProjectSchema);
