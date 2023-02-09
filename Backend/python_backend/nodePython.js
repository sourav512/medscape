var {PythonShell} = require('python-shell')

exports.getSymptoms = async(req,res,next) =>{
    const{symptom1, symptom2,symptom3,symptom4,symptom5} = req.body
    let options = {
        // mode: 'text',
        // pythonPath: 'path/to/python',
        // pythonOptions: ['-u'], // get print results in real-time
        // scriptPath: 'path/to/my/scripts',
        // args: ['value1', 'value2', 'value3']
        args:[symptom1,symptom2,symptom3,symptom4,symptom5],
       //scriptPath:'C:/Users/91702/Desktop/med2/medscape/Backend/python_backend/app.py'
    }
    PythonShell.run("app.py",options,(err,res1)=>{
        console.log('hit--------')
        if(err) console.log(err)
        if(res1) console.log(res1)
        res.send('ok')
    })

}