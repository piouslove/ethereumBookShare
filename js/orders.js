var orders1 = [];
var orders2 = [];
var orders3 = [];
var orders4 = [];
var orders5 = [];

var orderInfo1 = '<div class="media text-muted pt-3"><img data-src="holder.js/32x32?theme=thumb&bg=007bff&fg=007bff&size=1" alt="" class="mr-2 rounded"><div class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray"><div class="d-flex justify-content-between align-items-center w-100"><strong class="text-gray-dark">书主：'
var orderInfo2 = '</strong><strong class="text-gray-dark">书名：'
var orderInfo3 = '</strong><a>图书编号：'
var orderInfo4 = '</a></div><div class="d-flex justify-content-between align-items-center w-100"><strong class="text-gray-dark">读者：'
var orderInfo5 = '</strong><a>信用分：'
var orderInfo6 = '</a><a>到期时间：'
var orderInfo7 = '</a><a>订单编号：'
var orderInfo8 = '</a></div></div></div>'

function getOrders(user) {
	contractInstance.getOrdersOfBorrower(user).then(function(r){
		orders1 = r;
	});
	contractInstance.getRequestedOrders(user).then(function(r){
		orders2 = r;
	});
	contractInstance.getRejectedOrders(user).then(function(r){
		orders3 = r;
	});
	contractInstance.getUsingOrders(user).then(function(r){
		orders4 = r;
	});
	contractInstance.getSettledOrders(user).then(function(r){
		orders5 = r;
	});
}

function writeHTML(order, i) {
	var lender = order.lender;
	var borrower = order.borrower;
	console.log(borrower);
	var borrowerName = ethers.utils.toUtf8String(order.borrowerName);
	var credit = order.borrowerCredit.toString();
	var bookName = ethers.utils.toUtf8String(order.bookName);
	var bookIndex = order.bookIndex.toString();
	var expiration = new Date(order.expiration.toNumber() * 1000);
	var index = order.index.toString();
	// var lenderName = ethers.utils.toUtf8String(order.lenderName);
	var lenderName = "图书作者"

	var innerHTML = document.getElementById("orders" + i).innerHTML;
	innerHTML = innerHTML+orderInfo1+lender+'@'+lenderName+orderInfo2+bookName+orderInfo3+bookIndex+orderInfo4+borrower+'@'+borrowerName+orderInfo5+credit+orderInfo6+expiration+orderInfo7+index+orderInfo8;
	console.log(innerHTML);
	document.getElementById("orders" + i).innerHTML = innerHTML;
}

function writeOrders1() {
	for (var i = 0; i <= orders1.length - 1; i++) {
		writeHTML(orders1[i], 1);
	}
}

function writeOrders2() {
	for (var i = 0; i <= orders2.length - 1; i++) {
		writeHTML(orders2[i], 2);
	}
}

function writeOrders3() {
	for (var i = 0; i <= orders3.length - 1; i++) {
		writeHTML(orders3[i], 3);
	}
}

function writeOrders4() {
	for (var i = 0; i <= orders4.length - 1; i++) {
		writeHTML(orders4[i], 4);
	}
}


function writeOrders5() {
	for (var i = 0; i <= orders5.length - 1; i++) {
		writeHTML(orders5[i], 5);
	}
}

function queryOrders() {
	var user = document.getElementById("userAddress").value;
	getOrders(user);
	setTimeout(writeOrders1, 2*1000);
	setTimeout(writeOrders2, 2*1000);
	console.log(1111)
	setTimeout(writeOrders3, 2*1000);
	setTimeout(writeOrders4, 2*1000);
	setTimeout(writeOrders5, 3*1000);
}
























