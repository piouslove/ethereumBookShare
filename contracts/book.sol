pragma solidity 0.4.24;

contract MBook {
	struct Book {
		bytes name;
		bool canLend;
		address owner;
		uint index;
	}
	Book[] public books;

	function getBooks() public view returns (Book[] memory) {
		return books;
	}

	function setBook(bytes _name) public returns (uint) {
		Book memory b = Book(_name, true, msg.sender, books.length);
		books.push(b);
		return b.index;
	}
 
	/*
	mapping (address => bool) public authorized;
	address[] public authorities;
	*/
}