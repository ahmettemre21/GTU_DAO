// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title WorldIDVerifier
 * @dev World ID verification contract for ETH Prague 2025 ($10k Prize Pool)
 * Integrates with World App MiniKit for KYC and identity verification
 */
contract WorldIDVerifier {
    
    // Mock World ID verification interface (for demo purposes)
    // In production, this would integrate with actual World ID contracts
    
    struct VerificationProof {
        uint256 merkleRoot;
        uint256 nullifierHash;
        uint256[8] proof;
        string verificationLevel; // "ORB" or "DEVICE"
        uint256 timestamp;
        bool isValid;
    }
    
    mapping(address => VerificationProof) public verifications;
    mapping(uint256 => bool) public usedNullifiers;
    mapping(address => bool) public verifiedUsers;
    
    address public admin;
    string public appId;
    string public actionId;
    
    event UserVerified(
        address indexed user,
        uint256 nullifierHash,
        string verificationLevel,
        uint256 timestamp
    );
    
    event VerificationRevoked(address indexed user, string reason);
    
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this function");
        _;
    }
    
    modifier onlyVerified() {
        require(verifiedUsers[msg.sender], "User not verified with World ID");
        _;
    }
    
    constructor(string memory _appId, string memory _actionId) {
        admin = msg.sender;
        appId = _appId;
        actionId = _actionId;
    }
    
    /**
     * @dev Verify user with World ID proof
     * @param merkleRoot Merkle root from World ID
     * @param nullifierHash Unique nullifier hash
     * @param proof ZK proof array
     * @param verificationLevel "ORB" or "DEVICE"
     */
    function verifyWithWorldID(
        uint256 merkleRoot,
        uint256 nullifierHash,
        uint256[8] memory proof,
        string memory verificationLevel
    ) external {
        require(!usedNullifiers[nullifierHash], "Nullifier already used");
        require(!verifiedUsers[msg.sender], "User already verified");
        require(
            keccak256(bytes(verificationLevel)) == keccak256(bytes("ORB")) ||
            keccak256(bytes(verificationLevel)) == keccak256(bytes("DEVICE")),
            "Invalid verification level"
        );
        
        // In production, this would verify the actual ZK proof
        // For demo purposes, we accept the proof as valid
        bool isValidProof = _verifyProof(merkleRoot, nullifierHash, proof);
        require(isValidProof, "Invalid World ID proof");
        
        // Store verification
        verifications[msg.sender] = VerificationProof({
            merkleRoot: merkleRoot,
            nullifierHash: nullifierHash,
            proof: proof,
            verificationLevel: verificationLevel,
            timestamp: block.timestamp,
            isValid: true
        });
        
        usedNullifiers[nullifierHash] = true;
        verifiedUsers[msg.sender] = true;
        
        emit UserVerified(msg.sender, nullifierHash, verificationLevel, block.timestamp);
    }
    
    /**
     * @dev Mock proof verification (replace with actual World ID verification in production)
     * @param merkleRoot Merkle root to verify
     * @param nullifierHash Nullifier hash
     * @param proof ZK proof
     * @return bool Whether proof is valid
     */
    function _verifyProof(
        uint256 merkleRoot,
        uint256 nullifierHash,
        uint256[8] memory proof
    ) internal pure returns (bool) {
        // Mock verification - always returns true for demo
        // In production, integrate with World ID Semaphore verification
        return merkleRoot > 0 && nullifierHash > 0 && proof[0] > 0;
    }
    
    /**
     * @dev Check if user is verified
     * @param user Address to check
     * @return bool Whether user is verified
     */
    function isVerified(address user) external view returns (bool) {
        return verifiedUsers[user];
    }
    
    /**
     * @dev Get user's verification details
     * @param user Address to get verification for
     * @return verification VerificationProof struct
     */
    function getVerification(address user) external view returns (VerificationProof memory) {
        require(verifiedUsers[user], "User not verified");
        return verifications[user];
    }
    
    /**
     * @dev Revoke user verification (admin only)
     * @param user Address to revoke
     * @param reason Reason for revocation
     */
    function revokeVerification(address user, string memory reason) external onlyAdmin {
        require(verifiedUsers[user], "User not verified");
        
        verifications[user].isValid = false;
        verifiedUsers[user] = false;
        
        emit VerificationRevoked(user, reason);
    }
    
    /**
     * @dev Update app configuration
     * @param _appId New app ID
     * @param _actionId New action ID
     */
    function updateConfig(string memory _appId, string memory _actionId) external onlyAdmin {
        appId = _appId;
        actionId = _actionId;
    }
    
    /**
     * @dev Get total verified users count
     * @return uint256 Number of verified users
     */
    function getVerifiedUsersCount() external view returns (uint256) {
        // This would need a counter in production for efficiency
        return 0; // Placeholder
    }
    
    /**
     * @dev Emergency pause function
     */
    function emergencyPause() external onlyAdmin {
        // Implementation for emergency pause
    }
} 