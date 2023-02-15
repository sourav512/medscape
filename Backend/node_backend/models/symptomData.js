const mongoose = require('mongoose')

const symptomSchema = new mongoose.Schema({
    global_symptoms:[
        {
            symptoms:{
                type:Array,
                default:null
            },
            date:{
                type:Date,
                default:Date.now()
            }
        }
    ]
})

module.exports = mongoose.model('Symptom',symptomSchema)