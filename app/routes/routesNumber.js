
 module.exports = function(app, db) {
   app.get('/numberOfSkills', (req, res) => {
     res.send(
      JSON.stringify(
        {
          message: '890',
        }
      )
     )
   })
 }