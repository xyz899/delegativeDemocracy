// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./TimelockController.sol";

contract Timelock is TimelockController {
    constructor(
        uint256 minDelay,
        address[] memory proposers,
        address[] memory executors,
        address admin
    ) TimelockController(minDelay, proposers, executors, admin){}

    function revokeAdminRole(address admin) public {
        require(hasRole(DEFAULT_ADMIN_ROLE, admin), "Caller is not an admin");
        revokeRole(DEFAULT_ADMIN_ROLE, admin);
    }


    
}