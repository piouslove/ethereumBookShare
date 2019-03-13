pragma solidity 0.4.24;

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

	/*
	mapping (address => bytes) public userName;
	mapping (address => uint) public userCredit;
	mapping (address => uint) public borrowTimesOfUser;

	function changeUserCredit(address user, uint credit) {
		uint _totalCredit = userCredit[address] * borrowTimesOfUser[address] + credit;
		userCredit[address] = _totalCredit / (borrowTimesOfUser[address] + 1);
		borrowTimesOfUser[address] += 1;
	}

	mapping (address => bool) public authorized;
    address[] public authorities;
    */
}