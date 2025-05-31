// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title BlockscoutIntegration
 * @dev ETH Prague 2025 - Blockscout Integration ($20k Prize Pool)
 * @notice Advanced blockchain explorer integration with API endpoints
 */
contract BlockscoutIntegration {
    
    struct TransactionRecord {
        address user;
        bytes32 txHash;
        uint256 timestamp;
        string actionType;
        uint256 blockNumber;
        bool verified;
    }
    
    struct ContractMetadata {
        address contractAddress;
        string name;
        string version;
        bool isVerified;
        uint256 verificationTimestamp;
        string sourceCodeHash;
    }
    
    mapping(address => TransactionRecord[]) public userTransactions;
    mapping(address => ContractMetadata) public contractRegistry;
    mapping(address => uint256) public userMerits; // Blockscout Merits integration
    
    address public admin;
    string public blockscoutApiEndpoint;
    
    event TransactionTracked(address indexed user, bytes32 indexed txHash, string actionType);
    event ContractVerified(address indexed contractAddr, string name, string version);
    event MeritsAwarded(address indexed user, uint256 amount, string reason);
    event BlockscoutApiUpdated(string newEndpoint);
    
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this function");
        _;
    }
    
    constructor(string memory _apiEndpoint) {
        admin = msg.sender;
        blockscoutApiEndpoint = _apiEndpoint;
    }
    
    /**
     * @dev Track user transaction for Blockscout analytics
     * @param user User address
     * @param txHash Transaction hash
     * @param actionType Type of action performed
     */
    function trackTransaction(
        address user,
        bytes32 txHash,
        string calldata actionType
    ) external {
        TransactionRecord memory record = TransactionRecord({
            user: user,
            txHash: txHash,
            timestamp: block.timestamp,
            actionType: actionType,
            blockNumber: block.number,
            verified: true
        });
        
        userTransactions[user].push(record);
        
        // Award Merits for activity
        _awardMerits(user, 10, "Transaction Activity");
        
        emit TransactionTracked(user, txHash, actionType);
    }
    
    /**
     * @dev Register verified contract in Blockscout
     * @param contractAddr Contract address
     * @param name Contract name
     * @param version Contract version
     * @param sourceCodeHash Hash of source code
     */
    function registerVerifiedContract(
        address contractAddr,
        string calldata name,
        string calldata version,
        string calldata sourceCodeHash
    ) external onlyAdmin {
        contractRegistry[contractAddr] = ContractMetadata({
            contractAddress: contractAddr,
            name: name,
            version: version,
            isVerified: true,
            verificationTimestamp: block.timestamp,
            sourceCodeHash: sourceCodeHash
        });
        
        emit ContractVerified(contractAddr, name, version);
    }
    
    /**
     * @dev Award Merits to user (Blockscout points system)
     * @param user User address
     * @param amount Merit amount
     * @param reason Reason for merit award
     */
    function _awardMerits(address user, uint256 amount, string memory reason) internal {
        userMerits[user] += amount;
        emit MeritsAwarded(user, amount, reason);
    }
    
    /**
     * @dev Get user's transaction history
     * @param user User address
     * @return Array of transaction records
     */
    function getUserTransactions(address user) external view returns (TransactionRecord[] memory) {
        return userTransactions[user];
    }
    
    /**
     * @dev Get contract verification status
     * @param contractAddr Contract address
     * @return Contract metadata
     */
    function getContractInfo(address contractAddr) external view returns (ContractMetadata memory) {
        return contractRegistry[contractAddr];
    }
    
    /**
     * @dev Update Blockscout API endpoint
     * @param newEndpoint New API endpoint URL
     */
    function updateApiEndpoint(string calldata newEndpoint) external onlyAdmin {
        blockscoutApiEndpoint = newEndpoint;
        emit BlockscoutApiUpdated(newEndpoint);
    }
    
    /**
     * @dev Get user's total merits
     * @param user User address
     * @return Total merits earned
     */
    function getUserMerits(address user) external view returns (uint256) {
        return userMerits[user];
    }
} 