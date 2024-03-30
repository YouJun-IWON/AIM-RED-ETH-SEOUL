// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RedTeamNFT is ERC721URIStorage{
    uint public _tokenId;

    mapping(uint256 => string) public output;
    mapping(uint256 => string) private _input;
    mapping(address => uint) public successCount;
    mapping(address => uint) public sellCount;

    // Event declarations
    event Minted(address indexed to, uint256 tokenId);
    event InputViewed(address indexed requester, uint256 tokenId, string userInput);

    constructor() ERC721("RedTeamNFT", "RTN") {}

    function mint(string memory tokenURI, string memory userOutput, string memory userInput) public {
    _safeMint(msg.sender, _tokenId);
    _setTokenURI(_tokenId, tokenURI);
    output[_tokenId] = userOutput;
    _input[_tokenId] = userInput;
    successCount[msg.sender]+=1;
    
    // Emitting the Minted event
    emit Minted(msg.sender, _tokenId);

    _tokenId++;
}


    function viewOutput(uint256 tokenId) public view returns (string memory) {
        return output[tokenId];
    }

    function viewInput(uint256 tokenId) public view returns (string memory) {
    require(ownerOf(tokenId) == msg.sender, "You are not the owner of this NFT.");
    
    return _input[tokenId];
}
}
