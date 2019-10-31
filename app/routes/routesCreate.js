 
 module.exports = function(app, db) {
  app.get('/createSkill', (req, res) => {

    console.log('timestamp:', Date.now());

    res.send(
     JSON.stringify(
       {
         message: 'Ok',
       }
     )
    )
  })
}