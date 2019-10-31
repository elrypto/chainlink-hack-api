const { CryptoUtils, Client, LoomProvider, LocalAddress } = require("loom-js");

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