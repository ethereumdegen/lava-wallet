

var LavaWallet = artifacts.require("./LavaWallet.sol");


module.exports = function(deployer) {


             deployer.deploy(LavaWallet).then(function(){
                  console.log('deploy 3 ',  LavaWallet.address)
                   return LavaWallet.deployed()
            });

    
};
