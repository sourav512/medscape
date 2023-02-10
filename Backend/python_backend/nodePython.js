const request = require('request');
const User = require('../node_backend/models/user')
exports.getSymptoms = async(req,res,next) =>{
const {s1,s2,s3,s4,s5} = req.body
    request(`http://127.0.0.1:5000/?s1=${s1}&s2=${s2}&s3=${s3}&s4=${s4}&s5=${s5}`,async  function (error, response, body) {

        if(error) res.send(error); // Print the error
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log(body); // Print the data received
        const arr= [s1,s2,s3,s4,s5]
        const s =  arr.toString()
        var d = body.toString()
        var w = '"disease":"'
        var f = d.substr(d.indexOf(w)+w.length)
        f = f.replace(/[^A-Za-z0-9- ]/g, '');
        //console.log(f)
        const newData ={
          symptom_selected: s,
          disease_predicted: f,
          dignosed_on: Date.now()
        }
        console.log(newData)
        const user = await User.findById(req.user.id)
        user.disease_record.push(newData);
       console.log(user.disease_record)
        res.send(body); //Display the response on the website
      })
    }