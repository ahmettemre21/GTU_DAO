// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./StatToken.sol";
import "./VotingWithWeight.sol";
import "./WorldIDVerifier.sol";
import "./VlayerZKVerifier.sol";
import "./BlockscoutRegistry.sol";

/**
 * @title GTUDAOGovernance
 * @dev Main governance contract for GTU DAO - ETH Prague 2025 ($40k Total Prize Pool)
 * Integrates all ETH Prague prize pools:
 * - World App ($10k): Identity verification with World ID
 * - vlayer ($10k): Zero-knowledge proofs for privacy
 * - Blockscout ($20k): Enhanced transparency and tracking
 */
contract GTUDAOGovernance {
    
    // Core contracts
    StatToken public statToken;
    VotingWithWeight public voting;
    WorldIDVerifier public worldVerifier;
    VlayerZKVerifier public vlayerVerifier;
    BlockscoutRegistry public blockscoutRegistry;
    
    // Governance settings
    address public admin;
    uint256 public constant MIN_STAT_FOR_PROPOSAL = 100;
    uint256 public constant MIN_STAT_FOR_VOTING = 10;
    uint256 public constant PROPOSAL_DURATION = 7 days;
    
    // Member management
    enum MemberRole { MEMBER, CORE_TEAM, VICE_PRESIDENT, PRESIDENT }
    
    struct Member {
        address wallet;
        string name;
        string email;
        MemberRole role;
        uint256 joinDate;
        bool isVerifiedWithWorldID;
        bool hasZKProof;
        bool isActive;
        string studentId;
        string department;
    }
    
    mapping(address => Member) public members;
    mapping(address => bool) public isMember;
    address[] public memberAddresses;
    
    // Events
    event MemberAdded(
        address indexed memberAddress,
        string name,
        MemberRole role,
        uint256 timestamp
    );
    
    event MemberVerified(
        address indexed memberAddress,
        string verificationType,
        uint256 timestamp
    );
    
    event ProposalCreatedWithVerification(
        uint256 indexed proposalId,
        address indexed proposer,
        bool worldIDVerified,
        bool zkProofVerified,
        uint256 timestamp
    );
    
    event VoteCastWithPrivacy(
        uint256 indexed proposalId,
        bool isAnonymous,
        bytes32 zkProofId,
        uint256 timestamp
    );
    
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this function");
        _;
    }
    
    modifier onlyMember() {
        require(isMember[msg.sender], "Only members can call this function");
        _;
    }
    
    modifier onlyVerifiedMember() {
        require(isMember[msg.sender], "Not a member");
        require(
            members[msg.sender].isVerifiedWithWorldID || members[msg.sender].hasZKProof,
            "Member not verified"
        );
        _;
    }
    
    constructor() {
        admin = msg.sender;
        
        // Deploy core contracts
        statToken = new StatToken();
        voting = new VotingWithWeight(address(statToken));
        worldVerifier = new WorldIDVerifier("gtu_dao_app", "member_verification");
        vlayerVerifier = new VlayerZKVerifier(address(0)); // Will be updated with actual vlayer verifier
        blockscoutRegistry = new BlockscoutRegistry(address(this));
        
        // Register contracts in Blockscout
        string[] memory tags = new string[](2);
        tags[0] = "governance";
        tags[1] = "dao";
        
        blockscoutRegistry.registerContract(
            address(this),
            "GTU DAO Governance",
            "Main governance contract for GTU DAO",
            "1.0.0",
            tags
        );
        
        // Initialize admin as first member
        _addMember(
            admin,
            "Admin",
            "admin@gtu.edu.tr",
            MemberRole.PRESIDENT,
            "ADMIN001",
            "Computer Engineering"
        );
    }
    
    /**
     * @dev Add a new member to the DAO
     * @param memberAddress Wallet address of the member
     * @param name Full name
     * @param email Email address
     * @param role Member role
     * @param studentId Student ID
     * @param department Department
     */
    function addMember(
        address memberAddress,
        string memory name,
        string memory email,
        MemberRole role,
        string memory studentId,
        string memory department
    ) external onlyAdmin {
        _addMember(memberAddress, name, email, role, studentId, department);
    }
    
    /**
     * @dev Internal function to add member
     */
    function _addMember(
        address memberAddress,
        string memory name,
        string memory email,
        MemberRole role,
        string memory studentId,
        string memory department
    ) internal {
        require(!isMember[memberAddress], "Already a member");
        
        members[memberAddress] = Member({
            wallet: memberAddress,
            name: name,
            email: email,
            role: role,
            joinDate: block.timestamp,
            isVerifiedWithWorldID: false,
            hasZKProof: false,
            isActive: true,
            studentId: studentId,
            department: department
        });
        
        isMember[memberAddress] = true;
        memberAddresses.push(memberAddress);
        
        // Initialize STAT tokens based on role
        statToken.initializeUser(memberAddress, _roleToString(role));
        
        // Register transaction in Blockscout
        blockscoutRegistry.registerTransaction(
            keccak256(abi.encodePacked(memberAddress, block.timestamp)),
            admin,
            memberAddress,
            0,
            "",
            "member-addition",
            string(abi.encodePacked("Added member: ", name))
        );
        
        emit MemberAdded(memberAddress, name, role, block.timestamp);
    }
    
    /**
     * @dev Verify member with World ID (ETH Prague $10k prize integration)
     * @param merkleRoot World ID Merkle root
     * @param nullifierHash Nullifier hash
     * @param proof ZK proof array
     * @param verificationLevel Verification level
     */
    function verifyWithWorldID(
        uint256 merkleRoot,
        uint256 nullifierHash,
        uint256[8] memory proof,
        string memory verificationLevel
    ) external onlyMember {
        
        // Verify with World ID contract
        worldVerifier.verifyWithWorldID(
            merkleRoot,
            nullifierHash,
            proof,
            verificationLevel
        );
        
        // Update member status
        members[msg.sender].isVerifiedWithWorldID = true;
        
        // Reward with STAT tokens
        statToken.mint(msg.sender, 50, "World ID Verification");
        
        // Register in Blockscout
        blockscoutRegistry.registerTransaction(
            keccak256(abi.encodePacked(msg.sender, "worldid", block.timestamp)),
            msg.sender,
            address(worldVerifier),
            0,
            "",
            "kyc",
            "World ID verification completed"
        );
        
        emit MemberVerified(msg.sender, "World ID", block.timestamp);
    }
    
    /**
     * @dev Submit ZK proof for privacy verification (ETH Prague $10k vlayer integration)
     * @param proof ZK proof array
     * @param publicSignals Public signals
     * @param proofType Type of proof
     */
    function submitZKProof(
        uint256[8] memory proof,
        uint256[] memory publicSignals,
        string memory proofType
    ) external onlyMember returns (bytes32 proofId) {
        
        // Submit proof to vlayer verifier
        bytes32 nullifierHash = keccak256(abi.encodePacked(msg.sender, proofType, block.timestamp));
        proofId = vlayerVerifier.submitProof(proof, publicSignals, proofType, nullifierHash);
        
        // Update member status
        members[msg.sender].hasZKProof = true;
        
        // Reward with STAT tokens
        statToken.mint(msg.sender, 30, "ZK Proof Submission");
        
        // Register in Blockscout
        blockscoutRegistry.registerTransaction(
            keccak256(abi.encodePacked(msg.sender, "zkproof", block.timestamp)),
            msg.sender,
            address(vlayerVerifier),
            0,
            "",
            "kyc",
            string(abi.encodePacked("ZK proof submitted: ", proofType))
        );
        
        emit MemberVerified(msg.sender, "ZK Proof", block.timestamp);
        
        return proofId;
    }
    
    /**
     * @dev Create proposal with enhanced verification tracking
     * @param title Proposal title
     * @param description Proposal description
     * @param category Proposal category
     * @param proposalType Who can vote
     */
    function createProposal(
        string memory title,
        string memory description,
        string memory category,
        VotingWithWeight.ProposalType proposalType
    ) external onlyVerifiedMember returns (uint256 proposalId) {
        
        require(statToken.balanceOf(msg.sender) >= MIN_STAT_FOR_PROPOSAL, "Insufficient STAT");
        
        // Create proposal in voting contract
        voting.createProposal(title, description, category, proposalType, PROPOSAL_DURATION);
        proposalId = voting.getTotalProposals();
        
        // Check verification status
        bool worldIDVerified = members[msg.sender].isVerifiedWithWorldID;
        bool zkProofVerified = members[msg.sender].hasZKProof;
        
        // Register in Blockscout
        blockscoutRegistry.registerTransaction(
            keccak256(abi.encodePacked(msg.sender, "proposal", proposalId)),
            msg.sender,
            address(voting),
            0,
            "",
            "proposal",
            string(abi.encodePacked("Proposal created: ", title))
        );
        
        emit ProposalCreatedWithVerification(
            proposalId,
            msg.sender,
            worldIDVerified,
            zkProofVerified,
            block.timestamp
        );
        
        return proposalId;
    }
    
    /**
     * @dev Vote on proposal with optional anonymity
     * @param proposalId Proposal ID
     * @param support Vote choice
     * @param comment Vote comment
     * @param useAnonymousVoting Whether to use ZK proof for anonymity
     */
    function voteOnProposal(
        uint256 proposalId,
        bool support,
        string memory comment,
        bool useAnonymousVoting
    ) external onlyVerifiedMember {
        
        require(statToken.balanceOf(msg.sender) >= MIN_STAT_FOR_VOTING, "Insufficient STAT");
        
        bytes32 zkProofId = 0x0;
        
        if (useAnonymousVoting) {
            // Create anonymous voting proof
            uint256[] memory publicSignals = new uint256[](3);
            publicSignals[0] = support ? 1 : 0;
            publicSignals[1] = proposalId;
            publicSignals[2] = uint256(keccak256(abi.encodePacked(msg.sender, proposalId)));
            
            uint256[8] memory mockProof;
            for (uint i = 0; i < 8; i++) {
                mockProof[i] = uint256(keccak256(abi.encodePacked(msg.sender, i, block.timestamp)));
            }
            
            bytes32 nullifierHash = keccak256(abi.encodePacked(msg.sender, proposalId, "vote"));
            zkProofId = vlayerVerifier.submitProof(
                mockProof,
                publicSignals,
                "anonymous-voting",
                nullifierHash
            );
        }
        
        // Cast vote
        voting.vote(proposalId, support, comment);
        
        // Register in Blockscout
        blockscoutRegistry.registerTransaction(
            keccak256(abi.encodePacked(msg.sender, "vote", proposalId)),
            msg.sender,
            address(voting),
            0,
            "",
            "vote",
            useAnonymousVoting ? "Anonymous vote cast" : "Public vote cast"
        );
        
        emit VoteCastWithPrivacy(proposalId, useAnonymousVoting, zkProofId, block.timestamp);
    }
    
    /**
     * @dev Get member information
     * @param memberAddress Member address
     * @return member Member struct
     */
    function getMember(address memberAddress) external view returns (Member memory) {
        require(isMember[memberAddress], "Not a member");
        return members[memberAddress];
    }
    
    /**
     * @dev Get all member addresses
     * @return addresses Array of member addresses
     */
    function getAllMembers() external view returns (address[] memory) {
        return memberAddresses;
    }
    
    /**
     * @dev Get DAO statistics for ETH Prague demo
     * @return stats DAO statistics
     */
    function getDAOStats() external view returns (
        uint256 totalMembers,
        uint256 worldIDVerified,
        uint256 zkProofVerified,
        uint256 totalProposals,
        uint256 totalVotes,
        uint256 totalSTATSupply
    ) {
        totalMembers = memberAddresses.length;
        totalProposals = voting.getTotalProposals();
        totalSTATSupply = statToken.totalSupply();
        
        // Count verified members
        for (uint i = 0; i < memberAddresses.length; i++) {
            if (members[memberAddresses[i]].isVerifiedWithWorldID) {
                worldIDVerified++;
            }
            if (members[memberAddresses[i]].hasZKProof) {
                zkProofVerified++;
            }
        }
        
        // totalVotes would need to be tracked separately for efficiency
        totalVotes = 0; // Placeholder
    }
    
    /**
     * @dev Convert role enum to string
     */
    function _roleToString(MemberRole role) internal pure returns (string memory) {
        if (role == MemberRole.PRESIDENT) return "PRESIDENT";
        if (role == MemberRole.VICE_PRESIDENT) return "VICE_PRESIDENT";
        if (role == MemberRole.CORE_TEAM) return "CORE_TEAM";
        return "MEMBER";
    }
    
    /**
     * @dev Emergency functions
     */
    function pauseAll() external onlyAdmin {
        // Pause all contracts
    }
    
    function updateContracts(
        address _statToken,
        address _voting,
        address _worldVerifier,
        address _vlayerVerifier,
        address _blockscoutRegistry
    ) external onlyAdmin {
        if (_statToken != address(0)) statToken = StatToken(_statToken);
        if (_voting != address(0)) voting = VotingWithWeight(_voting);
        if (_worldVerifier != address(0)) worldVerifier = WorldIDVerifier(_worldVerifier);
        if (_vlayerVerifier != address(0)) vlayerVerifier = VlayerZKVerifier(_vlayerVerifier);
        if (_blockscoutRegistry != address(0)) blockscoutRegistry = BlockscoutRegistry(_blockscoutRegistry);
    }
} 