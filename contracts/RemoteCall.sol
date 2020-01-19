pragma solidity ^0.5.0;



/**------------------------------------

 Remote Execution Script for LAVA protocol


------------------------------------*/



contract ERC20Interface {
    function totalSupply() public view returns (uint);
    function balanceOf(address tokenOwner) public view returns (uint balance);
    function allowance(address tokenOwner, address spender) public view returns (uint remaining);
    function transfer(address to, uint tokens) public returns (bool success);
    function approve(address spender, uint tokens) public returns (bool success);
    function transferFrom(address from, address to, uint tokens) public returns (bool success);

    event Transfer(address indexed from, address indexed to, uint tokens);
    event Approval(address indexed tokenOwner, address indexed spender, uint tokens);
}





contract ApproveAndCallFallBack {
    function receiveApproval(address from, uint256 tokens, address token, bytes memory data) public;
}


contract RemoteCall{


    constructor( ) public {

    }

    /**
    * Do not allow ETH to enter
    */
     function() external payable
     {
         revert();
     }




       /*
         Receive approval from ApproveAndCall() to execute arbitrary code.

       */
     function receiveApproval(address from, uint256 tokens, address token, bytes memory data) public returns (bool success) {


             //------------- run any arbitrary code here


       bytes memory b_address;
       bytes32 b_amount;


        //extract the 64 bytes from the 'method' parameter to use
          assembly {
            b_address := mload(add(data, 32))
            b_amount := mload(add(data, 64))
          }


        address remoteContractAddress = bytesToAddress(b_address);
        uint256 remoteAmount =   uint256(b_amount);

        require(   ERC20Interface(token).transferFrom( from , remoteContractAddress, remoteAmount)  ) ;


              //------------- end arbitrary code


        return true;

     }

     function bytesToAddress (bytes memory b) public view returns (address) {
         uint result = 0;
         for (uint i = 0; i < b.length; i++) {
             uint c = uint(uint8(b[i]));
             if (c >= 48 && c <= 57) {
                 result = result * 16 + (c - 48);
             }
             if(c >= 65 && c<= 90) {
                 result = result * 16 + (c - 55);
             }
             if(c >= 97 && c<= 122) {
                 result = result * 16 + (c - 87);
             }
         }
         return address(result);
      }





}
