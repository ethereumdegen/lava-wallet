/*

https://medium.com/@adrianmcli/migrating-your-truffle-project-to-web3-v1-0-ed3a56f11a4
*/

const { getWeb3, getContractInstance } = require("./web3helpers")
const web3 = getWeb3()
const getInstance = getContractInstance(web3)


const ethAbi = require('ethereumjs-abi')
var ethUtil =  require('ethereumjs-util');
var web3utils =  require('web3-utils');

const Tx = require('ethereumjs-tx')


var EIP712HelperV3 = require("./EIP712HelperV3");
var LavaTestUtils = require("./LavaTestUtils");

var lavaTestUtils = new LavaTestUtils();

var test_account= {
    'address': '0x087964Cd8b33Ea47C01fBe48b70113cE93481e01',
    'privateKey': 'dca672104f895219692175d87b04483d31f53af8caad1d7348d269b35e21c3df'
}
//remve 0x from pkey


contract("LavaWallet", (accounts) => {

  var walletContract ;
  var tokenContract;


  it("can deploy ", async function () {
    walletContract = getInstance("LavaWallet")
    tokenContract = getInstance("TestToken")



    assert.ok(walletContract);
  })




      /*it("finds schemahash", async function () {


        //https://github.com/ethereum/EIPs/blob/master/assets/eip-712/Example.js

        const typedData = {
                types: {

                    LavaPacket: [
                        { name: 'methodName', type: 'string' },
                        { name: 'relayAuthority', type: 'address' },
                        { name: 'from', type: 'address' },
                        { name: 'to', type: 'address' },
                        { name: 'wallet', type: 'address' },
                        { name: 'token', type: 'address' },
                        { name: 'tokens', type: 'uint256' },
                    //    { name: 'relayerRewardToken', type: 'address' },
                        { name: 'relayerRewardTokens', type: 'uint256' },
                        { name: 'expires', type: 'uint256' },
                        { name: 'nonce', type: 'uint256' },
                    //    { name: 'callData', type: 'bytes' }
                    ],
                },
                primaryType: 'LavaPacket',
                domain: {
                    name: 'Lava Wallet',
                    verifyingContract: walletContract.options.address,
                },
                packet: {   //what is word supposed to be ??
                    methodName: 'transfer',
                    relayAuthority: '0x0',
                    from: test_account.address,
                    to: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
                    wallet: walletContract.options.address,
                    token: tokenContract.options.address,
                    tokens: 0,
                  //  relayerRewardToken:tokenContract.options.address,
                    relayerRewardTokens: 0,
                    expires: 999999999,
                    nonce: 0,
            //        callData: web3utils.asciiToHex('')
                },
            };

            const types = typedData.types;



            // signHash() {
                var typedDataHash = ethUtil.sha3(
                    Buffer.concat([
                        Buffer.from('1901', 'hex'),
                    //    EIP712Helper.structHash('EIP712Domain', typedData.domain, types),
                        EIP712HelperV3.structHash(typedData.primaryType, typedData.packet, types),
                    ]),
                );

                const sig = ethUtil.ecsign(typedDataHash , Buffer.from(test_account.privateKey, 'hex') );

                //assert.equal(ethUtil.bufferToHex(typedDataHash), '0xa5b19006c219117816a77e959d656b48f0f21e037fc152224d97a5c016b63692' )
                assert.equal(sig.v,28 )


            });
*/



      it("finds schemahash", async function () {

        web3.eth.defaultAccount = test_account.address;

        //https://github.com/ethereum/EIPs/blob/master/assets/eip-712/Example.js

        const typedData = {
                types: {
                    EIP712Domain: [
                        { name: "contractName", type: "string" },
                        { name: "version", type: "string" },
                        { name: "chainId", type: "uint256" },
                        { name: "verifyingContract", type: "address" }
                    ],
                    LavaPacket: [
                        { name: 'methodName', type: 'string' },
                        { name: 'relayAuthority', type: 'address' },
                        { name: 'from', type: 'address' },
                        { name: 'to', type: 'address' },
                        { name: 'wallet', type: 'address' },
                        { name: 'token', type: 'address' },
                        { name: 'tokens', type: 'uint256' },
                        { name: 'relayerRewardTokens', type: 'uint256' },
                        { name: 'expires', type: 'uint256' },
                        { name: 'nonce', type: 'uint256' }
                    ],
                },
                primaryType: 'LavaPacket',
                domain: {
                  contractName: 'Lava Wallet',
                  version: '1',
                  chainId: 1,
                  verifyingContract: walletContract.options.address
                },
                message: {   //what is word supposed to be ??
                    methodName: 'approve',
                    relayAuthority: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
                    from: test_account.address,
                    to: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
                    wallet: walletContract.options.address,
                    token: tokenContract.options.address,
                    tokens: 0,
                    relayerRewardTokens: 0,
                    expires: 999999999,
                    nonce: 0
                },
            };

            const types = typedData.types;


              var typedDataHash = ethUtil.sha3(
                  Buffer.concat([
                      Buffer.from('1901', 'hex'),
                      EIP712HelperV3.structHash('EIP712Domain', typedData.domain, types),
                      EIP712HelperV3.structHash(typedData.primaryType, typedData.message, types),
                  ]),
              );


                  var testpacketdata = {
                    methodName: 'approve',
                    relayAuthority: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
                    from: test_account.address,
                    to: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
                    wallet: walletContract.options.address,
                    token: tokenContract.options.address,
                    tokens: 0,
                    relayerRewardTokens: 0,
                    expires: 999999999,
                    nonce: 0
                  }

                var computedMessageHash = EIP712HelperV3.structHash(typedData.primaryType, typedData.message, types)
                var contractMessageHash = await walletContract.methods.getLavaPacketHash(testpacketdata.methodName,testpacketdata.relayAuthority,testpacketdata.from,testpacketdata.to,testpacketdata.wallet,testpacketdata.token, testpacketdata.tokens,testpacketdata.relayerRewardTokens,testpacketdata.expires,testpacketdata.nonce).call();

                assert.equal('0x'+computedMessageHash.toString('hex'), contractMessageHash)

                var computedDomainHash = EIP712HelperV3.structHash('EIP712Domain', typedData.domain, types)
                var contractDomainHash = await walletContract.methods.getEIP712DomainHash('Lava Wallet','1',1,walletContract.options.address).call();

                assert.equal('0x'+computedDomainHash.toString('hex'), contractDomainHash)


            });



            it("checks sub hashes 2 ", async function () {

           var lavaPacketTypehash = await walletContract.methods.getLavaPacketTypehash().call()
             //var domainTypehash = await walletContract.methods.getEIP712DomainHash().call()




              var methodName =  'approve'    //convert to bytes
              var relayAuthority = "0x357FfaDBdBEe756aA686Ef6843DA359E2a85229c"
              var from= test_account.address
              var to= "0x357FfaDBdBEe756aA686Ef6843DA359E2a85229c"
              var walletAddress=walletContract.options.address
              var tokenAddress=tokenContract.options.address
              var tokenAmount=2000000
            //  var relayerRewardToken=tokenContract.options.address
              var relayerRewardTokens=1000000
              var expires=336504400
              var nonce='0xc18f687c56f1b2749af7d6151fa351'
              //var expectedSignature="0x8ef27391a81f77244bf95df58737eecac386ab9a47acd21bdb63757adf71ddf878169c18e4ab7b71d60f333c870258a0644ac7ade789d59c53b0ab75dbcc87d11b"

               //add new code here !!

              var typedData = LavaTestUtils.getLavaTypedDataFromParams(
                methodName,
                relayAuthority,
                from,
                to,
                walletAddress,
                tokenAddress,
                tokenAmount,
              //  relayerRewardToken,
                relayerRewardTokens,
                expires,
                nonce);


              var domainStructHash =  EIP712HelperV3.typeHash('EIP712Domain', typedData.types);
              var lavaPacketStructHash =  EIP712HelperV3.typeHash('LavaPacket', typedData.types);



               assert.equal(LavaTestUtils.bufferToHex(lavaPacketStructHash), lavaPacketTypehash  ); //initialized



               var lavaPacketTuple = [methodName,
                                       relayAuthority,
                                       from,
                                       to,
                                       walletAddress,
                                       tokenAddress,
                                       tokenAmount,
                                       relayerRewardTokens,
                                       expires,
                                       nonce]

                console.log('lavaPacketTypehash ', lavaPacketTypehash)
                console.log('STRUCT HASH!',LavaTestUtils.bufferToHex(lavaPacketStructHash))


              console.log('lava packet tuple ', lavaPacketTuple)


          //     var domainHash = await walletContract.methods.getDomainHash(["Lava Wallet",walletContract.options.address]).call()
               var lavaPacketHash = await walletContract.methods.getLavaPacketHash(
                 methodName,
                 relayAuthority,
                 from,
                 to,
                 walletAddress,
                 tokenAddress,
                 tokenAmount,
                 relayerRewardTokens,
                 expires,
                 nonce
               ).call()



           //assert.equal(domainHash, LavaTestUtils.bufferToHex( EIP712Helper.structHash('EIP712Domain', typedData.domain, typedData.types) )    );

           console.log('checking lava packet hash: ' + lavaPacketHash)
           //why is this failing on the values !?
           assert.equal(lavaPacketHash, LavaTestUtils.bufferToHex( EIP712HelperV3.structHash('LavaPacket', typedData.message, typedData.types) )     );



            });


                        it(" does transfer  ", async function () {

                      //    var domainTypehash = await walletContract.methods.getDomainTypehash().call()
                          var lavaPacketTypehash = await walletContract.methods.getLavaPacketTypehash().call()




                          var methodName =  'transfer'    //convert to bytes
                          var relayAuthority = test_account.address// self for right now , could be anyone
                          var from= test_account.address
                          var to= "0x357FfaDBdBEe756aA686Ef6843DA359E2a85229c"
                          var walletAddress=walletContract.options.address
                          var tokenAddress=tokenContract.options.address
                          var tokenAmount=200
                        //  var relayerRewardToken=tokenContract.options.address
                          var relayerRewardTokens=100
                          var expires=336504400
                          var nonce='0xc18f687c56f1b2749af7d6151fa351'

                          //var expectedSignature="0x4c09b1df6d348b462da89e6b833aa18efec11bc7064eff6d6876582232571873"

                           //add new code here !!

                          var typedData = LavaTestUtils.getLavaTypedDataFromParams(
                            methodName,
                            relayAuthority,
                            from,
                            to,
                            walletAddress,
                            tokenAddress,
                            tokenAmount,
                          //  relayerRewardToken,
                            relayerRewardTokens,
                            expires,
                            nonce);

                            console.log('meep typed data '+ JSON.stringify(typedData))


                      //    var domainStructHash =  EIP712Helper.typeHash('EIP712Domain', typedData.types);
                          var lavaPacketStructHash =  EIP712HelperV3.typeHash('LavaPacket', typedData.types);

                    //      assert.equal(LavaTestUtils.bufferToHex(domainStructHash), domainTypehash    ); //initialized

                           assert.equal(LavaTestUtils.bufferToHex(lavaPacketStructHash), lavaPacketTypehash  ); //initialized



                           var lavaPacketTuple = [methodName,
                                                   relayAuthority,
                                                   from,
                                                   to,
                                                   walletAddress,
                                                   tokenAddress,
                                                   tokenAmount,
                                                   relayerRewardTokens,
                                                   expires,
                                                   nonce]

                            console.log('lavaPacketTypehash ', lavaPacketTypehash)


                          console.log('lava packet tuple ', lavaPacketTuple)


                      //     var domainHash = await walletContract.methods.getDomainHash(["Lava Wallet",walletContract.options.address]).call()
                           var lavaPacketHash = await walletContract.methods.getLavaPacketHash(methodName,
                                                                                   relayAuthority,
                                                                                   from,
                                                                                   to,
                                                                                   walletAddress,
                                                                                   tokenAddress,
                                                                                   tokenAmount,
                                                                                   relayerRewardTokens,
                                                                                   expires,
                                                                                   nonce).call()



                       //assert.equal(domainHash, LavaTestUtils.bufferToHex( EIP712Helper.structHash('EIP712Domain', typedData.domain, typedData.types) )    );


                       //why is this failing on the values !?
                       assert.equal(lavaPacketHash, LavaTestUtils.bufferToHex( EIP712HelperV3.structHash('LavaPacket', typedData.message, typedData.types) )     );







                       var response = await   tokenContract.methods.balanceOf( test_account.address ).call( );
                       console.log('balance of user ',response)


                        //Approve the tokens to the wallet contract

                        //does not work ! ?
                           var response = await   tokenContract.methods.approve(
                                  walletContract.options.address,
                                  3000000000000
                                  ).send( {from: test_account.address} )

                               //this is reverting !

                          //     assert.ok(response); //initialized




                          console.log('approved tokens')


                           console.log('wallet address is '+walletContract.options.address)
                           console.log('token address is '+tokenContract.options.address)

                            console.log('test acct address is '+test_account.address)

                          /*  var response = await   tokenContract.methods.transfer(
                                   walletContract.options.address,
                                   3000000000000
                                   ).send( {from: test_account.address} )

                             var response = await   tokenContract.methods.balanceOf(  walletContract.options.address ).call( );
                             console.log('balance of contract ',response)
                            */


                          //do the meta tx
                          var privateKey = test_account.privateKey;
                          var privKey = Buffer.from(privateKey, 'hex')


                          //console.log('typed data:', typedData)



                          assert.equal(lavaPacketHash, LavaTestUtils.bufferToHex( EIP712HelperV3.structHash('LavaPacket', typedData.message, typedData.types) )     );






                          const typedDataHash = LavaTestUtils.getLavaTypedDataHash(typedData, typedData.types);

                          console.log('typedDataHash', typedDataHash)

                          const sig = ethUtil.ecsign(typedDataHash , privKey );
                      //    console.log('sig is '+ JSON.stringify(sig))
                          //    let sig = await web3.eth.sign(typedDataHash, privKey);
                          //let signatureData = ethUtil.fromRpcSig( ethUtil.toRpcSig(sig.v, sig.r, sig.s) );
                          //  assert.equal(  LavaTestUtils.lavaPacketHasValidSignature( fallPacket ) , true   )

                            var signature = ethUtil.toRpcSig(sig.v, sig.r, sig.s);


                            var recoveredAddress = LavaTestUtils.lavaPacketHasValidSignature(
                                    typedData,
                                     signature )

                            assert.equal(test_account.address.toLowerCase(), recoveredAddress.toLowerCase() )


                          //  tokenContract.methods.approve


                          //console.log('sig is: '+signature)

                          var response = await tokenContract.methods.allowance( test_account.address, walletContract.options.address ).call( );
                            console.log(' approved tokens ',response)



                          var response =  await   walletContract.methods.transferTokensWithSignature(
                                 methodName,
                                 relayAuthority,
                                 from,
                                 to,
                                 tokenAddress,
                                 tokenAmount,
                                 relayerRewardTokens,
                                 expires,
                                 nonce,
                                 signature

                              ).send( {from: test_account.address} )

                              console.log('res',response)
                              assert.ok(response); //initialized



                        });




/*
            it("can approveTokensWithSignature ", async function () {


                await printBalance(test_account.address,tokenContract)




                var addressFrom = test_account.address;

                console.log( addressFrom )

                //var msg = '0x8CbaC5e4d803bE2A3A5cd3DbE7174504c6DD0c1C'
                var requestRecipient = test_account.address;
                var requestQuantity = 500;



                 var requestNonce = web3utils.randomHex(32);

                 var privateKey = test_account.privateKey;


                 var methodName =   'transfer'    //convert to bytes
                 var relayAuthority = '0x357FfaDBdBEe756aA686Ef6843DA359E2a85229c'
                 var from= addressFrom
                 var to= "0x357FfaDBdBEe756aA686Ef6843DA359E2a85229c"
                 var walletAddress=walletContract.options.address
                 var tokenAddress=tokenContract.options.address
                 var tokenAmount=2000000
                 var relayerRewardToken=tokenContract.options.address
                 var relayerRewardTokens=1000000
                 var expires=336504400
                 var nonce='0xc18f687c56f1b2749af7d6151fa351'
                 //var expectedSignature="0x8ef27391a81f77244bf95df58737eecac386ab9a47acd21bdb63757adf71ddf878169c18e4ab7b71d60f333c870258a0644ac7ade789d59c53b0ab75dbcc87d11b"

                  //add new code here !!

                 var typedData = LavaTestUtils.getLavaTypedDataFromParams(
                                 methodName,
                                 relayAuthority,
                                 from,
                                 to,
                                 walletAddress,
                                 tokenAddress,
                                 tokenAmount,
                                 relayerRewardTokens,
                                 expires,
                                 nonce);


                    const types = typedData.types;


                const typedDataHash = LavaTestUtils.getLavaTypedDataHash(typedData,types);


                  //https://github.com/ethers-io/ethers.js/issues/46/




                  var tuple = [
                  methodName,
                  relayAuthority,
                  from,
                  to,
                  walletAddress,
                  tokenAddress,
                  tokenAmount,
                  relayerRewardTokens,
                  expires,
                  nonce];

                    console.log('  tuple   ',   tuple  )



                ///msg hash signed is 0x9201073a01df85b87dab83ad2498bf5b2190bf62cb03b2a407ba7d77279a4ceb
                var lavaMsgHash = await walletContract.methods.getLavaTypedDataHash(  methodName,
                                                                            relayAuthority,
                                                                            from,
                                                                            to,
                                                                            walletAddress,
                                                                            tokenAddress,
                                                                            tokenAmount,
                                                                            relayerRewardTokens,
                                                                            expires,
                                                                            nonce ).call({from: test_account.address})
                console.log('lavaMsgHash',lavaMsgHash)
                console.log('typedDataHash.toString()',typedDataHash.toString('hex'))

                assert.equal(lavaMsgHash, '0x' + typedDataHash.toString('hex') ); //initialized




                //how to generate a good signature using web3 ?
                //---------------??????????????????????

                  var lavaPacketStruct =   typedData.message

                  var privKey = Buffer.from(privateKey, 'hex')


              const sig = ethUtil.ecsign(typedDataHash , privKey );
              //    let sig = await web3.eth.sign(typedDataHash, privKey);
                  let signatureData = ethUtil.fromRpcSig(sig);

                console.log('@@ sig',  signatureData)

                console.log('@@ struct ',  lavaPacketStruct)

                var fullPacket = LavaTestUtils.getLavaPacket(
                  methodName,
                    relayAuthority,
                    from,
                    to,
                    walletAddress,
                    tokenAddress,
                    tokenAmount,
                //    relayerRewardToken,
                    relayerRewardTokens,
                    expires,
                    nonce,
                    signatureData
                  )

                assert.equal(  LavaTestUtils.lavaPacketHasValidSignature( fallPacket ) , true   )


                //finish me

                //walletContract.methods.approveTokensWithSignature(    )



                  });


*/

/*
                  it("can approveTokensWithSignature ", async function () {


                      await printBalance(test_account.address,tokenContract)




                      var addressFrom = test_account.address;

                      console.log( addressFrom )

                      //var msg = '0x8CbaC5e4d803bE2A3A5cd3DbE7174504c6DD0c1C'
                      var requestRecipient = test_account.address;
                      var requestQuantity = 500;



                       var requestNonce = web3utils.randomHex(32);

                       var privateKey = test_account.privateKey;


                       var methodname = 'approve'
                       var requiresKing = false
                       var from= addressFrom
                       var to= "0x357FfaDBdBEe756aA686Ef6843DA359E2a85229c"
                       var walletAddress=walletContract.address
                       var tokenAddress=tokenContract.address
                       var tokenAmount=2000000
                       var relayerReward=1000000
                       var expires=336504400
                       var nonce='0xc18f687c56f1b2749af7d6151fa351'
                       //var expectedSignature="0x8ef27391a81f77244bf95df58737eecac386ab9a47acd21bdb63757adf71ddf878169c18e4ab7b71d60f333c870258a0644ac7ade789d59c53b0ab75dbcc87d11b"

                        //add new code here !!

                       var typedData = LavaTestUtils.getLavaTypedDataFromParams(
                         methodname,
                         requiresKing,
                         from,
                         to,
                         walletAddress,
                         tokenAddress,
                         tokenAmount,
                         relayerReward,
                         expires,
                         nonce);


                          const types = typedData.types;


                      const typedDataHash = LavaTestUtils.getLavaTypedDataHash(typedData,types);

                        var privKey = Buffer.from(privateKey, 'hex')

                      const sig = ethUtil.ecsign(typedDataHash , privKey );


                        console.log('@@ walletContract',  walletContract.address)

                        //https://github.com/ethers-io/ethers.js/issues/46/

                        var lavaPacketStruct =   typedData.packet
                        console.log('  lavaPacketStruct   ',   lavaPacketStruct  )

                        var tuple = [methodname,
                        requiresKing,
                        from,
                        to,
                        walletAddress,
                        tokenAddress,
                        tokenAmount,
                        relayerReward,
                        expires,
                        nonce];

                          console.log('  tuple   ',   tuple  )
                          console.log('  walletContract.methods   ',   walletContract.methods  )


                      ///msg hash signed is 0x9201073a01df85b87dab83ad2498bf5b2190bf62cb03b2a407ba7d77279a4ceb
                      var lavaMsgHash = await walletContract.methods.getLavaTypedDataHash( methodname,
                                                                                      requiresKing,
                                                                                      from,
                                                                                      to,
                                                                                      walletAddress,
                                                                                      tokenAddress,
                                                                                      tokenAmount,
                                                                                      relayerReward,
                                                                                      expires,
                                                                                      nonce ).send()
                      console.log('lavaMsgHash',lavaMsgHash)

                      assert.equal(lavaMsgHash, msgHash ); //initialized


                      var signature = lavaTestUtils.signTypedData(privKey,msgParams);



                      lavaSignature = signature;
                      console.log('lava signatureaa',msgParams,signature)

                      msgParams.sig = signature;



                      var recoveredAddress = lavaTestUtils.recoverTypedSignature(msgParams);

                      assert.equal(recoveredAddress, test_account.address ); //initialized


                      console.log('result1', lavaMsgHash )


                      console.log('addressFrom',addressFrom)
                      console.log('meeep',[from,to,tokenAddress,tokenAmount,relayerReward,expires,nonce,signature])



                    //  var result = await walletContract.approveTokensWithSignature.call(from,to,tokenAddress,tokenAmount,relayerReward,expires,nonce )



                      var txData = web3.eth.abi.encodeFunctionCall({
                              name: 'approveTokensWithSignature',
                              type: 'function',
                              inputs: [
                                {
                                  "name": "packet",
                                  "type": "LavaPacket"
                                },
                                {
                                  "name": "signature",
                                  "type": "bytes"
                                }
                              ],
                                outputs: [
                                  {
                                    "name": "success",
                                    "type": "bool"
                                  }
                              ]
                          }, [typedData.packet,signature]);


                        try{
                            var txCount = await web3.eth.getTransactionCount(addressFrom);
                            console.log('txCount',txCount)
                           } catch(error) {  //here goes if someAsyncPromise() rejected}
                            console.log(error);

                             return error;    //this will result in a resolved promise.
                           }

                           var addressTo = walletContract.address;
                           var privateKey = test_account.privateKey;

                          const txOptions = {
                            nonce: web3utils.toHex(txCount),
                            gas: web3utils.toHex("1704624"),
                            gasPrice: web3utils.toHex(web3utils.toWei("4", 'gwei') ),
                            value: 0,
                            to: addressTo,
                            from: addressFrom,
                            data: txData
                          }



                        var txhash = await new Promise(function (result,error) {

                              sendSignedRawTransaction(web3,txOptions,addressFrom,privateKey, function(err, res) {
                              if (err) error(err)
                                result(res)
                            })

                          }.bind(this));



                          assert.ok(txhash)

                          var burnStatus = await walletContract.signatureBurnStatus.call(msgHash )

                          assert.equal( burnStatus.toNumber() , 0x1); //initialized

                    });



*/


})


async function sendSignedRawTransaction(web3,txOptions,addressFrom,fullPrivKey,callback) {


  var privKey = truncate0xFromString( fullPrivKey )

  const privateKey = new Buffer( privKey, 'hex')
  const transaction = new Tx(txOptions)


  transaction.sign(privateKey)


  const serializedTx = transaction.serialize().toString('hex')

    try
    {
      var result =  web3.eth.sendSignedTransaction('0x' + serializedTx, callback)
    }catch(e)
    {
      console.log(e);
    }
}


 function truncate0xFromString(s)
{

  if(s.startsWith('0x')){
    return s.substring(2);
  }
  return s;
}

async function getBalance (account ,tokenContract)
{
      var balance_eth = await (web3.eth.getBalance(account ));
     var balance_token = await tokenContract.methods.balanceOf(account).call({from: account });

     return {ether: web3utils.fromWei(balance_eth.toString(), 'ether'), token: balance_token  };

 }

 async function printBalance (account ,tokenContract)
 {
       var balance_eth = await (web3.eth.getBalance(account ));
      var balance_token = await tokenContract.methods.balanceOf(account).call( {from: account });


      console.log('acct balance', account, web3utils.fromWei(balance_eth.toString() , 'ether')  , balance_token )

  }
