const { CryptoUtils, Client, LoomProvider, LocalAddress } = require("loom-js");
const UpikoContractJson = require('./UpikoApp.json');

const EXTDEV = {
  networkAlias: "EXTDEV",
  writeUrl: "ws://extdev-plasma-us1.dappchains.com:80/websocket",
  readUrl: "ws://extdev-plasma-us1.dappchains.com:80/queryws",
  networkId: "extdev-plasma-us1"
};

const LOOM_CONTRACT = UpikoContractJson;


 module.exports = function(app, db) {
   app.get('/numberOfSkills', async(req, res) => {

     await testCall();

     res.send(
      JSON.stringify(
        {
          message: '890',
        }
      )
     )
   })
 }


 async function testCall() {
   console.log('k, good');
 }