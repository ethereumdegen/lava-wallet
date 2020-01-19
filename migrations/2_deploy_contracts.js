var Token = artifacts.require("./TestToken.sol");


var LavaWallet = artifacts.require("./LavaWallet.sol");

var RemoteCall = artifacts.require("./RemoteCall.sol");


module.exports = function(deployer) {


  return deployer.deploy(Token).then(function(){
    console.log('deploy 1 ')

      return deployer.deploy(RemoteCall).then(function(){
          console.log('deploy 2 ')

            return deployer.deploy(LavaWallet).then(function(){
                console.log('deploy 3 ',  LavaWallet.address)
                 return LavaWallet.deployed()
          });

       });
  });

 



};
