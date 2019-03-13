var books = [];
var usernames = [];

contractInstance.getBooks().then(function(r){
	books = r;
})

var bookInfo1 = '<div class="media text-muted pt-3"><img data-src="holder.js/32x32?theme=thumb&bg=007bff&fg=007bff&size=1" alt="" class="mr-2 rounded"><div class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray"><div class="d-flex justify-content-between align-items-center w-100"><strong class="text-gray-dark">'
var bookInfo2 = '</strong><a ' // 书名 + bookInfo2 + 判断'href="#">可以借用'||'>不可借用'
var bookInfo3 = '</a></div><div class="d-flex justify-content-between align-items-center w-100"><span class="d-block" '
var bookInfo4 = '</span><a>书本编号：' //用户名 + bookInfo4 + 书本编号 
var bookInfo5 = '</a></div></div></div>'


function writeHTML(book, i) {
	var bookname = ethers.utils.toUtf8String(book.name);
	var can = book.canLend ? 'href="#fillOrder">可以借用' : '>不可借用';
	var username = 'id="owner' + i + '">' + '';
	var index = book.index.toString();
	var innerHTML = document.getElementById("bookInfos").innerHTML;
	innerHTML = innerHTML+bookInfo1+bookname+bookInfo2+can+bookInfo3+username+bookInfo4+index+bookInfo5;
	document.getElementById("bookInfos").innerHTML = innerHTML;

	contractInstance.getUser(books[i].owner).then(function(r){
			console.log(r.name)
			var id = "owner" + i
			console.log(id)
			document.getElementById(id).innerHTML = '&#160;&#160;' + ethers.utils.toUtf8String(r.name);
		});
}

function writeAllBooks() {
	for (var i = 0; i <= books.length - 1; i++) {
		writeHTML(books[i], i);
	}
}

function requestBook() {
	console.log("start request")
	var key = document.getElementById("key").value;
	var info = document.getElementById("info").value;
	var index = document.getElementById("index").value;

	// let json = JSON.stringify(info);
	// let wallet;
	ethers.Wallet.fromEncryptedJson(info, key).then(function(r) {
		var wallet = r;
    	console.log("Address: " + wallet.address);
    	var walletWithProvider = wallet.connect(etherscanProvider);
		var contract = contractInstance.connect(walletWithProvider);

		contract.requestOrder(ethers.utils.bigNumberify(index)).then(function(r){
			console.log(r);
			alert("借用订单上链成功！请联系书主取用图书！");
		}).catch(function(r) {
			alert("订单上链发生错误，请检查您的输入信息！")
		});}).catch(function(r) {
		alert("表单信息错误，请检查您的输入信息！")
	});
}

setTimeout(writeAllBooks, 5*1000);

