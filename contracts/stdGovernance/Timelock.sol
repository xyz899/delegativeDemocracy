// Timelock Contract
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// @openzeppelin/contracts/governance/
import "@openzeppelin/contracts/governance/TimelockController.sol";

// Timelock for a required amount of time before passing certain events : vote, delegate, execute....

contract Timelock is TimelockController {
    constructor(
        uint256 minDelay,
        address[] memory proposers,
        address[] memory executors,
        address admin
    ) TimelockController(minDelay, proposers, executors, admin) {}
}
