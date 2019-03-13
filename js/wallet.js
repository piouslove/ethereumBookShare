let randomWallet = ethers.Wallet.createRandom();
console.log(randomWallet.address);
getFaucetEther(randomWallet.address);
getFaucetEther(randomWallet.address);

function getKeyStore() {
	var password = document.getElementById("inputPassword").value;
	/*
	var username = document.getElementById("inputUserName").value;
	var cryptoKey = ethers.utils.hexlify(ethers.utils.toUtf8Bytes(password));
	var key = cryptoKey + randomWallet.privateKey.substr(2);
	console.log(key);
	var json = {"userName": username, "userID": randomWallet.address, "userKey": key};
	document.getElementById("walletJson").innerHTML = '<p class="card-text">'+JSON.stringify(json)+'</p>';
	*/

	encryptKey(password, callback);
}

function registerUser() {
	var username = document.getElementById("inputUserName").value;
	setOwnerUser(randomWallet, username);
}

function encryptKey(password) {
	let encryptPromise = randomWallet.encrypt(password, callback);
	encryptPromise.then(function(json) {
		document.getElementById("walletJson").innerHTML = '<p class="card-text">'+json+'</p>';
		document.getElementById("userId").innerHTML = "您的用户编号为：" + randomWallet.address;
	}).catch(function(error){console.log(error)});
}

function callback(progress) {
    console.log("Encrypting: " + parseInt(progress * 100) + "% complete");
}

function getFaucetEther(address) {
	var url = "https://faucet.metamask.io";
	$.ajax({
		url: url,
		type: "POST",
		data: address,
		contentType: "application/rawdata",
		success: function(response){
			console.log(response);
		}
	});
}


function setOwnerUser(wallet, username) {
	getFaucetEther(randomWallet.address);
	var walletWithProvider = wallet.connect(etherscanProvider);
	var contract = contractInstance.connect(walletWithProvider);

	var name = ethers.utils.toUtf8Bytes(username);
	console.log(ethers.utils.hexlify(name))
	contract.setUser(ethers.utils.hexlify(name)).then(function(r){
		console.log(r);
		alert("链上用户注册成功！");
	});
	getFaucetEther(randomWallet.address);
}





















