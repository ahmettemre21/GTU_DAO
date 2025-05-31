// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title BlockscoutRegistry
 * @dev Blockchain transparency contract for ETH Prague 2025 ($20k Prize Pool)
 * Integrates with Blockscout for enhanced transaction tracking and transparency
 */
contract BlockscoutRegistry {
    
    struct TransactionRecord {
        bytes32 txHash;
        address from;
        address to;
        uint256 value;
        bytes data;
        uint256 blockNumber;
        uint256 timestamp;
        string category; // "proposal", "vote", "kyc", "token-transfer"
        string description;
        bool isVerified;
    }
    
    struct ContractMetadata {
        string name;
        string description;
        string version;
        address contractAddress;
        uint256 deployBlock;
        string sourceCodeUrl;
        bool isVerified;
        string[] tags;
    }
    
    struct UserActivity {
        uint256 totalTransactions;
        uint256 totalProposals;
        uint256 totalVotes;
        uint256 lastActivityBlock;
        uint256 reputationScore;
        bool isActive;
    }
    
    mapping(bytes32 => TransactionRecord) public transactionRecords;
    mapping(address => ContractMetadata) public contractRegistry;
    mapping(address => UserActivity) public userActivities;
    mapping(string => bytes32[]) public transactionsByCategory;
    mapping(address => bytes32[]) public userTransactions;
    
    address public admin;
    address public blockscoutOperator;
    uint256 public totalRecords;
    
    // Events for Blockscout indexing
    event TransactionRegistered(
        bytes32 indexed txHash,
        address indexed from,
        address indexed to,
        string category,
        uint256 timestamp
    );
    
    event ContractRegistered(
        address indexed contractAddress,
        string name,
        string version,
        uint256 deployBlock
    );
    
    event UserActivityUpdated(
        address indexed user,
        uint256 totalTransactions,
        uint256 reputationScore
    );
    
    event MetadataUpdated(bytes32 indexed txHash, string description);
    
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this function");
        _;
    }
    
    modifier onlyAuthorized() {
        require(
            msg.sender == admin || msg.sender == blockscoutOperator,
            "Only authorized addresses can call this function"
        );
        _;
    }
    
    constructor(address _blockscoutOperator) {
        admin = msg.sender;
        blockscoutOperator = _blockscoutOperator;
        totalRecords = 0;
        
        // Register this contract itself
        _registerContract(
            address(this),
            "BlockscoutRegistry",
            "Transparency registry for GTU DAO",
            "1.0.0",
            new string[](0)
        );
    }
    
    /**
     * @dev Register a transaction for enhanced tracking
     * @param txHash Transaction hash
     * @param from Sender address
     * @param to Recipient address
     * @param value Transaction value
     * @param data Transaction data
     * @param category Transaction category
     * @param description Human-readable description
     */
    function registerTransaction(
        bytes32 txHash,
        address from,
        address to,
        uint256 value,
        bytes memory data,
        string memory category,
        string memory description
    ) external onlyAuthorized {
        
        require(transactionRecords[txHash].timestamp == 0, "Transaction already registered");
        
        transactionRecords[txHash] = TransactionRecord({
            txHash: txHash,
            from: from,
            to: to,
            value: value,
            data: data,
            blockNumber: block.number,
            timestamp: block.timestamp,
            category: category,
            description: description,
            isVerified: true
        });
        
        // Update user activity
        _updateUserActivity(from, category);
        if (from != to) {
            _updateUserActivity(to, category);
        }
        
        // Add to category mapping
        transactionsByCategory[category].push(txHash);
        
        // Add to user transaction history
        userTransactions[from].push(txHash);
        if (from != to) {
            userTransactions[to].push(txHash);
        }
        
        totalRecords++;
        
        emit TransactionRegistered(txHash, from, to, category, block.timestamp);
    }
    
    /**
     * @dev Register a smart contract for tracking
     * @param contractAddress Address of the contract
     * @param name Contract name
     * @param description Contract description
     * @param version Contract version
     * @param tags Array of tags for categorization
     */
    function registerContract(
        address contractAddress,
        string memory name,
        string memory description,
        string memory version,
        string[] memory tags
    ) external onlyAdmin {
        _registerContract(contractAddress, name, description, version, tags);
    }
    
    /**
     * @dev Internal function to register contract
     */
    function _registerContract(
        address contractAddress,
        string memory name,
        string memory description,
        string memory version,
        string[] memory tags
    ) internal {
        require(contractRegistry[contractAddress].deployBlock == 0, "Contract already registered");
        
        contractRegistry[contractAddress] = ContractMetadata({
            name: name,
            description: description,
            version: version,
            contractAddress: contractAddress,
            deployBlock: block.number,
            sourceCodeUrl: "",
            isVerified: false,
            tags: tags
        });
        
        emit ContractRegistered(contractAddress, name, version, block.number);
    }
    
    /**
     * @dev Update user activity metrics
     * @param user User address
     * @param category Activity category
     */
    function _updateUserActivity(address user, string memory category) internal {
        UserActivity storage activity = userActivities[user];
        
        activity.totalTransactions++;
        activity.lastActivityBlock = block.number;
        activity.isActive = true;
        
        // Update specific counters based on category
        if (keccak256(bytes(category)) == keccak256(bytes("proposal"))) {
            activity.totalProposals++;
            activity.reputationScore += 10;
        } else if (keccak256(bytes(category)) == keccak256(bytes("vote"))) {
            activity.totalVotes++;
            activity.reputationScore += 5;
        } else if (keccak256(bytes(category)) == keccak256(bytes("kyc"))) {
            activity.reputationScore += 20;
        }
        
        emit UserActivityUpdated(user, activity.totalTransactions, activity.reputationScore);
    }
    
    /**
     * @dev Get transaction details
     * @param txHash Transaction hash
     * @return record TransactionRecord struct
     */
    function getTransaction(bytes32 txHash) external view returns (TransactionRecord memory) {
        require(transactionRecords[txHash].timestamp > 0, "Transaction not found");
        return transactionRecords[txHash];
    }
    
    /**
     * @dev Get transactions by category
     * @param category Transaction category
     * @return txHashes Array of transaction hashes
     */
    function getTransactionsByCategory(string memory category) external view returns (bytes32[] memory) {
        return transactionsByCategory[category];
    }
    
    /**
     * @dev Get user transaction history
     * @param user User address
     * @return txHashes Array of transaction hashes
     */
    function getUserTransactions(address user) external view returns (bytes32[] memory) {
        return userTransactions[user];
    }
    
    /**
     * @dev Get user activity summary
     * @param user User address
     * @return activity UserActivity struct
     */
    function getUserActivity(address user) external view returns (UserActivity memory) {
        return userActivities[user];
    }
    
    /**
     * @dev Get contract metadata
     * @param contractAddress Contract address
     * @return metadata ContractMetadata struct
     */
    function getContractMetadata(address contractAddress) external view returns (ContractMetadata memory) {
        return contractRegistry[contractAddress];
    }
    
    /**
     * @dev Update transaction metadata
     * @param txHash Transaction hash
     * @param description New description
     */
    function updateTransactionMetadata(
        bytes32 txHash,
        string memory description
    ) external onlyAuthorized {
        require(transactionRecords[txHash].timestamp > 0, "Transaction not found");
        
        transactionRecords[txHash].description = description;
        emit MetadataUpdated(txHash, description);
    }
    
    /**
     * @dev Verify contract source code
     * @param contractAddress Contract address
     * @param sourceCodeUrl URL to source code
     */
    function verifyContract(
        address contractAddress,
        string memory sourceCodeUrl
    ) external onlyAdmin {
        require(contractRegistry[contractAddress].deployBlock > 0, "Contract not registered");
        
        contractRegistry[contractAddress].sourceCodeUrl = sourceCodeUrl;
        contractRegistry[contractAddress].isVerified = true;
    }
    
    /**
     * @dev Get analytics data for Blockscout integration
     * @return totalTxs Total number of tracked transactions
     * @return totalContracts Total number of registered contracts
     * @return activeUsers Number of active users
     */
    function getAnalytics() external view returns (
        uint256 totalTxs,
        uint256 totalContracts,
        uint256 activeUsers
    ) {
        // Implementation would count actual data
        return (totalRecords, 0, 0); // Placeholder
    }
    
    /**
     * @dev Generate Blockscout-compatible metadata
     * @param txHash Transaction hash
     * @return metadata JSON-like string for Blockscout
     */
    function generateBlockscoutMetadata(bytes32 txHash) external view returns (string memory) {
        TransactionRecord memory record = transactionRecords[txHash];
        require(record.timestamp > 0, "Transaction not found");
        
        // Return structured metadata for Blockscout indexing
        return string(abi.encodePacked(
            '{"category":"', record.category, 
            '","description":"', record.description,
            '","timestamp":', _toString(record.timestamp),
            ',"verified":', record.isVerified ? "true" : "false",
            '}'
        ));
    }
    
    /**
     * @dev Update Blockscout operator
     * @param newOperator New operator address
     */
    function updateBlockscoutOperator(address newOperator) external onlyAdmin {
        blockscoutOperator = newOperator;
    }
    
    /**
     * @dev Utility function to convert uint to string
     */
    function _toString(uint256 value) internal pure returns (string memory) {
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
     * @dev Emergency pause functions
     */
    function pause() external onlyAdmin {
        // Implementation for emergency pause
    }
    
    function unpause() external onlyAdmin {
        // Implementation for emergency unpause
    }
} 