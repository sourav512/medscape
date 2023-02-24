const mongoose = require("mongoose");

const symptomSchema = new mongoose.Schema({
 
     symptoms: {
        type: Array,
        default: null,
     },
     date:{
        type:Date,
        default:Date.now()
     }
});

module.exports = mongoose.model("Symptom", symptomSchema);



 // identity:{
  //     type:String,
  //     default:'admin'
  // },
  // global_symptoms:[
  // {
  //         symptoms:{
  //             type:Array,
  //             default:null
  //         },
  //         date:{
  //             type:Date,
  //             default:Date.now()
  //         }
  //     }
  // ]