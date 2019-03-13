var shareContract;

function shareBook() {
	var key = document.getElementById("userkey").value;
	var info = document.getElementById("userinfo").value;
	console.log(info);

	// let json = JSON.stringify(info);
	// console.log(json);
	let wallet;
	ethers.Wallet.fromEncryptedJson(info, key).then(function(r) {
		var wallet = r;
    	console.log("Address: " + wallet.address);
    	let walletWithProvider = wallet.connect(etherscanProvider);
		shareContract = contractInstance.connect(walletWithProvider);
		var bookname = document.getElementById("bookname").value;
		var name = ethers.utils.toUtf8Bytes(bookname);
		shareContract.setBook(ethers.utils.hexlify(name)).then(function(r){
			console.log(r);
			alert("图书信息上链成功！请去图书分享信息页面查看！");
		}).catch(function(r) {
			alert("图书信息上链发生错误，请检查您的输入信息！")
		});}).catch(function(r) {
		alert("证件信息或密码输入错误，请检查您的输入信息！")
	});
}

/*
function _shareBook() {
	console.log(shareContract)
	var bookname = document.getElementById("bookname").value;
	var name = ethers.utils.toUtf8Bytes(bookname);
	shareContract.setBook(ethers.utils.hexlify(name)).then(function(r){
		console.log(r);
		alert("图书信息上链成功！请去图书分享信息页面查看！");
	}).catch(function(r) {
		alert("图书信息上链发生错误，请检查您的输入信息！")
	});
}

function shareBook() {
	getContract();
	setTimeout(_shareBook, 5*1000);
}
*/