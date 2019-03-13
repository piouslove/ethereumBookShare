pragma solidity 0.4.24;
import (
	"./user.sol",
	"./book.sol"
)

contract MinOrder is MUser, MBook{
	struct Order {
		address lender;
		bytes lenderName;
		address borrower;
		bytes borrowerName;
		uint borrowerCredit;
		bytes bookName;
		uint bookIndex;
		uint expiration;
		uint state;
		uint index;
	}
	uint public totalOrders;
	Order[] public orders;

	function getOrdersOfBorrower(address _user) public view returns (Order[] memory) {
		Order[] infos; 
		for (uint i = 0; i < orders.length; i++) {
			if (orders[i].borrower == _user) {
				infos.push(orders[i]);
			}
		}
		return infos;
	}

	function getRequestedOrders(address _user) public view returns (Order[] memory) {
		Order[] infos; 
		for (uint i = 0; i < orders.length; i++) {
			if (orders[i].lender == _user && orders[i].state == 1) {
				infos.push(orders[i]);
			}
		}
		return infos;
	}

	function getRejectedOrders(address _user) public view returns (Order[] memory) {
		Order[] infos; 
		for (uint i = 0; i < orders.length; i++) {
			if (orders[i].lender == _user && orders[i].state == 2) {
				infos.push(orders[i]);
			}
		}
		return infos;
	}

	function getUsingOrders(address _user) public view returns (Order[] memory) {
		Order[] infos; 
		for (uint i = 0; i < orders.length; i++) {
			if (orders[i].lender == _user && orders[i].state == 3) {
				infos.push(orders[i]);
			}
		}
		return infos;
	}

	function getSettledOrders(address _user) public view returns (Order[] memory) {
		Order[] infos; 
		for (uint i = 0; i < orders.length; i++) {
			if (orders[i].lender == _user && orders[i].state == 4) {
				infos.push(orders[i]);
			}
		}
		return infos;
	}

	function requestOrder(uint _bookIndex) public returns (uint) {
		require(books[_bookIndex].canLend);
		address _lender = books[_bookIndex].owner;
		bytes _lenderName  = users[_lender].name;
		address _borrower = msg.sender;
		bytes _borrowerName = users[_borrower].name;
		uint _borrowerCredit = users[_borrower].credit;
		bytes _bookName = books[_bookIndex].name;
		uint _expiration = now + 30 days;
		uint _state = 1;
		uint _orderIndex = totalOrders;
		orders.push(Order(_lender, _lenderName, _borrower, _borrowerName, _borrowerCredit, 
			_bookName, _bookIndex, _expiration, _state, _orderIndex));
		books[_bookIndex].canLend = false;
		totalOrders += 1;
	}

	function rejectOrder(uint _orderIndex) public returns (uint) {
		require(orders[_orderIndex].state == 1);
		require(orders[_orderIndex].lender == msg.sender);
		
		orders[_orderIndex].state = 2;
		uint memory _bookIndex = orders[_orderIndex].bookIndex;
		books[_bookIndex].canLend = true;
	}

	function agreeOrder(uint _orderIndex) public returns (uint) {
		require(orders[_orderIndex].state == 1);
		require(orders[_orderIndex].lender == msg.sender);
		
		orders[_orderIndex].state = 3;
	}

	function settleOrder(uint _orderIndex, uint _credit) public returns (uint) {
		require(orders[_orderIndex].state == 3);
		require(orders[_orderIndex].lender == msg.sender);
		
		orders[_orderIndex].state = 4;
		uint memory _bookIndex = orders[_orderIndex].bookIndex;
		books[_bookIndex].canLend = true;

		_changeUserCredit(orders[_orderIndex].borrower, _credit);
	}

	/*
	mapping (uint => Book) public orderBook;
	mapping (uint => uint) public orderExp;
	mapping (uint => User) public orderBorrower;
	mapping (uint => uint) public orderState;

	mapping (address => uint[]) public ordersOfLender;
	mapping (address => uint[]) public ordersOfBorrower;

	mapping (address => uint[]) public requestedOrders;
	mapping (address => uint[]) public rejectedOrders;
	mapping (address => uint[]) public usingOrders;
	mapping (address => uint[]) public settledOrders;
	*/

}






























