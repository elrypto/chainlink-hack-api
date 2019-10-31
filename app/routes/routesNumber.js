
 module.exports = function(app, db) {
   app.get('/numberOfSkills', async(req, res) => {

    let loomObj = await createLoomObj();

    let skillsCount = await loomObj.instance.methods.numberOfSkills().call();


    console.log(loomObj);

     res.send(
      JSON.stringify(
        {
          message: skillsCount,
        }
      )
     )
   })
 }




 const { CryptoUtils, Client, LoomProvider, LocalAddress } = require("loom-js");
const UpikoContractJson = require('./UpikoApp.json');
const Web3 = require('web3');

const EXTDEV = {
  networkAlias: "EXTDEV",
  writeUrl: "ws://extdev-plasma-us1.dappchains.com:80/websocket",
  readUrl: "ws://extdev-plasma-us1.dappchains.com:80/queryws",
  networkId: "extdev-plasma-us1"
};

const LOOM_CONTRACT = UpikoContractJson;


const Loom = {
  contract: null,
  client: null,
  privateKey: null,
  publicKey: null,
  currentUserAddress: "",
  web3: null,
  instance: null,
  currentNetwork: "",
  connectionInfo: {
    networkAlias: "EXTDEV",
    writeUrl: "ws://extdev-plasma-us1.dappchains.com:80/websocket",
    readUrl: "ws://extdev-plasma-us1.dappchains.com:80/queryws",
    networkId: "extdev-plasma-us1"
  }
};



async function createLoomObj() {
  Loom.contract = LOOM_CONTRACT;
  await createClient();

  Loom.currentUserAddress = LocalAddress.fromPublicKey(
    Loom.publicKey
  ).toString();

  Loom.web3 = new Web3(new LoomProvider(Loom.client, Loom.privateKey));
  await createContractInstance();

  return Loom;
}

async function createClient() {
Loom.privateKey = CryptoUtils.generatePrivateKey();
Loom.publicKey = CryptoUtils.publicKeyFromPrivateKey(Loom.privateKey);
Loom.client = new Client(
  Loom.connectionInfo.networkId,
  Loom.connectionInfo.writeUrl,
  Loom.connectionInfo.readUrl
);

Loom.client.on("error", msg => {
  console.error("Error on connect to client", msg);
  console.warn("Please verify if loom command is running");
});
}

async function createContractInstance() {
const networkId = await getCurrentNetwork();
Loom.currentNetwork = Loom.contract.networks[networkId];
//console.log("network:", Loom.currentNetwork);

if (!Loom.currentNetwork) {
  console.error(
    "not a valid network: , network id was:",
    Loom.currentNetwork,
    networkId
  );
  throw Error("Contract not deployed on DAppChain (network id error)");
}

Loom.instance = new Loom.web3.eth.Contract(
  Loom.contract.abi,
  Loom.currentNetwork.address,
  {
    from: Loom.currentUserAddress
  }
);
}

async function getCurrentNetwork() {
return await Loom.web3.eth.net.getId();
}

