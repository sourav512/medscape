const request = require("request");
const User = require("../node_backend/models/user");
const Symptom = require("../node_backend/models/symptomData");
const mailHelper = require("../node_backend/utils/mailHelper");
const { async } = require("rxjs");

exports.getSymptoms = async (req, res, next) => {
  const { s1, s2, s3, s4, s5 } = req.body;
  //var globalId = req.query.id;

  request(
    `http://127.0.0.1:5000/?s1=${s1}&s2=${s2}&s3=${s3}&s4=${s4}&s5=${s5}`,
    async function (error, response, body) {
      if (error) res.send(error); // Print the error
      console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
      console.log(body); // Print the data received
      const user = req.user;
      const arr = [s1, s2, s3, s4, s5];
      let predictedDisease = JSON.parse(response.body)
      var d = body.toString();
      var w = '"disease":"';
      var f = d.substr(d.indexOf(w) + w.length);
      f = f.replace(/[^A-Za-z0-9- ]/g, "");
      const newData = {
        symptom_selected: arr,
        disease_predicted: `${predictedDisease.disease}`,
        dignosed_on: Date.now(),
      };
      user.disease_record.push(newData);
      await user.save();


      // var symptomDoument = await Symptom.findOne({identity:'admin'});
      // if(!symptomDoument){
      //   const globalSymptom = await Symptom.create({
      //     global_symptoms: [
      //       {
      //         symptoms: ["s1"],
      //       },
      //     ],
      //   });
      //   await globalSymptom.save();
      // }
     //symptomDoument = await Symptom.findOne({identity:'admin'});
      // const globalData = {
      //   symptoms: arr,
      //   date: Date.now(),
      // };
      // symptomDoument.global_symptoms.push(globalData);
      // await symptomDoument.save();
      //console.log(symptomDoument.global_symptoms[1].symptoms)

      const globalSymptom = await Symptom.create({
        symptoms:arr,
        date:new Date().toISOString().split('T')[0]
      });
      await globalSymptom.save();

      try {
        const message = `You are predicted to have ${
          predictedDisease.disease
        } disease with symptoms such as ${arr.toString()}`;
        console.log(message);
        const user = await User.findById(req.user.id);
        await mailHelper({
          email: user.email,
          subject: "Disease dignnosed ",
          message,
        });
      } catch (error) {
        console.log(error);
      }
      res
        .json({
          response : predictedDisease.disease,
          status: 200,
        })
        .status(200); //Display the response on the website
    }
  );
};


exports.resetGlobalSymptomData = async (req, res, next) => {
  await Symptom.deleteMany({});
  const globalSymptom = await Symptom.create({
    global_symptoms: [
      {
        symptoms: ["s1"],
       // date: Date.now(),
      },
    ],
  });
  await globalSymptom.save();
  //globalId = globalSymptom._id;
  res.send('Admin symptom data reset');
};

exports.getDataOnDate = async(req,res,next) =>{
    const {start_date, end_date} = req.body
    //console.log(date)
    await Symptom.find({
      $and: [
        {date: {$eq:start_date}},
        {date: {$lt:end_date}}
      ]
    })
    //const s = await Symptom.find({date:{$gt:start_date}})
    .then(function(data,err){
      if(err){
        res.send(err)
      }else{
       // res.send(data)
       console.log(data)
       res.send(getMostOccurredSymptom(data))
      }
    })
}

// exports.getDataOnMonth = async(req,res,next) =>{
//   const {month} = req.body
//   const s = await Symptom.find({})
// }


function getMostOccurredSymptom(data) {
  const symptomsCount = {};
  
  // Count the occurrences of each symptom in the data
  for (const record of data) {
    for (const symptom of record.symptoms) {
      if (symptomsCount[symptom]) {
        symptomsCount[symptom]++;
      } else {
        symptomsCount[symptom] = 1;
      }
    }
  }
  
  // Find the symptom with the highest occurrence count
  let mostOccurredSymptom = [];
  let highestCount = 0;
  for (const symptom in symptomsCount) {
    //console.log(symptomsCount)
    if (symptomsCount[symptom] > highestCount) {
      mostOccurredSymptom =[]
      mostOccurredSymptom.push(symptom);
      highestCount = symptomsCount[symptom];
    }else if(symptomsCount[symptom] === highestCount){
      mostOccurredSymptom.push(symptom)
    }
  }
  console.log(symptomsCount)
  //return mostOccurredSymptom;
  return symptomsCount
}
