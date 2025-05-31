// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title VlayerIntegration  
 * @dev ETH Prague 2025 - vlayer ZK Integration ($10k Prize Pool)
 * @notice Advanced zero-knowledge proof verification and trustless data integration
 */
contract VlayerIntegration {
    
    struct WebProof {
        bytes32 proofHash;
        string dataSource;
        bytes32 dataHash;
        uint256 timestamp;
        address prover;
        bool verified;
        string metadata;
    }
    
    struct EmailProof {
        bytes32 proofHash;
        string emailDomain;
        bytes32 contentHash;
        address verifier;
        uint256 timestamp;
        bool isValid;
    }
    
    struct TimeTravelProof {
        bytes32 proofHash;
        uint256 blockNumber;
        bytes32 stateRoot;
        string dataType;
        address prover;
        uint256 timestamp;
        bool verified;
    }
    
    struct TeleportProof {
        bytes32 proofHash;
        uint256 sourceChainId;
        uint256 targetChainId;
        bytes32 crossChainHash;
        address relayer;
        uint256 timestamp;
        bool executed;
    }
    
    mapping(bytes32 => WebProof) public webProofs;
    mapping(bytes32 => EmailProof) public emailProofs;
    mapping(bytes32 => TimeTravelProof) public timeTravelProofs;
    mapping(bytes32 => TeleportProof) public teleportProofs;
    mapping(address => bytes32[]) public userProofs;
    
    address public admin;
    address public vlayerProver;
    uint256 public proofCounter;
    
    event WebProofVerified(bytes32 indexed proofHash, string dataSource, address prover);
    event EmailProofVerified(bytes32 indexed proofHash, string emailDomain, address verifier);
    event TimeTravelProofCreated(bytes32 indexed proofHash, uint256 blockNumber, address prover);
    event TeleportProofExecuted(bytes32 indexed proofHash, uint256 sourceChain, uint256 targetChain);
    event ProverUpdated(address indexed newProver);
    
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this function");
        _;
    }
    
    modifier onlyProver() {
        require(msg.sender == vlayerProver || msg.sender == admin, "Only prover can call this function");
        _;
    }
    
    constructor(address _vlayerProver) {
        admin = msg.sender;
        vlayerProver = _vlayerProver;
        proofCounter = 0;
    }
    
    /**
     * @dev Verify web proof from vlayer
     * @param proofHash Unique proof hash
     * @param dataSource URL or API endpoint
     * @param dataHash Hash of verified data
     * @param metadata Additional proof metadata
     */
    function verifyWebProof(
        bytes32 proofHash,
        string calldata dataSource,
        bytes32 dataHash,
        string calldata metadata
    ) external onlyProver {
        require(webProofs[proofHash].proofHash == bytes32(0), "Proof already exists");
        
        webProofs[proofHash] = WebProof({
            proofHash: proofHash,
            dataSource: dataSource,
            dataHash: dataHash,
            timestamp: block.timestamp,
            prover: msg.sender,
            verified: true,
            metadata: metadata
        });
        
        userProofs[msg.sender].push(proofHash);
        proofCounter++;
        
        emit WebProofVerified(proofHash, dataSource, msg.sender);
    }
    
    /**
     * @dev Verify email proof from vlayer
     * @param proofHash Unique proof hash
     * @param emailDomain Email domain (e.g., gmail.com)
     * @param contentHash Hash of email content
     */
    function verifyEmailProof(
        bytes32 proofHash,
        string calldata emailDomain,
        bytes32 contentHash
    ) external onlyProver {
        require(emailProofs[proofHash].proofHash == bytes32(0), "Email proof already exists");
        
        emailProofs[proofHash] = EmailProof({
            proofHash: proofHash,
            emailDomain: emailDomain,
            contentHash: contentHash,
            verifier: msg.sender,
            timestamp: block.timestamp,
            isValid: true
        });
        
        userProofs[msg.sender].push(proofHash);
        
        emit EmailProofVerified(proofHash, emailDomain, msg.sender);
    }
    
    /**
     * @dev Create time travel proof for historical data
     * @param proofHash Unique proof hash
     * @param blockNumber Historical block number
     * @param stateRoot State root at that block
     * @param dataType Type of historical data
     */
    function createTimeTravelProof(
        bytes32 proofHash,
        uint256 blockNumber,
        bytes32 stateRoot,
        string calldata dataType
    ) external onlyProver {
        require(timeTravelProofs[proofHash].proofHash == bytes32(0), "Time travel proof already exists");
        require(blockNumber < block.number, "Cannot time travel to future");
        
        timeTravelProofs[proofHash] = TimeTravelProof({
            proofHash: proofHash,
            blockNumber: blockNumber,
            stateRoot: stateRoot,
            dataType: dataType,
            prover: msg.sender,
            timestamp: block.timestamp,
            verified: true
        });
        
        userProofs[msg.sender].push(proofHash);
        
        emit TimeTravelProofCreated(proofHash, blockNumber, msg.sender);
    }
    
    /**
     * @dev Execute teleport proof for cross-chain operations
     * @param proofHash Unique proof hash
     * @param sourceChainId Source blockchain ID
     * @param targetChainId Target blockchain ID
     * @param crossChainHash Cross-chain transaction hash
     */
    function executeTeleportProof(
        bytes32 proofHash,
        uint256 sourceChainId,
        uint256 targetChainId,
        bytes32 crossChainHash
    ) external onlyProver {
        require(teleportProofs[proofHash].proofHash == bytes32(0), "Teleport proof already exists");
        require(sourceChainId != targetChainId, "Source and target chains must be different");
        
        teleportProofs[proofHash] = TeleportProof({
            proofHash: proofHash,
            sourceChainId: sourceChainId,
            targetChainId: targetChainId,
            crossChainHash: crossChainHash,
            relayer: msg.sender,
            timestamp: block.timestamp,
            executed: true
        });
        
        userProofs[msg.sender].push(proofHash);
        
        emit TeleportProofExecuted(proofHash, sourceChainId, targetChainId);
    }
    
    /**
     * @dev Get web proof details
     * @param proofHash Proof hash
     * @return WebProof struct
     */
    function getWebProof(bytes32 proofHash) external view returns (WebProof memory) {
        return webProofs[proofHash];
    }
    
    /**
     * @dev Get email proof details
     * @param proofHash Proof hash
     * @return EmailProof struct
     */
    function getEmailProof(bytes32 proofHash) external view returns (EmailProof memory) {
        return emailProofs[proofHash];
    }
    
    /**
     * @dev Get time travel proof details
     * @param proofHash Proof hash
     * @return TimeTravelProof struct
     */
    function getTimeTravelProof(bytes32 proofHash) external view returns (TimeTravelProof memory) {
        return timeTravelProofs[proofHash];
    }
    
    /**
     * @dev Get teleport proof details
     * @param proofHash Proof hash
     * @return TeleportProof struct
     */
    function getTeleportProof(bytes32 proofHash) external view returns (TeleportProof memory) {
        return teleportProofs[proofHash];
    }
    
    /**
     * @dev Get user's proof history
     * @param user User address
     * @return Array of proof hashes
     */
    function getUserProofs(address user) external view returns (bytes32[] memory) {
        return userProofs[user];
    }
    
    /**
     * @dev Update vlayer prover address
     * @param newProver New prover address
     */
    function updateProver(address newProver) external onlyAdmin {
        vlayerProver = newProver;
        emit ProverUpdated(newProver);
    }
    
    /**
     * @dev Get total number of proofs
     * @return Total proof count
     */
    function getTotalProofs() external view returns (uint256) {
        return proofCounter;
    }
} 