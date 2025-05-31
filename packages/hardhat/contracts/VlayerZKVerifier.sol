// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title VlayerZKVerifier
 * @dev Zero-Knowledge proof verification contract for ETH Prague 2025 ($10k Prize Pool)
 * Integrates with vlayer for privacy-preserving verification
 */
contract VlayerZKVerifier {
    
    struct ZKProof {
        uint256[8] proof;
        uint256[] publicSignals;
        string proofType; // "kyc-verification", "voting-eligibility", "anonymous-voting", "membership-verification"
        uint256 timestamp;
        bool isValid;
        address prover;
    }
    
    struct Circuit {
        string name;
        string description;
        bool isActive;
        uint256 maxPublicSignals;
    }
    
    mapping(bytes32 => ZKProof) public proofs;
    mapping(string => Circuit) public circuits;
    mapping(address => bytes32[]) public userProofs;
    mapping(bytes32 => bool) public nullifierHashes;
    
    address public admin;
    address public vlayerVerifier; // vlayer verifier contract address
    uint256 public proofCounter;
    
    // Events
    event ProofSubmitted(
        bytes32 indexed proofId,
        address indexed prover,
        string proofType,
        uint256 timestamp
    );
    
    event ProofVerified(
        bytes32 indexed proofId,
        bool isValid,
        uint256 timestamp
    );
    
    event CircuitAdded(string name, string description);
    event CircuitUpdated(string name, bool isActive);
    
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this function");
        _;
    }
    
    modifier validCircuit(string memory proofType) {
        require(circuits[proofType].isActive, "Circuit not active");
        _;
    }
    
    constructor(address _vlayerVerifier) {
        admin = msg.sender;
        vlayerVerifier = _vlayerVerifier;
        proofCounter = 0;
        
        // Initialize default circuits for ETH Prague demo
        _addCircuit("kyc-verification", "KYC verification with World ID integration", true, 4);
        _addCircuit("voting-eligibility", "Verify voting eligibility without revealing identity", true, 5);
        _addCircuit("anonymous-voting", "Anonymous voting with nullifier", true, 6);
        _addCircuit("membership-verification", "Prove DAO membership without revealing details", true, 4);
    }
    
    /**
     * @dev Submit a zero-knowledge proof for verification
     * @param proof ZK proof array
     * @param publicSignals Public signals array
     * @param proofType Type of proof being submitted
     * @param nullifierHash Optional nullifier hash for anonymous proofs
     */
    function submitProof(
        uint256[8] memory proof,
        uint256[] memory publicSignals,
        string memory proofType,
        bytes32 nullifierHash
    ) external validCircuit(proofType) returns (bytes32 proofId) {
        
        require(publicSignals.length <= circuits[proofType].maxPublicSignals, "Too many public signals");
        
        // Check nullifier uniqueness for anonymous proofs
        if (keccak256(bytes(proofType)) == keccak256(bytes("anonymous-voting"))) {
            require(!nullifierHashes[nullifierHash], "Nullifier already used");
            nullifierHashes[nullifierHash] = true;
        }
        
        proofCounter++;
        proofId = keccak256(abi.encodePacked(msg.sender, proofCounter, block.timestamp));
        
        // Store proof
        proofs[proofId] = ZKProof({
            proof: proof,
            publicSignals: publicSignals,
            proofType: proofType,
            timestamp: block.timestamp,
            isValid: false, // Will be verified next
            prover: msg.sender
        });
        
        userProofs[msg.sender].push(proofId);
        
        emit ProofSubmitted(proofId, msg.sender, proofType, block.timestamp);
        
        // Verify proof immediately
        _verifyProof(proofId);
        
        return proofId;
    }
    
    /**
     * @dev Internal proof verification
     * @param proofId ID of the proof to verify
     */
    function _verifyProof(bytes32 proofId) internal {
        ZKProof storage zkProof = proofs[proofId];
        
        // Mock verification for demo - in production, integrate with vlayer verifier
        bool isValid = _mockVerifyWithVlayer(zkProof.proof, zkProof.publicSignals, zkProof.proofType);
        
        zkProof.isValid = isValid;
        
        emit ProofVerified(proofId, isValid, block.timestamp);
    }
    
    /**
     * @dev Mock vlayer verification (replace with actual vlayer integration)
     * @param proof ZK proof array
     * @param publicSignals Public signals
     * @param proofType Type of proof
     * @return bool Whether proof is valid
     */
    function _mockVerifyWithVlayer(
        uint256[8] memory proof,
        uint256[] memory publicSignals,
        string memory proofType
    ) internal pure returns (bool) {
        // Mock verification logic for demo
        // In production, this would call vlayer verifier contract
        
        if (proof[0] == 0 || publicSignals.length == 0) {
            return false;
        }
        
        // Different validation rules for different proof types
        if (keccak256(bytes(proofType)) == keccak256(bytes("kyc-verification"))) {
            return publicSignals.length >= 3; // address, level, timestamp
        } else if (keccak256(bytes(proofType)) == keccak256(bytes("voting-eligibility"))) {
            return publicSignals.length >= 4; // address, role, joinDate, proposalId
        } else if (keccak256(bytes(proofType)) == keccak256(bytes("anonymous-voting"))) {
            return publicSignals.length >= 3; // vote, proposalId, nullifier
        } else if (keccak256(bytes(proofType)) == keccak256(bytes("membership-verification"))) {
            return publicSignals.length >= 3; // commitment, role, timestamp
        }
        
        return true; // Default to valid for demo
    }
    
    /**
     * @dev Verify a submitted proof (external call)
     * @param proofId ID of the proof to verify
     * @return bool Whether proof is valid
     */
    function verifyProof(bytes32 proofId) external view returns (bool) {
        require(proofs[proofId].timestamp > 0, "Proof does not exist");
        return proofs[proofId].isValid;
    }
    
    /**
     * @dev Get proof details
     * @param proofId ID of the proof
     * @return proof ZKProof struct
     */
    function getProof(bytes32 proofId) external view returns (ZKProof memory) {
        require(proofs[proofId].timestamp > 0, "Proof does not exist");
        return proofs[proofId];
    }
    
    /**
     * @dev Get user's proof history
     * @param user Address of the user
     * @return proofIds Array of proof IDs
     */
    function getUserProofs(address user) external view returns (bytes32[] memory) {
        return userProofs[user];
    }
    
    /**
     * @dev Add a new circuit (admin only)
     * @param name Circuit name
     * @param description Circuit description
     * @param maxPublicSignals Maximum number of public signals
     */
    function addCircuit(
        string memory name,
        string memory description,
        uint256 maxPublicSignals
    ) external onlyAdmin {
        _addCircuit(name, description, true, maxPublicSignals);
    }
    
    /**
     * @dev Internal function to add circuit
     */
    function _addCircuit(
        string memory name,
        string memory description,
        bool isActive,
        uint256 maxPublicSignals
    ) internal {
        circuits[name] = Circuit({
            name: name,
            description: description,
            isActive: isActive,
            maxPublicSignals: maxPublicSignals
        });
        
        emit CircuitAdded(name, description);
    }
    
    /**
     * @dev Update circuit status (admin only)
     * @param name Circuit name
     * @param isActive Whether circuit is active
     */
    function updateCircuit(string memory name, bool isActive) external onlyAdmin {
        require(bytes(circuits[name].name).length > 0, "Circuit does not exist");
        circuits[name].isActive = isActive;
        
        emit CircuitUpdated(name, isActive);
    }
    
    /**
     * @dev Get circuit details
     * @param name Circuit name
     * @return circuit Circuit struct
     */
    function getCircuit(string memory name) external view returns (Circuit memory) {
        return circuits[name];
    }
    
    /**
     * @dev Update vlayer verifier address (admin only)
     * @param _vlayerVerifier New verifier address
     */
    function updateVlayerVerifier(address _vlayerVerifier) external onlyAdmin {
        vlayerVerifier = _vlayerVerifier;
    }
    
    /**
     * @dev Get total number of proofs
     * @return uint256 Total proof count
     */
    function getTotalProofs() external view returns (uint256) {
        return proofCounter;
    }
    
    /**
     * @dev Check if nullifier has been used (for anonymous voting)
     * @param nullifierHash Nullifier hash to check
     * @return bool Whether nullifier has been used
     */
    function isNullifierUsed(bytes32 nullifierHash) external view returns (bool) {
        return nullifierHashes[nullifierHash];
    }
    
    /**
     * @dev Emergency functions
     */
    function pause() external onlyAdmin {
        // Implementation for pausing contract
    }
    
    function unpause() external onlyAdmin {
        // Implementation for unpausing contract
    }
} 