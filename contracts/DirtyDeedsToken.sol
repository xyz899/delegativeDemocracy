// ERC20 contract for Governance Tokens
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DirtyDeedsToken is ERC20, ERC20Votes, ERC20Permit, Ownable {
    uint256 public s_maxSupply = 1000000000000000000000000; 

    // Added Ownable for Access Control Roles : (MINTER, PAUSER if true, DEFAULT_ADMIN)
    constructor()
        ERC20("DirtyDeedsToken", "D4C")
        ERC20Permit("DirtyDeedsToken")
        Ownable(msg.sender) 
    {
        _mint(msg.sender, s_maxSupply);
    }

    function _update(
        address from,
        address to,
        uint256 value
    ) internal override(ERC20, ERC20Votes) {
        super._update(from, to, value);
    }

    function nonces(
        address owner
    ) public view override(ERC20Permit, Nonces) returns (uint256) {
        return super.nonces(owner);
    }
}
