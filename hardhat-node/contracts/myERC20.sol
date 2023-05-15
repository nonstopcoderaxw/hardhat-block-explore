// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract MyErc20 is ERC20 {
    event ReceivedETH(address from, uint256 ethAmt);

    constructor() ERC20("MyErc20", "MMM") {
        _mint(msg.sender, 10000*10**18);
    }

    function sendETH() external payable {
        emit ReceivedETH(msg.sender, msg.value);
    }
    
    receive() external payable {
        emit ReceivedETH(msg.sender, msg.value);
    }
}

