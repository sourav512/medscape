const request = require("request");
const User = require("../node_backend/models/user");
const Symptom = require("../node_backend/models/symptomData");
const mailHelper = require("../node_backend/utils/mailHelper");

exports.getSymptoms = async (req, res, next) => {
  const { s1, s2, s3, s4, s5 } = req.body;
  var globalId = req.query.id;

  request(
    `http://127.0.0.1:5000/?s1=${s1}&s2=${s2}&s3=${s3}&s4=${s4}&s5=${s5}`,
    async function (error, response, body) {
      if (error) res.send(error); // Print the error
      console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
      console.log(body); // Print the data received
      const user = req.user;
      const arr = [s1, s2, s3, s4, s5];
      var d = body.toString();
      var w = '"disease":"';
      var f = d.substr(d.indexOf(w) + w.length);
      f = f.replace(/[^A-Za-z0-9- ]/g, "");
      const newData = {
        symptom_selected: arr,
        disease_predicted: f,
        dignosed_on: Date.now(),
      };
      user.disease_record.push(newData);
      await user.save();
      const symptomDoument = await Symptom.findById(globalId);
      const globalData = {
        symptoms: arr,
        date: Date.now(),
      };
      symptomDoument.global_symptoms.push(globalData);
      await symptomDoument.save();
      try {
        const message = `You are predicted to have ${
          newData.disease_predicted
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
          disease_predicted: f,
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
        date: Date.now(),
      },
    ],
  });
  await globalSymptom.save();
  globalId = globalSymptom._id;
  res.send(globalSymptom._id);
};
