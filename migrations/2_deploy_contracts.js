var Token = artifacts.require("./StandardToken.sol");


var LavaWallet = artifacts.require("./LavaWallet.sol");

module.exports = function(deployer) {

  deployer.deploy(Token);


  //  deployer.deploy(LavaWallet);

    return deployer.deploy(LavaWallet).then(function(){
        console.log('deploy 3 ',  LavaWallet.address)
         return LavaWallet.deployed()
  });


  /*return deployer.deploy(_0xBitcoinToken).then(function(){
    console.log('deploy 1 ')
    return deployer.deploy(MintHelper, _0xBitcoinToken.address, 0, 0 ).then(function(){
      console.log('deploy x', _0xBitcoinToken.address)

        return deployer.deploy(MiningDelegate, _0xBitcoinToken.address).then(function(){   //issue ??
            console.log('deploy 2 ',  MiningDelegate.address)




            return deployer.deploy(LavaWallet).then(function(){
                console.log('deploy 3 ',  LavaWallet.address)
                 return LavaWallet.deployed()
          });



      });
    });

  });*/

  //  deployer.deploy(miningKing);






};
