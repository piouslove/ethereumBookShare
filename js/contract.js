let bookShareContractAddress = "0x18a09a7c7f066fe7deaeea24835bbae255636108";
let etherscanProvider = new ethers.providers.EtherscanProvider('ropsten');
let bookShareContractAbi = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "_bookIndex",
				"type": "uint256"
			}
		],
		"name": "requestOrder",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "totalOrders",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_orderIndex",
				"type": "uint256"
			}
		],
		"name": "rejectOrder",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_name",
				"type": "bytes"
			}
		],
		"name": "setBook",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_user",
				"type": "address"
			}
		],
		"name": "getOrdersOfBorrower",
		"outputs": [
			{
				"components": [
					{
						"name": "lender",
						"type": "address"
					},
					{
						"name": "lenderName",
						"type": "bytes"
					},
					{
						"name": "borrower",
						"type": "address"
					},
					{
						"name": "borrowerName",
						"type": "bytes"
					},
					{
						"name": "borrowerCredit",
						"type": "uint256"
					},
					{
						"name": "bookName",
						"type": "bytes"
					},
					{
						"name": "bookIndex",
						"type": "uint256"
					},
					{
						"name": "expiration",
						"type": "uint256"
					},
					{
						"name": "state",
						"type": "uint256"
					},
					{
						"name": "index",
						"type": "uint256"
					}
				],
				"name": "",
				"type": "tuple[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_user",
				"type": "address"
			}
		],
		"name": "getRequestedOrders",
		"outputs": [
			{
				"components": [
					{
						"name": "lender",
						"type": "address"
					},
					{
						"name": "lenderName",
						"type": "bytes"
					},
					{
						"name": "borrower",
						"type": "address"
					},
					{
						"name": "borrowerName",
						"type": "bytes"
					},
					{
						"name": "borrowerCredit",
						"type": "uint256"
					},
					{
						"name": "bookName",
						"type": "bytes"
					},
					{
						"name": "bookIndex",
						"type": "uint256"
					},
					{
						"name": "expiration",
						"type": "uint256"
					},
					{
						"name": "state",
						"type": "uint256"
					},
					{
						"name": "index",
						"type": "uint256"
					}
				],
				"name": "",
				"type": "tuple[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "books",
		"outputs": [
			{
				"name": "name",
				"type": "bytes"
			},
			{
				"name": "canLend",
				"type": "bool"
			},
			{
				"name": "owner",
				"type": "address"
			},
			{
				"name": "index",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_name",
				"type": "bytes"
			}
		],
		"name": "setUser",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "user",
				"type": "address"
			}
		],
		"name": "getUser",
		"outputs": [
			{
				"components": [
					{
						"name": "name",
						"type": "bytes"
					},
					{
						"name": "credit",
						"type": "uint256"
					},
					{
						"name": "borrowTimes",
						"type": "uint256"
					}
				],
				"name": "",
				"type": "tuple"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_orderIndex",
				"type": "uint256"
			}
		],
		"name": "agreeOrder",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_user",
				"type": "address"
			}
		],
		"name": "getSettledOrders",
		"outputs": [
			{
				"components": [
					{
						"name": "lender",
						"type": "address"
					},
					{
						"name": "lenderName",
						"type": "bytes"
					},
					{
						"name": "borrower",
						"type": "address"
					},
					{
						"name": "borrowerName",
						"type": "bytes"
					},
					{
						"name": "borrowerCredit",
						"type": "uint256"
					},
					{
						"name": "bookName",
						"type": "bytes"
					},
					{
						"name": "bookIndex",
						"type": "uint256"
					},
					{
						"name": "expiration",
						"type": "uint256"
					},
					{
						"name": "state",
						"type": "uint256"
					},
					{
						"name": "index",
						"type": "uint256"
					}
				],
				"name": "",
				"type": "tuple[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getBooks",
		"outputs": [
			{
				"components": [
					{
						"name": "name",
						"type": "bytes"
					},
					{
						"name": "canLend",
						"type": "bool"
					},
					{
						"name": "owner",
						"type": "address"
					},
					{
						"name": "index",
						"type": "uint256"
					}
				],
				"name": "",
				"type": "tuple[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "orders",
		"outputs": [
			{
				"name": "lender",
				"type": "address"
			},
			{
				"name": "lenderName",
				"type": "bytes"
			},
			{
				"name": "borrower",
				"type": "address"
			},
			{
				"name": "borrowerName",
				"type": "bytes"
			},
			{
				"name": "borrowerCredit",
				"type": "uint256"
			},
			{
				"name": "bookName",
				"type": "bytes"
			},
			{
				"name": "bookIndex",
				"type": "uint256"
			},
			{
				"name": "expiration",
				"type": "uint256"
			},
			{
				"name": "state",
				"type": "uint256"
			},
			{
				"name": "index",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "users",
		"outputs": [
			{
				"name": "name",
				"type": "bytes"
			},
			{
				"name": "credit",
				"type": "uint256"
			},
			{
				"name": "borrowTimes",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_user",
				"type": "address"
			}
		],
		"name": "getRejectedOrders",
		"outputs": [
			{
				"components": [
					{
						"name": "lender",
						"type": "address"
					},
					{
						"name": "lenderName",
						"type": "bytes"
					},
					{
						"name": "borrower",
						"type": "address"
					},
					{
						"name": "borrowerName",
						"type": "bytes"
					},
					{
						"name": "borrowerCredit",
						"type": "uint256"
					},
					{
						"name": "bookName",
						"type": "bytes"
					},
					{
						"name": "bookIndex",
						"type": "uint256"
					},
					{
						"name": "expiration",
						"type": "uint256"
					},
					{
						"name": "state",
						"type": "uint256"
					},
					{
						"name": "index",
						"type": "uint256"
					}
				],
				"name": "",
				"type": "tuple[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_user",
				"type": "address"
			}
		],
		"name": "getUsingOrders",
		"outputs": [
			{
				"components": [
					{
						"name": "lender",
						"type": "address"
					},
					{
						"name": "lenderName",
						"type": "bytes"
					},
					{
						"name": "borrower",
						"type": "address"
					},
					{
						"name": "borrowerName",
						"type": "bytes"
					},
					{
						"name": "borrowerCredit",
						"type": "uint256"
					},
					{
						"name": "bookName",
						"type": "bytes"
					},
					{
						"name": "bookIndex",
						"type": "uint256"
					},
					{
						"name": "expiration",
						"type": "uint256"
					},
					{
						"name": "state",
						"type": "uint256"
					},
					{
						"name": "index",
						"type": "uint256"
					}
				],
				"name": "",
				"type": "tuple[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_orderIndex",
				"type": "uint256"
			},
			{
				"name": "_credit",
				"type": "uint256"
			}
		],
		"name": "settleOrder",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

let contractInstance = new ethers.Contract(bookShareContractAddress, bookShareContractAbi, etherscanProvider);

