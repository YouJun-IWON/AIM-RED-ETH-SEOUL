// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RedTeamNFT is ERC721URIStorage, Ownable {
	mapping(uint256 => string) public output;
	mapping(uint256 => string) private _input;
	mapping(address => uint) public successCount;
	mapping(address => uint) public sellCount;

	constructor() ERC721("RedTeamNFT", "RTN") {}

	function mint(
		address to,
		uint256 tokenId,
		string memory tokenURI,
		string memory userOutput,
		string memory userInput
	) public onlyOwner {
		_mint(to, tokenId);
		_setTokenURI(tokenId, tokenURI);
		output[tokenId] = userOutput;
		_input[tokenId] = userInput;
		successCount[to] += 1;
	}

	function viewOutput(uint256 tokenId) public view returns (string memory) {
		return output[tokenId];
	}

	function viewInput(uint256 tokenId) public view returns (string memory) {
		require(
			ownerOf(tokenId) == msg.sender,
			"You are not the owner of this NFT."
		);
		return _input[tokenId];
	}
}
