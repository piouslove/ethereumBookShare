var orders = [];

var orderInfo1 = '<div class="media text-muted pt-3"><img data-src="holder.js/32x32?theme=thumb&bg=007bff&fg=007bff&size=1" alt="" class="mr-2 rounded"><div class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray"><div class="d-flex justify-content-between align-items-center w-100"><strong class="text-gray-dark">书主：'
var orderInfo2 = '</strong><strong class="text-gray-dark">书名：'
var orderInfo3 = '</strong><a>图书编号：'
var orderInfo4 = '</a></div><div class="d-flex justify-content-between align-items-center w-100"><strong class="text-gray-dark">读者：'
var orderInfo5 = '</strong><a>信用分：'
var orderInfo6 = '</a><a>到期时间：'
var orderInfo7 = '</a><a>订单编号：'
var orderInfo8 = '</a></div></div></div>'

function getContract() {
	var key = document.getElementById("saltKey").value;
	var info = document.getElementById("keyStore").value;

	// let json = JSON.stringify(info);
	// let wallet;
	ethers.Wallet.fromEncryptedJson(info, key).then(function(r) {
		wallet = r;
    	console.log("Address: " + wallet.address);
    	let walletWithProvider = wallet.connect(etherscanProvider);
		let contract = contractInstance.connect(walletWithProvider);
	}).catch(function(r) {
		alert("证件信息或密码输入错误，请检查您的输入信息！")
	});
}

function agree() {
	var key = document.getElementById("saltKey").value;
	var info = document.getElementById("keyStore").value;

	// let json = JSON.stringify(info);
	// let wallet;
	ethers.Wallet.fromEncryptedJson(info, key).then(function(r) {
		var wallet = r;
    	console.log("Address: " + wallet.address);
    	let walletWithProvider = wallet.connect(etherscanProvider);
		let contract = contractInstance.connect(walletWithProvider);
    	var index = document.getElementById("orderIndex").value;
		contract.agreeOrder(ethers.utils.bigNumberify(index)).then(function(r){
			console.log(r);
			alert("借出订单上链成功！请刷新页面查看！");
		}).catch(function(r) {
			alert("订单上链发生错误，请检查您的输入信息！")
		});}).catch(function(r) {
		alert("证件信息或密码输入错误，请检查您的输入信息！")
	});
}

function reject() {
	var key = document.getElementById("saltKey").value;
	var info = document.getElementById("keyStore").value;

	// let json = JSON.stringify(info);
	// let wallet;
	ethers.Wallet.fromEncryptedJson(info, key).then(function(r) {
		var wallet = r;
    	console.log("Address: " + wallet.address);
    	let walletWithProvider = wallet.connect(etherscanProvider);
		let contract = contractInstance.connect(walletWithProvider);
		var index = document.getElementById("orderIndex").value;
		contract.rejectOrder(ethers.utils.bigNumberify(index)).then(function(r){
			console.log(r);
			alert("拒绝订单上链成功！请刷新页面查看！");
		}).catch(function(r) {
			alert("订单上链发生错误，请检查您的输入信息！")
		});
	}).catch(function(r) {
		alert("证件信息或密码输入错误，请检查您的输入信息！")
	});
}

function settle() {
	var key = document.getElementById("saltKey").value;
	var info = document.getElementById("keyStore").value;

	// let json = JSON.stringify(info);
	// let wallet;
	ethers.Wallet.fromEncryptedJson(info, key).then(function(r) {
		var wallet = r;
    	console.log("Address: " + wallet.address);
    	let walletWithProvider = wallet.connect(etherscanProvider);
		let contract = contractInstance.connect(walletWithProvider);
		var index = document.getElementById("orderIndex").value;
		var credit = document.getElementById("orderCredit").value;
		contract.settleOrder(ethers.utils.bigNumberify(index), ethers.utils.bigNumberify(credit)).then(function(r){
			console.log(r);
			alert("归还订单上链成功！请刷新页面查看！");
		}).catch(function(r) {
			alert("订单上链发生错误，请检查您的输入信息！")
		});
	}).catch(function(r) {
		alert("证件信息或密码输入错误，请检查您的输入信息！")
	});
}

function getOrders(user) {
	contractInstance.getRequestedOrders(user).then(function(r){
		orders = r;
	}).catch(function(r){
		alert("non found orders")
	});
}

function writeHTML(order) {
	var lender = order.lender;
	var borrower = order.borrower;
	console.log(borrower);
	var borrowerName = ethers.utils.toUtf8String(order.borrowerName);
	var credit = order.borrowerCredit.toString();
	var bookName = ethers.utils.toUtf8String(order.bookName);
	var bookIndex = order.bookIndex.toString();
	var expiration = new Date(order.expiration.toNumber() * 1000);
	var index = order.index.toString();
	var lenderName = ethers.utils.toUtf8String(order.lenderName);
	// var lenderName = "图书作者"

	var innerHTML = document.getElementById("orders").innerHTML;
	innerHTML = innerHTML+orderInfo1+lender+'@'+lenderName+orderInfo2+bookName+orderInfo3+bookIndex+orderInfo4+borrower+'@'+borrowerName+orderInfo5+credit+orderInfo6+expiration+orderInfo7+index+orderInfo8;
	console.log(innerHTML);
	document.getElementById("orders").innerHTML = innerHTML;
}

function writeOrders() {
	for (var i = 0; i <= orders.length - 1; i++) {
		writeHTML(orders[i]);
	}
}

function queryOrders() {
	var user = document.getElementById("userAddress").value;
	console.log("start orders query")
	console.log(user)
	getOrders(user);
	console.log("end orders query")
	setTimeout(writeOrders, 2*1000);
}