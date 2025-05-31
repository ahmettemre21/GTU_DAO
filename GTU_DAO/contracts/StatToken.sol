// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title StatToken
 * @dev Soulbound (non-transferable) token for GTU DAO governance weight
 * Used for reputation-based voting power in DAO decisions
 * 
 * Features:
 * - Non-transferable (soulbound behavior)
 * - Only DAO can mint/burn tokens
 * - Represents user status and contribution level
 * - Used as voting weight multiplier
 */
contract StatToken is ERC20, Ownable {
    
    // Events for tracking STAT changes
    event StatMinted(address indexed user, uint256 amount, string reason);
    event StatBurned(address indexed user, uint256 amount, string reason);
    event StatDecayed(address indexed user, uint256 amount);
    
    // User metadata for tracking contributions
    struct UserStats {
        uint256 lastActivityTimestamp;
        uint256 totalContributions;
        uint256 proposalsCreated;
        uint256 votesParticipated;
        string role;
    }
    
    mapping(address => UserStats) public userStats;
    
    // Constants for STAT management
    uint256 public constant DECAY_PERIOD = 30 days;
    uint256 public constant DECAY_RATE = 5; // 5% decay per period
    
    // Initial STAT amounts by role
    mapping(string => uint256) public roleInitialStats;
    
    constructor(address initialOwner) ERC20("GTU DAO Status Token", "STAT") Ownable(initialOwner) {
        // Set initial STAT amounts for different roles
        roleInitialStats["PRESIDENT"] = 1000;
        roleInitialStats["VICE_PRESIDENT"] = 800;
        roleInitialStats["CORE_TEAM"] = 600;
        roleInitialStats["MEMBER"] = 100;
    }
    
    /**
     * @dev Mint STAT tokens to a user with reason tracking
     * @param to Address to mint tokens to
     * @param amount Amount of tokens to mint
     * @param reason Reason for minting (e.g., "Proposal Created", "Event Organized")
     */
    function mint(address to, uint256 amount, string memory reason) public onlyOwner {
        _mint(to, amount);
        userStats[to].lastActivityTimestamp = block.timestamp;
        userStats[to].totalContributions += amount;
        
        emit StatMinted(to, amount, reason);
    }
    
    /**
     * @dev Burn STAT tokens from a user with reason tracking
     * @param from Address to burn tokens from
     * @param amount Amount of tokens to burn
     * @param reason Reason for burning (e.g., "Spam Proposal", "Violation")
     */
    function burn(address from, uint256 amount, string memory reason) public onlyOwner {
        _burn(from, amount);
        
        emit StatBurned(from, amount, reason);
    }
    
    /**
     * @dev Initialize a new user with role-based STAT
     * @param user Address of the new user
     * @param role Role of the user (PRESIDENT, CORE_TEAM, etc.)
     */
    function initializeUser(address user, string memory role) public onlyOwner {
        uint256 initialAmount = roleInitialStats[role];
        require(initialAmount > 0, "Invalid role");
        
        _mint(user, initialAmount);
        userStats[user] = UserStats({
            lastActivityTimestamp: block.timestamp,
            totalContributions: initialAmount,
            proposalsCreated: 0,
            votesParticipated: 0,
            role: role
        });
        
        emit StatMinted(user, initialAmount, string(abi.encodePacked("Role: ", role)));
    }
    
    /**
     * @dev Update user activity for contribution tracking
     * @param user Address of the user
     * @param activityType Type of activity (proposal, vote, event)
     */
    function updateActivity(address user, string memory activityType) public onlyOwner {
        userStats[user].lastActivityTimestamp = block.timestamp;
        
        if (keccak256(bytes(activityType)) == keccak256(bytes("proposal"))) {
            userStats[user].proposalsCreated++;
        } else if (keccak256(bytes(activityType)) == keccak256(bytes("vote"))) {
            userStats[user].votesParticipated++;
        }
    }
    
    /**
     * @dev Apply decay to inactive users
     * @param user Address to apply decay to
     */
    function applyDecay(address user) public {
        require(
            block.timestamp >= userStats[user].lastActivityTimestamp + DECAY_PERIOD,
            "User is still active"
        );
        
        uint256 currentBalance = balanceOf(user);
        uint256 decayAmount = (currentBalance * DECAY_RATE) / 100;
        
        if (decayAmount > 0) {
            _burn(user, decayAmount);
            emit StatDecayed(user, decayAmount);
        }
    }
    
    /**
     * @dev Get user's complete stats
     * @param user Address to get stats for
     * @return stats UserStats struct
     */
    function getUserStats(address user) public view returns (UserStats memory) {
        return userStats[user];
    }
    
    /**
     * @dev Check if user needs decay
     * @param user Address to check
     * @return bool Whether user needs decay
     */
    function needsDecay(address user) public view returns (bool) {
        return block.timestamp >= userStats[user].lastActivityTimestamp + DECAY_PERIOD;
    }
    
    /**
     * @dev Override to prevent transfers (soulbound behavior)
     * Only minting (from 0x0) and burning (to 0x0) are allowed
     */
    function _update(
        address from,
        address to,
        uint256 amount
    ) internal override {
        require(
            from == address(0) || to == address(0), 
            "STAT is soulbound and cannot be transferred"
        );
        super._update(from, to, amount);
    }
    
    /**
     * @dev Disable approve function for soulbound token
     */
    function approve(address spender, uint256 amount) public pure override returns (bool) {
        revert("STAT tokens cannot be approved for transfer");
    }
    
    /**
     * @dev Disable transferFrom function for soulbound token
     */
    function transferFrom(address from, address to, uint256 amount) public pure override returns (bool) {
        revert("STAT tokens cannot be transferred");
    }
} 