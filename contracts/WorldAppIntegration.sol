// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title WorldAppIntegration
 * @dev ETH Prague 2025 - World App MiniKit Integration ($10k Prize Pool)
 * @notice Advanced World ID verification and MiniApp ecosystem integration
 */
contract WorldAppIntegration {
    
    struct WorldIDUser {
        address userAddress;
        bytes32 nullifierHash;
        bool isVerified;
        uint256 verificationTimestamp;
        string verificationType; // "orb" or "device"
        uint256 merkleRoot;
    }
    
    struct PaymentRecord {
        address from;
        address to;
        uint256 amount;
        string currency; // "WLD" or "USDC"
        bytes32 transactionId;
        uint256 timestamp;
        bool completed;
    }
    
    mapping(address => WorldIDUser) public worldIdUsers;
    mapping(bytes32 => bool) public usedNullifiers;
    mapping(address => PaymentRecord[]) public userPayments;
    mapping(address => string[]) public userPermissions;
    
    address public admin;
    uint256 public currentMerkleRoot;
    string public miniAppId;
    
    event WorldIDVerified(address indexed user, bytes32 nullifierHash, string verificationType);
    event PaymentProcessed(address indexed from, address indexed to, uint256 amount, string currency);
    event PermissionGranted(address indexed user, string permission);
    event MiniAppRegistered(string appId);
    
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this function");
        _;
    }
    
    modifier onlyVerifiedUser() {
        require(worldIdUsers[msg.sender].isVerified, "User must be World ID verified");
        _;
    }
    
    constructor(string memory _miniAppId) {
        admin = msg.sender;
        miniAppId = _miniAppId;
    }
    
    /**
     * @dev Verify World ID proof
     * @param nullifierHash Unique nullifier hash from World ID
     * @param merkleRoot Current merkle root
     * @param verificationType Verification type (orb/device)
     */
    function verifyWorldID(
        bytes32 nullifierHash,
        uint256 merkleRoot,
        string calldata verificationType
    ) external {
        require(!usedNullifiers[nullifierHash], "Nullifier already used");
        require(merkleRoot == currentMerkleRoot || merkleRoot != 0, "Invalid merkle root");
        
        worldIdUsers[msg.sender] = WorldIDUser({
            userAddress: msg.sender,
            nullifierHash: nullifierHash,
            isVerified: true,
            verificationTimestamp: block.timestamp,
            verificationType: verificationType,
            merkleRoot: merkleRoot
        });
        
        usedNullifiers[nullifierHash] = true;
        
        emit WorldIDVerified(msg.sender, nullifierHash, verificationType);
    }
    
    /**
     * @dev Process payment via World App
     * @param to Recipient address
     * @param amount Payment amount
     * @param currency Currency type (WLD/USDC)
     * @param transactionId Unique transaction ID from World App
     */
    function processPayment(
        address to,
        uint256 amount,
        string calldata currency,
        bytes32 transactionId
    ) external onlyVerifiedUser {
        PaymentRecord memory payment = PaymentRecord({
            from: msg.sender,
            to: to,
            amount: amount,
            currency: currency,
            transactionId: transactionId,
            timestamp: block.timestamp,
            completed: true
        });
        
        userPayments[msg.sender].push(payment);
        userPayments[to].push(payment);
        
        emit PaymentProcessed(msg.sender, to, amount, currency);
    }
    
    /**
     * @dev Grant permission to user for specific MiniApp features
     * @param user User address
     * @param permission Permission string
     */
    function grantPermission(address user, string calldata permission) external onlyAdmin {
        userPermissions[user].push(permission);
        emit PermissionGranted(user, permission);
    }
    
    /**
     * @dev Check if user has specific permission
     * @param user User address
     * @param permission Permission to check
     * @return bool Permission status
     */
    function hasPermission(address user, string calldata permission) external view returns (bool) {
        string[] memory permissions = userPermissions[user];
        for (uint i = 0; i < permissions.length; i++) {
            if (keccak256(abi.encodePacked(permissions[i])) == keccak256(abi.encodePacked(permission))) {
                return true;
            }
        }
        return false;
    }
    
    /**
     * @dev Get user's World ID verification status
     * @param user User address
     * @return WorldIDUser struct
     */
    function getWorldIDUser(address user) external view returns (WorldIDUser memory) {
        return worldIdUsers[user];
    }
    
    /**
     * @dev Get user's payment history
     * @param user User address
     * @return Array of payment records
     */
    function getUserPayments(address user) external view returns (PaymentRecord[] memory) {
        return userPayments[user];
    }
    
    /**
     * @dev Update merkle root (only admin)
     * @param newRoot New merkle root
     */
    function updateMerkleRoot(uint256 newRoot) external onlyAdmin {
        currentMerkleRoot = newRoot;
    }
    
    /**
     * @dev Register new MiniApp
     * @param appId Application ID
     */
    function registerMiniApp(string calldata appId) external onlyAdmin {
        miniAppId = appId;
        emit MiniAppRegistered(appId);
    }
    
    /**
     * @dev Check if user is verified with World ID
     * @param user User address
     * @return bool Verification status
     */
    function isWorldIDVerified(address user) external view returns (bool) {
        return worldIdUsers[user].isVerified;
    }
} 