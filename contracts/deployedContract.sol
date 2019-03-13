pragma solidity 0.4.24;
pragma experimental ABIEncoderV2;

contract MUser {

	struct User {
		bytes name;
		uint credit;
		uint borrowTimes;
	}
	mapping (address => User) public users;

	function getUser(address user) public view returns(User) {
		return users[user];
	}

	function setUser(bytes _name) public returns(bool) {
		users[msg.sender] = User(_name, 0, 0);
		return true;
	}

	function _changeUserCredit(address _user, uint _credit) internal {
		uint _totalCredit = users[_user].credit * users[_user].borrowTimes + _credit;
		users[_user].borrowTimes = users[_user].borrowTimes + 1;
		users[_user].credit = _totalCredit / users[_user].borrowTimes;
	}

}

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
}

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
		uint _bookIndex = orders[_orderIndex].bookIndex;
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
		uint _bookIndex = orders[_orderIndex].bookIndex;
		books[_bookIndex].canLend = true;

		_changeUserCredit(orders[_orderIndex].borrower, _credit);
	}
}
