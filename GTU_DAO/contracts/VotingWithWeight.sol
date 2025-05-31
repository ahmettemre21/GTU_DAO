// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IStatToken {
    function balanceOf(address account) external view returns (uint256);
    function updateActivity(address user, string memory activityType) external;
    function mint(address to, uint256 amount, string memory reason) external;
}

/**
 * @title VotingWithWeight
 * @dev STAT token weighted voting system for GTU DAO
 * 
 * Features:
 * - Voting power based on STAT token balance
 * - Automatic STAT rewards for participation
 * - Support for different proposal types
 * - Time-limited voting periods
 * - Anti-double voting protection
 */
contract VotingWithWeight {
    
    IStatToken public statToken;
    address public admin;
    uint256 public proposalCounter;
    
    // Proposal categories and their required participation levels
    enum ProposalType { ALL_MEMBERS, CORE_TEAM, COUNCIL }
    enum ProposalStatus { ACTIVE, PASSED, REJECTED, EXPIRED }
    
    struct Proposal {
        uint256 id;
        string title;
        string description;
        string category;
        ProposalType proposalType;
        ProposalStatus status;
        address proposer;
        uint256 yesVotes;
        uint256 noVotes;
        uint256 totalVotingPower;
        uint256 deadline;
        uint256 createdAt;
        bool executed;
        mapping(address => bool) hasVoted;
        mapping(address => bool) voteChoice; // true = yes, false = no
    }
    
    mapping(uint256 => Proposal) public proposals;
    mapping(address => uint256[]) public userProposals;
    mapping(address => uint256[]) public userVotes;
    
    // Events
    event ProposalCreated(
        uint256 indexed proposalId,
        address indexed proposer,
        string title,
        ProposalType proposalType,
        uint256 deadline
    );
    
    event VoteCast(
        uint256 indexed proposalId,
        address indexed voter,
        bool support,
        uint256 weight,
        string comment
    );
    
    event ProposalExecuted(uint256 indexed proposalId, bool passed);
    
    // Constants for STAT rewards
    uint256 public constant PROPOSAL_CREATION_REWARD = 50;
    uint256 public constant VOTE_PARTICIPATION_REWARD = 10;
    uint256 public constant SUCCESSFUL_PROPOSAL_BONUS = 100;
    
    constructor(address _statToken) {
        statToken = IStatToken(_statToken);
        admin = msg.sender;
        proposalCounter = 0;
    }
    
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this function");
        _;
    }
    
    /**
     * @dev Create a new proposal
     * @param _title Title of the proposal
     * @param _description Detailed description
     * @param _category Category (EVENT, FINANCIAL, etc.)
     * @param _proposalType Who can vote on this proposal
     * @param _duration Voting duration in seconds
     */
    function createProposal(
        string memory _title,
        string memory _description,
        string memory _category,
        ProposalType _proposalType,
        uint256 _duration
    ) external {
        require(bytes(_title).length > 0, "Title cannot be empty");
        require(bytes(_description).length > 0, "Description cannot be empty");
        require(_duration > 0, "Duration must be positive");
        
        // Check if user has minimum STAT to create proposal
        uint256 userStat = statToken.balanceOf(msg.sender);
        require(userStat >= 50, "Insufficient STAT to create proposal");
        
        proposalCounter++;
        uint256 deadline = block.timestamp + _duration;
        
        Proposal storage newProposal = proposals[proposalCounter];
        newProposal.id = proposalCounter;
        newProposal.title = _title;
        newProposal.description = _description;
        newProposal.category = _category;
        newProposal.proposalType = _proposalType;
        newProposal.status = ProposalStatus.ACTIVE;
        newProposal.proposer = msg.sender;
        newProposal.yesVotes = 0;
        newProposal.noVotes = 0;
        newProposal.totalVotingPower = 0;
        newProposal.deadline = deadline;
        newProposal.createdAt = block.timestamp;
        newProposal.executed = false;
        
        userProposals[msg.sender].push(proposalCounter);
        
        // Reward proposer with STAT
        statToken.mint(msg.sender, PROPOSAL_CREATION_REWARD, "Proposal Created");
        statToken.updateActivity(msg.sender, "proposal");
        
        emit ProposalCreated(proposalCounter, msg.sender, _title, _proposalType, deadline);
    }
    
    /**
     * @dev Cast a vote on a proposal
     * @param proposalId ID of the proposal to vote on
     * @param support true for YES, false for NO
     * @param comment Optional comment for the vote
     */
    function vote(
        uint256 proposalId, 
        bool support, 
        string memory comment
    ) external {
        Proposal storage proposal = proposals[proposalId];
        
        require(proposalId <= proposalCounter && proposalId > 0, "Invalid proposal ID");
        require(proposal.status == ProposalStatus.ACTIVE, "Proposal not active");
        require(block.timestamp < proposal.deadline, "Voting period ended");
        require(!proposal.hasVoted[msg.sender], "Already voted");
        
        uint256 weight = statToken.balanceOf(msg.sender);
        require(weight > 0, "No STAT tokens, cannot vote");
        
        // Record the vote
        proposal.hasVoted[msg.sender] = true;
        proposal.voteChoice[msg.sender] = support;
        proposal.totalVotingPower += weight;
        
        if (support) {
            proposal.yesVotes += weight;
        } else {
            proposal.noVotes += weight;
        }
        
        userVotes[msg.sender].push(proposalId);
        
        // Reward voter with STAT
        statToken.mint(msg.sender, VOTE_PARTICIPATION_REWARD, "Vote Participation");
        statToken.updateActivity(msg.sender, "vote");
        
        emit VoteCast(proposalId, msg.sender, support, weight, comment);
    }
    
    /**
     * @dev Execute a proposal after voting period ends
     * @param proposalId ID of the proposal to execute
     */
    function executeProposal(uint256 proposalId) external {
        Proposal storage proposal = proposals[proposalId];
        
        require(proposalId <= proposalCounter && proposalId > 0, "Invalid proposal ID");
        require(proposal.status == ProposalStatus.ACTIVE, "Proposal not active");
        require(block.timestamp >= proposal.deadline, "Voting period not ended");
        require(!proposal.executed, "Proposal already executed");
        
        proposal.executed = true;
        
        // Determine result
        bool passed = proposal.yesVotes > proposal.noVotes;
        
        if (passed) {
            proposal.status = ProposalStatus.PASSED;
            // Bonus reward for successful proposal creator
            statToken.mint(
                proposal.proposer, 
                SUCCESSFUL_PROPOSAL_BONUS, 
                "Successful Proposal Bonus"
            );
        } else {
            proposal.status = ProposalStatus.REJECTED;
        }
        
        emit ProposalExecuted(proposalId, passed);
    }
    
    /**
     * @dev Get proposal details
     * @param proposalId ID of the proposal
     * @return id Basic proposal information
     */
    function getProposal(uint256 proposalId) external view returns (
        uint256 id,
        string memory title,
        string memory description,
        string memory category,
        ProposalType proposalType,
        ProposalStatus status,
        address proposer,
        uint256 yesVotes,
        uint256 noVotes,
        uint256 totalVotingPower,
        uint256 deadline,
        uint256 createdAt,
        bool executed
    ) {
        Proposal storage proposal = proposals[proposalId];
        return (
            proposal.id,
            proposal.title,
            proposal.description,
            proposal.category,
            proposal.proposalType,
            proposal.status,
            proposal.proposer,
            proposal.yesVotes,
            proposal.noVotes,
            proposal.totalVotingPower,
            proposal.deadline,
            proposal.createdAt,
            proposal.executed
        );
    }
    
    /**
     * @dev Check if user has voted on a proposal
     * @param proposalId ID of the proposal
     * @param user Address of the user
     * @return hasVoted Whether user has voted
     * @return voteChoice true if voted YES, false if voted NO
     */
    function getUserVote(uint256 proposalId, address user) external view returns (
        bool hasVoted,
        bool voteChoice
    ) {
        Proposal storage proposal = proposals[proposalId];
        return (proposal.hasVoted[user], proposal.voteChoice[user]);
    }
    
    /**
     * @dev Get voting results with percentages
     * @param proposalId ID of the proposal
     * @return result Voting result summary
     */
    function getVotingResult(uint256 proposalId) external view returns (string memory result) {
        Proposal storage proposal = proposals[proposalId];
        
        if (proposal.totalVotingPower == 0) {
            return "No votes cast";
        }
        
        uint256 yesPercentage = (proposal.yesVotes * 100) / proposal.totalVotingPower;
        uint256 noPercentage = (proposal.noVotes * 100) / proposal.totalVotingPower;
        
        if (proposal.yesVotes > proposal.noVotes) {
            return string(abi.encodePacked("PASSED (", toString(yesPercentage), "% YES)"));
        } else if (proposal.noVotes > proposal.yesVotes) {
            return string(abi.encodePacked("REJECTED (", toString(noPercentage), "% NO)"));
        } else {
            return "TIED";
        }
    }
    
    /**
     * @dev Get user's voting power
     * @param user Address of the user
     * @return Current STAT balance (voting power)
     */
    function getVotingPower(address user) external view returns (uint256) {
        return statToken.balanceOf(user);
    }
    
    /**
     * @dev Get total number of proposals
     * @return Total proposal count
     */
    function getTotalProposals() external view returns (uint256) {
        return proposalCounter;
    }
    
    /**
     * @dev Get user's proposal history
     * @param user Address of the user
     * @return Array of proposal IDs created by user
     */
    function getUserProposals(address user) external view returns (uint256[] memory) {
        return userProposals[user];
    }
    
    /**
     * @dev Get user's voting history
     * @param user Address of the user
     * @return Array of proposal IDs user has voted on
     */
    function getUserVotes(address user) external view returns (uint256[] memory) {
        return userVotes[user];
    }
    
    /**
     * @dev Utility function to convert uint to string
     * @param value Number to convert
     * @return String representation of the number
     */
    function toString(uint256 value) internal pure returns (string memory) {
        if (value == 0) {
            return "0";
        }
        uint256 temp = value;
        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
            value /= 10;
        }
        return string(buffer);
    }
    
    /**
     * @dev Update admin address
     * @param newAdmin New admin address
     */
    function updateAdmin(address newAdmin) external onlyAdmin {
        require(newAdmin != address(0), "Invalid admin address");
        admin = newAdmin;
    }
} 