import logo from './logo.svg';
import './css/bootstrap.min.css';
import './css/style.css';
import './App.css';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Web3Modal from "web3modal";
const WalletConnectProvider = window.WalletConnectProvider.default;
const Fortmatic = window.Fortmatic;

let Web3 = require('web3');

const providerOptions = {
    walletconnect: {
        package: WalletConnectProvider,
        options: {
            infuraId: "234b36b2825f470ea300193c54bc4161",
        }
    },
};

const web3Modal = new Web3Modal({
    network: "mainnet", // optional
    providerOptions // required
});

let web3;
let provider;
let goodConnect = false;


class Mint extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            contractAddress: "0x5fA245a0c4070F44F49fD9D2Af3ef98A00A6b435",
            web3: "",
            contract: "0x5fA245a0c4070F44F49fD9D2Af3ef98A00A6b435",
            sliderNumber: 2,
            mintsLeft: "10000",
            timeLeft: "",
            disabled: true,
            price: "0.16 Matic"
        };
    }

    async componentDidMount() {
        let abi = [{
                "inputs": [{
                    "internalType": "string",
                    "name": "baseURI",
                    "type": "string"
                }],
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "anonymous": false,
                "inputs": [{
                        "indexed": true,
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "approved",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "internalType": "uint256",
                        "name": "tokenId",
                        "type": "uint256"
                    }
                ],
                "name": "Approval",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [{
                        "indexed": true,
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "operator",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "internalType": "bool",
                        "name": "approved",
                        "type": "bool"
                    }
                ],
                "name": "ApprovalForAll",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [{
                        "indexed": true,
                        "internalType": "address",
                        "name": "previousOwner",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "newOwner",
                        "type": "address"
                    }
                ],
                "name": "OwnershipTransferred",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [{
                        "indexed": true,
                        "internalType": "address",
                        "name": "from",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "internalType": "uint256",
                        "name": "tokenId",
                        "type": "uint256"
                    }
                ],
                "name": "Transfer",
                "type": "event"
            },
            {
                "inputs": [],
                "name": "MAX_SUPPLY",
                "outputs": [{
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "PRE_PRICE",
                "outputs": [{
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "PRICE",
                "outputs": [{
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [{
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }],
                "name": "VIPAmounts",
                "outputs": [{
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [{
                        "internalType": "address[]",
                        "name": "_addresses",
                        "type": "address[]"
                    },
                    {
                        "internalType": "uint256[]",
                        "name": "_amounts",
                        "type": "uint256[]"
                    }
                ],
                "name": "addToVIPlist",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [{
                    "internalType": "address[]",
                    "name": "_addresses",
                    "type": "address[]"
                }],
                "name": "addToWhitelist",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [{
                        "internalType": "address",
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "tokenId",
                        "type": "uint256"
                    }
                ],
                "name": "approve",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [{
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                }],
                "name": "balanceOf",
                "outputs": [{
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "baseTokenURI",
                "outputs": [{
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [{
                    "internalType": "uint256",
                    "name": "_count",
                    "type": "uint256"
                }],
                "name": "calculatePrice",
                "outputs": [{
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "claimFreeNFTsVIP",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [{
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }],
                "name": "getApproved",
                "outputs": [{
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [{
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }],
                "name": "giveawayNFTs",
                "outputs": [{
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "hidden",
                "outputs": [{
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [{
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "operator",
                        "type": "address"
                    }
                ],
                "name": "isApprovedForAll",
                "outputs": [{
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [{
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }],
                "name": "isWhitelisted",
                "outputs": [{
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [{
                    "internalType": "uint256",
                    "name": "_count",
                    "type": "uint256"
                }],
                "name": "mintNFTs",
                "outputs": [],
                "stateMutability": "payable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "name",
                "outputs": [{
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "owner",
                "outputs": [{
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [{
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }],
                "name": "ownerOf",
                "outputs": [{
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [{
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }],
                "name": "preMinted",
                "outputs": [{
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "preNFTsMinted",
                "outputs": [{
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "presale",
                "outputs": [{
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [{
                    "internalType": "address[]",
                    "name": "_addresses",
                    "type": "address[]"
                }],
                "name": "removeFromVIPlist",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [{
                    "internalType": "address[]",
                    "name": "_addresses",
                    "type": "address[]"
                }],
                "name": "removeFromWhitelist",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "renounceOwnership",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "revealDate",
                "outputs": [{
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "revealNFTs",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [{
                        "internalType": "address",
                        "name": "from",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "tokenId",
                        "type": "uint256"
                    }
                ],
                "name": "safeTransferFrom",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [{
                        "internalType": "address",
                        "name": "from",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "tokenId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bytes",
                        "name": "_data",
                        "type": "bytes"
                    }
                ],
                "name": "safeTransferFrom",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [{
                        "internalType": "address",
                        "name": "operator",
                        "type": "address"
                    },
                    {
                        "internalType": "bool",
                        "name": "approved",
                        "type": "bool"
                    }
                ],
                "name": "setApprovalForAll",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [{
                    "internalType": "string",
                    "name": "_baseTokenURI",
                    "type": "string"
                }],
                "name": "setBaseURI",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "startPublicSale",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [{
                    "internalType": "bytes4",
                    "name": "interfaceId",
                    "type": "bytes4"
                }],
                "name": "supportsInterface",
                "outputs": [{
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "symbol",
                "outputs": [{
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [{
                    "internalType": "uint256",
                    "name": "index",
                    "type": "uint256"
                }],
                "name": "tokenByIndex",
                "outputs": [{
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [{
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "index",
                        "type": "uint256"
                    }
                ],
                "name": "tokenOfOwnerByIndex",
                "outputs": [{
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [{
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }],
                "name": "tokenURI",
                "outputs": [{
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [{
                    "internalType": "address",
                    "name": "_owner",
                    "type": "address"
                }],
                "name": "tokensOfOwner",
                "outputs": [{
                    "internalType": "uint256[]",
                    "name": "",
                    "type": "uint256[]"
                }],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "totalSupply",
                "outputs": [{
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [{
                        "internalType": "address",
                        "name": "from",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "tokenId",
                        "type": "uint256"
                    }
                ],
                "name": "transferFrom",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [{
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                }],
                "name": "transferOwnership",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "withdraw",
                "outputs": [],
                "stateMutability": "payable",
                "type": "function"
            }
        ];
        web3 = new Web3("https://mainnet.infura.io/v3/9299e4519e684578bf5f290f546c99f7");

        let contract = await new web3.eth.Contract(abi, "0x27433113B7b2B25E0CC018E0c6eE629A0466683E");

        let mintsLeft = 1000 - await contract.methods.totalSupply().call();

        this.setState({
            contract: contract,
            mintsLeft: (mintsLeft > 0) ? mintsLeft : 0,
            disabled: (mintsLeft > 0) ? false : true
        });

        let timer = setInterval(() => {
            const date1 = Number(new Date());
            const date2 = 1640116800 * 1000;
            const seconds = Number(date2 - date1) / 1000;
            let d = "0" + Math.floor(seconds / (3600 * 24));
            let h = (Math.floor(seconds % (3600 * 24) / 3600) < 10) ? "0" + Math.floor(seconds % (3600 * 24) / 3600) : Math.floor(seconds % (3600 * 24) / 3600);
            let m = (Math.floor(seconds % 3600 / 60) < 10) ? "0" + Math.floor(seconds % 3600 / 60) : Math.floor(seconds % 3600 / 60);
            let s = (Math.floor(seconds % 60) < 10) ? "0" + Math.floor(seconds % 60) : Math.floor(seconds % 60);

            let timeLeft;

            if (seconds >= 0) {
                timeLeft = "IN " + d + ":" + h + ":" + m + ":" + s;
                this.setState({
                    disabled: true
                });
            } else {
                timeLeft = "NOW";
                if (mintsLeft > 0) {
                    this.setState({
                        disabled: false
                    });
                } else {
                    timeLeft = "SOLD OUT";
                }

                clearInterval(timer);
            }

            this.setState({
                timeLeft: timeLeft,
            });
        }, 1000);
    }

    onSliderChange(i) {
        this.setState({
            sliderNumber: i.target.value,
            price: 0.08 * i.target.value + " ether"
        });
    }

    async mint() {
        document.getElementById("error").innerHTML = "";
        let abi = [{
                "inputs": [{
                    "internalType": "string",
                    "name": "baseURI",
                    "type": "string"
                }],
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "anonymous": false,
                "inputs": [{
                        "indexed": true,
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "approved",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "internalType": "uint256",
                        "name": "tokenId",
                        "type": "uint256"
                    }
                ],
                "name": "Approval",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [{
                        "indexed": true,
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "operator",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "internalType": "bool",
                        "name": "approved",
                        "type": "bool"
                    }
                ],
                "name": "ApprovalForAll",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [{
                        "indexed": true,
                        "internalType": "address",
                        "name": "previousOwner",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "newOwner",
                        "type": "address"
                    }
                ],
                "name": "OwnershipTransferred",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [{
                        "indexed": true,
                        "internalType": "address",
                        "name": "from",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "internalType": "uint256",
                        "name": "tokenId",
                        "type": "uint256"
                    }
                ],
                "name": "Transfer",
                "type": "event"
            },
            {
                "inputs": [],
                "name": "MAX_SUPPLY",
                "outputs": [{
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "PRE_PRICE",
                "outputs": [{
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "PRICE",
                "outputs": [{
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [{
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }],
                "name": "VIPAmounts",
                "outputs": [{
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [{
                        "internalType": "address[]",
                        "name": "_addresses",
                        "type": "address[]"
                    },
                    {
                        "internalType": "uint256[]",
                        "name": "_amounts",
                        "type": "uint256[]"
                    }
                ],
                "name": "addToVIPlist",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [{
                    "internalType": "address[]",
                    "name": "_addresses",
                    "type": "address[]"
                }],
                "name": "addToWhitelist",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [{
                        "internalType": "address",
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "tokenId",
                        "type": "uint256"
                    }
                ],
                "name": "approve",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [{
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                }],
                "name": "balanceOf",
                "outputs": [{
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "baseTokenURI",
                "outputs": [{
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [{
                    "internalType": "uint256",
                    "name": "_count",
                    "type": "uint256"
                }],
                "name": "calculatePrice",
                "outputs": [{
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "claimFreeNFTsVIP",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [{
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }],
                "name": "getApproved",
                "outputs": [{
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [{
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }],
                "name": "giveawayNFTs",
                "outputs": [{
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "hidden",
                "outputs": [{
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [{
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "operator",
                        "type": "address"
                    }
                ],
                "name": "isApprovedForAll",
                "outputs": [{
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [{
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }],
                "name": "isWhitelisted",
                "outputs": [{
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [{
                    "internalType": "uint256",
                    "name": "_count",
                    "type": "uint256"
                }],
                "name": "mintNFTs",
                "outputs": [],
                "stateMutability": "payable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "name",
                "outputs": [{
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "owner",
                "outputs": [{
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [{
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }],
                "name": "ownerOf",
                "outputs": [{
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [{
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }],
                "name": "preMinted",
                "outputs": [{
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "preNFTsMinted",
                "outputs": [{
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "presale",
                "outputs": [{
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [{
                    "internalType": "address[]",
                    "name": "_addresses",
                    "type": "address[]"
                }],
                "name": "removeFromVIPlist",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [{
                    "internalType": "address[]",
                    "name": "_addresses",
                    "type": "address[]"
                }],
                "name": "removeFromWhitelist",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "renounceOwnership",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "revealDate",
                "outputs": [{
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "revealNFTs",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [{
                        "internalType": "address",
                        "name": "from",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "tokenId",
                        "type": "uint256"
                    }
                ],
                "name": "safeTransferFrom",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [{
                        "internalType": "address",
                        "name": "from",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "tokenId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bytes",
                        "name": "_data",
                        "type": "bytes"
                    }
                ],
                "name": "safeTransferFrom",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [{
                        "internalType": "address",
                        "name": "operator",
                        "type": "address"
                    },
                    {
                        "internalType": "bool",
                        "name": "approved",
                        "type": "bool"
                    }
                ],
                "name": "setApprovalForAll",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [{
                    "internalType": "string",
                    "name": "_baseTokenURI",
                    "type": "string"
                }],
                "name": "setBaseURI",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "startPublicSale",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [{
                    "internalType": "bytes4",
                    "name": "interfaceId",
                    "type": "bytes4"
                }],
                "name": "supportsInterface",
                "outputs": [{
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "symbol",
                "outputs": [{
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [{
                    "internalType": "uint256",
                    "name": "index",
                    "type": "uint256"
                }],
                "name": "tokenByIndex",
                "outputs": [{
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [{
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "index",
                        "type": "uint256"
                    }
                ],
                "name": "tokenOfOwnerByIndex",
                "outputs": [{
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [{
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }],
                "name": "tokenURI",
                "outputs": [{
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [{
                    "internalType": "address",
                    "name": "_owner",
                    "type": "address"
                }],
                "name": "tokensOfOwner",
                "outputs": [{
                    "internalType": "uint256[]",
                    "name": "",
                    "type": "uint256[]"
                }],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "totalSupply",
                "outputs": [{
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [{
                        "internalType": "address",
                        "name": "from",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "tokenId",
                        "type": "uint256"
                    }
                ],
                "name": "transferFrom",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [{
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                }],
                "name": "transferOwnership",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "withdraw",
                "outputs": [],
                "stateMutability": "payable",
                "type": "function"
            }
        ];
        if (!goodConnect) {
            provider = await web3Modal.connect();

            if (provider) {
                web3 = await new Web3(provider);
                if (web3) {
                    document.getElementById("joodje2").style.display = "none";
                    goodConnect = true;
                }
            }
        }

        let accounts = await web3.eth.getAccounts();

        let contract = await new web3.eth.Contract(abi, "0x27433113B7b2B25E0CC018E0c6eE629A0466683E");
        let price = await contract.methods.calculatePrice(this.state.sliderNumber).call();
        let userBalance = await web3.eth.getBalance(accounts[0]);
        if (parseInt(userBalance) < parseInt(price)) {
            document.getElementById("error").innerHTML = "Error: insufficient balance!";
            return;
        }

        if (accounts.length != 0) {
            try {
                await contract.methods.mintNFTs(this.state.sliderNumber).send({
                    from: accounts[0],
                    value: price,
                });
            } catch (err) {}
        } else {
            document.getElementById("joodje").click();
        }
    }

    render() {
        return ( <
            section id = "mint"
            class = "iWoqyA" >
            <
            article class = "jUVquB" >
            <
            h1 class = "fBdFtt" > MINT { this.state.timeLeft } < /h1> <
            p class = "yo8" > NFTs left: { this.state.mintsLeft } < /p> <
            div class = "slidecontainer" >
            <
            input disabled = { this.state.disabled }
            type = "range"
            onChange = { i => this.onSliderChange(i) }
            min = "1"
            max = "20"
            defaultValue = "2"
            class = "slider"
            id = "myRange" / >
            <
            /div> <
            p id = "error" > < /p> <
            button disabled = { this.state.disabled }
            onClick = {
                () => this.mint()
            }
            class = "ccLPYu" > < span > Mint { this.state.sliderNumber }
            NFTs < br id = "brr" > < /br><span id="price">{this.state.price}</span > < /span></button > < br > < /br> {/ *
        } < button id = "mintert"
        class = "ccLPYu" > Mint(SOON) < /button><br></br > {*/ } </
            article > < /section>
        );
    }
}

class Faq extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            collapsed: true,
            classes: "accordion-collapse collapse",
            classes1: "accordion-button collapsed"
        };

        this.question = props.question;
        this.answer = props.answer;
    }

    toggleAnswer() {
        if (this.state.collapsed) {
            this.setState({
                classes: "accordion-collapse",
                classes1: "accordion-button"
            });
        } else {
            this.setState({
                classes: "accordion-collapse collapse",
                classes1: "accordion-button collapsed"
            });
        }

        this.setState({ collapsed: !this.state.collapsed });
    }

    render() {
        return ( <
            div _ngcontent - xjh - c39 = ""
            id = "accordionExample"
            class = "accordion" >
            <
            div _ngcontent - xjh - c39 = ""
            class = "accordion-item" >
            <
            h2 _ngcontent - xjh - c39 = ""
            id = "headingOne"
            class = "accordion-header" > < button _ngcontent - xjh - c39 = ""
            onClick = {
                () => this.toggleAnswer()
            }
            type = "button"
            data - bs - toggle = "collapse"
            data - bs - target = "#collapseOne"
            aria - expanded = "false"
            aria - controls = "collapseOne"
            class = { this.state.classes1 } > { this.question } < /button></h
            2 >
            <
            div _ngcontent - xjh - c39 = ""
            id = "collapseOne"
            aria - labelledby = "headingOne"
            data - bs - parent = "#accordionExample"
            class = { this.state.classes } >
            <
            div _ngcontent - xjh - c39 = ""
            class = "accordion-body" > { this.answer } < /div>
        );
    }
}

const easeOutQuad = t => t * (2 - t);
const frameDuration = 1000 / 60;

const CountUpAnimation = ({ children, duration = 1000 }) => {
    const countTo = parseInt(children, 10);
    const [count, setCount] = useState(0);

    useEffect(() => {
        let frame = 0;
        const totalFrames = Math.round(duration / frameDuration);
        const counter = setInterval(() => {
            frame++;
            const progress = easeOutQuad(frame / totalFrames);
            setCount(countTo * progress);

            if (frame === totalFrames) {
                clearInterval(counter);
            }
        }, frameDuration);
    }, []);

    let newV = Math.floor(count);
    newV = newV.toLocaleString().replace(",", ".");
    return newV;
};

const colors = ["transparant", "transparant", "transparant"];
const delay = 2500;
const info = [ < div class = "styled__Item-sc-1r9w3ao-0 flhUca aathe" >
    <
    p > Members on Discord < /p> <
    div class = "styled__CounterWrap-sc-1r9w3ao-1 clZZRW" >
    <
    svg width = "24"
    height = "24"
    viewBox = "0 0 71 55"
    fill = "none"
    xmlns = "http://www.w3.org/2000/svg" >
    <
    g clip - path = "url(#clip0)" >
    <
    path d = "M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1626 26.2532 30.1066 30.1693C30.1066 34.1136 27.28 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9 23.0133 53.7545 26.2532 53.6986 30.1693C53.6986 34.1136 50.9 37.3253 47.3178 37.3253Z"
    fill = "white" / >
    <
    /g> <
    defs >
    <
    clipPath id = "clip0" >
    <
    rect width = "71"
    height = "55"
    fill = "white" / >
    <
    /clipPath> < /
    defs > <
    /svg> <
    h3 > < span > < CountUpAnimation > 16800 < /CountUpAnimation></span > + < /h3> < /
    div > <
    /div>, <div class="styled__Item-sc-1r9w3ao-0 flhUca aathe"> <
    p class = "yo232" > Followers on Twitter < /p> <
    div class = "styled__CounterWrap-sc-1r9w3ao-1 clZZRW" >
    <
    svg xmlns = "http://www.w3.org/2000/svg"
    fill = "white"
    width = "24"
    height = "24"
    viewBox = "0 0 24 24" > < path d = "M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" / > < /svg> <
    h3 > < span > < CountUpAnimation > 25700 < /CountUpAnimation></span > + < /h3> < /
    div > <
    /div>, <div class="styled__Item-sc-1r9w3ao-0 flhUca aathe"> <
    p class = "yo232" > Followers on Instagram < /p> <
    div class = "styled__CounterWrap-sc-1r9w3ao-1 clZZRW" >
    <
    svg xmlns = "http://www.w3.org/2000/svg"
    fill = "white"
    width = "24"
    height = "24"
    viewBox = "0 0 24 24" > < path d = "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" / > < /svg> <
    h3 > < span > < CountUpAnimation > 20100 < /CountUpAnimation></span > + < /h3> < /
    div > <
    /div>];

    function Slideshow() {
        const [index, setIndex] = React.useState(0);
        const timeoutRef = React.useRef(null);

        function resetTimeout() {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        }

        React.useEffect(() => {
            resetTimeout();
            timeoutRef.current = setTimeout(
                () =>
                setIndex((prevIndex) =>
                    prevIndex === colors.length - 1 ? 0 : prevIndex + 1
                ),
                delay
            );

            return () => {
                resetTimeout();
            };
        }, [index]);

        return ( <
            div className = "slideshow" >
            <
            div className = "slideshowSlider"
            style = {
                { transform: `translate3d(${-index * 100}%, 0, 0)` }
            } > {
                colors.map((backgroundColor, index) => ( <
                    div className = "slide"
                    key = { index }
                    style = {
                        { backgroundColor }
                    } >

                    { info[index] }

                    <
                    /div>
                ))
            } <
            /div>

            <
            div className = "slideshowDots" > {
                colors.map((_, idx) => ( <
                    div key = { idx }
                    className = { `slideshowDot${index === idx ? " active" : ""}` }
                    onClick = {
                        () => {
                            setIndex(idx);
                        }
                    } >
                    <
                    /div>
                ))
            } <
            /div> < /
            div >
        );
    }


    class App extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                classes: "ZdDeC",
                address: ""
            }
        }

        toggleNav() {
            if (this.state.classes == "ZdDeC") {
                this.setState({ classes: "ZdDeC open" });
            } else {
                this.setState({ classes: "ZdDeC" });
            }
        }

        async connectWallet() {
            provider = await web3Modal.connect();

            if (provider) {
                web3 = await new Web3(provider);
                if (web3) {
                    document.getElementById("joodje2").style.display = "none";
                    goodConnect = true;
                }
            }
        }

        render() {
            return ( <
                    div className = "App" >
                    <
                    header class = "gBTIvb" >
                    <
                    div class = "bkTgwT" >
                    <
                    a href = "/"
                    class = "cngFGP" >
                    <
                    div class = "yo36" >
                    <
                    div class = "yo37" >
                    <
                    img class = "yo38"
                    alt = ""
                    aria - hidden = "true"
                    src = "/images/image6.png" / >
                    <
                    /div> < /
                    div > <
                    /a> <
                    nav class = "hGcdl" >
                    <
                    ul >
                    <
                    li routerLinkActive = "active" > < a href = "#about"
                    class = "xOyBO active" > About < /a></li >
                    <
                    li class = "yo39"
                    routerLinkActive = "active" > < a class = "xOyBO active"
                    href = "javascript:void(0);" > Dashboard < /a></li >
                    <
                    li > < a href = "#mint"
                    class = "xOyBO" > Mint < /a></li > { /*<li routerLinkActive ="active"><a (click)= "onmarketclick()"  href="javascript:void(0);" class="xOyBO" >Market</a></li>*/ } <
                    li routerLinkActive = "active" > < a href = "#roadmap"
                    class = "xOyBO" > Roadmap < /a></li >
                    <
                    li routerLinkActive = "active" > < a class = "xOyBO"
                    href = "#team" > Team < /a></li >
                    <
                    li class = "yo39"
                    routerLinkActive = "active" > < a class = "xOyBO"
                    href = "javascript:void(0);" > Create < /a></li >
                    <
                    li class = "yo39"
                    routerLinkActive = "active" > < a class = "xOyBO"
                    href = "javascript:void(0);" > Builder < /a></li > { /*<li  style="margin-left: 10px;" routerLinkActive ="active">*/ } <
                    /ul> <
                    ul >
                    <
                    li class = "yo41" >
                    <
                    a href = "https://discord.gg/pickyparrotsnft"
                    target = "_blank"
                    class = "cFpUrE" >
                    <
                    svg viewBox = "0 0 37 28"
                    fill = "none"
                    xmlns = "http://www.w3.org/2000/svg" >
                    <
                    path d = "M31.218 2.373c4.136 6.096 6.179 12.974 5.415 20.89a.119.119 0 01-.048.085c-3.132 2.306-6.167 3.705-9.16 4.633a.117.117 0 01-.128-.043 24.503 24.503 0 01-1.87-3.049.118.118 0 01.063-.163 18.694 18.694 0 002.858-1.363.118.118 0 00.01-.195 14.574 14.574 0 01-.569-.447.112.112 0 00-.12-.015c-5.923 2.742-12.412 2.742-18.405 0a.114.114 0 00-.119.016c-.183.152-.375.302-.567.446a.118.118 0 00.012.195c.912.524 1.86.986 2.857 1.365a.116.116 0 01.063.161 21.81 21.81 0 01-1.87 3.05.12.12 0 01-.13.042 30.344 30.344 0 01-9.144-4.633.124.124 0 01-.048-.086C-.32 16.414.98 9.48 5.728 2.372a.107.107 0 01.05-.043A30.08 30.08 0 0113.231.012a.118.118 0 01.12.057c.323.573.693 1.309.943 1.91a27.828 27.828 0 018.373 0c.25-.588.606-1.337.928-1.91a.114.114 0 01.12-.057 30.15 30.15 0 017.454 2.317c.02.009.038.023.048.044zm-15.521 13.02c.028-2.024-1.444-3.7-3.292-3.7-1.833 0-3.291 1.661-3.291 3.7 0 2.04 1.487 3.7 3.29 3.7 1.834 0 3.293-1.66 3.293-3.7zm12.169 0c.029-2.024-1.444-3.7-3.291-3.7-1.834 0-3.292 1.661-3.292 3.7 0 2.04 1.487 3.7 3.292 3.7 1.847 0 3.29-1.66 3.29-3.7z" > < /path> < /
                    svg > <
                    /a> < /
                    li > <
                    li class = "yo41" >
                    <
                    a href = "https://twitter.com/pickyparrotsnft"
                    target = "_blank"
                    class = "cFpUrE" >
                    <
                    svg viewBox = "0 0 35 28"
                    xmlns = "http://www.w3.org/2000/svg" >
                    <
                    path d = "M10.831 28c12.997 0 20.104-10.771 20.104-20.112 0-.306-.006-.61-.02-.913a14.372 14.372 0 003.525-3.66 14.082 14.082 0 01-4.058 1.112A7.094 7.094 0 0033.49.517a14.17 14.17 0 01-4.486 1.716 7.068 7.068 0 00-12.224 4.834c0 .555.062 1.095.183 1.612-5.873-.295-11.08-3.108-14.565-7.385a7.052 7.052 0 00-.957 3.553 7.064 7.064 0 003.144 5.884 7.01 7.01 0 01-3.2-.884v.09a7.07 7.07 0 005.668 6.929 7.077 7.077 0 01-3.191.121 7.073 7.073 0 006.6 4.91 14.171 14.171 0 01-8.776 3.025A14.34 14.34 0 010 24.824 19.996 19.996 0 0010.831 28" > < /path> < /
                    svg > <
                    /a> < /
                    li > <
                    li class = "yo41" >
                    <
                    a href = "https://www.instagram.com/pickyparrotsnft/"
                    target = "_blank"
                    class = "cFpUrE" >
                    <
                    svg xmlns = "http://www.w3.org/2000/svg"
                    x = "0px"
                    y = "0px"
                    width = "14"
                    height = "14"
                    viewBox = "0 0 24 24"
                    class = "yo42" >
                    <
                    path d = "M 8 3 C 5.2 3 3 5.2 3 8 L 3 16 C 3 18.8 5.2 21 8 21 L 16 21 C 18.8 21 21 18.8 21 16 L 21 8 C 21 5.2 18.8 3 16 3 L 8 3 z M 8 5 L 16 5 C 17.7 5 19 6.3 19 8 L 19 16 C 19 17.7 17.7 19 16 19 L 8 19 C 6.3 19 5 17.7 5 16 L 5 8 C 5 6.3 6.3 5 8 5 z M 17 6 C 16.4 6 16 6.4 16 7 C 16 7.6 16.4 8 17 8 C 17.6 8 18 7.6 18 7 C 18 6.4 17.6 6 17 6 z M 12 7 C 9.2 7 7 9.2 7 12 C 7 14.8 9.2 17 12 17 C 14.8 17 17 14.8 17 12 C 17 9.2 14.8 7 12 7 z M 12 9 C 13.7 9 15 10.3 15 12 C 15 13.7 13.7 15 12 15 C 10.3 15 9 13.7 9 12 C 9 10.3 10.3 9 12 9 z" > < /path> < /
                    svg > <
                    /a> < /
                    li > <
                    li class = "yo41" >
                    <
                    a href = "https://opensea.io/collection/pickyparrotsofficial"
                    target = "_blank"
                    class = "cFpUrE" >
                    <
                    img src = "/images/opensea.png"
                    width = "40" / >
                    <
                    /a> < /
                    li > <
                    /ul> < /
                    nav > <
                    div id = "joodje2"
                    class = "yo42" >
                    <
                    button id = "joodje"
                    onClick = {
                        () => this.connectWallet()
                    }
                    class = "ccLPYu2" > CONNECT < /button> < /
                    div > <
                    button class = "hsQdGo"
                    onClick = {
                        () => this.toggleNav()
                    } >
                    <
                    svg viewBox = "0 0 24 24"
                    xmlns = "http://www.w3.org/2000/svg" >
                    <
                    path d = "M21.25 0H2.75A2.752 2.752 0 000 2.75v18.5A2.752 2.752 0 002.75 24h18.5A2.752 2.752 0 0024 21.25V2.75A2.752 2.752 0 0021.25 0zM16 17H8a1 1 0 110-2h8a1 1 0 110 2zm0-4H8a1 1 0 110-2h8a1 1 0 110 2zm0-4H8a1 1 0 110-2h8a1 1 0 110 2z" > < /path> < /
                    svg > <
                    /button> < /
                    div > <
                    /header> <
                    aside class = { this.state.classes } >
                    <
                    section class = "ciLgYJ" >
                    <
                    button class = "hsQdGo"
                    onClick = {
                        () => this.toggleNav()
                    } >
                    <
                    div class = "yo46" >
                    <
                    img src = "../images/footprint.png"
                    width = "50"
                    alt = "" / >
                    <
                    /div> <
                    div class = "yo47" >
                    <
                    img class = "yo48"
                    src = "/images/cross.png" / >
                    <
                    /div> < /
                    button > <
                    ul class = "heJPfF" >
                    <
                    li routerLinkActive = "active" > < a href = "/#about"
                    class = "dCPMrj" > About < /a></li >
                    <
                    li routerLinkActive = "active" > < a href = "/#mint"
                    class = "dCPMrj" > Mint < /a></li >
                    <
                    li routerLinkActive = "active" > < a href = "/#roadmap"
                    class = "dCPMrj" > Roadmap < /a></li >
                    <
                    li routerLinkActive = "active" > < a href = "/#team"
                    class = "dCPMrj" > Team < /a></li >
                    <
                    li class = "d-flex justify-content-center align-items-center"
                    class = "yo49" >
                    <
                    li class = "list-" >
                    <
                    a href = "https://discord.gg/pickyparrotsnft"
                    class = "theIc" >
                    <
                    svg viewBox = "0 0 37 28"
                    fill = "white"
                    xmlns = "http://www.w3.org/2000/svg"
                    class = "yo50" >
                    <
                    path fill = "white"
                    d = "M31.218 2.373c4.136 6.096 6.179 12.974 5.415 20.89a.119.119 0 01-.048.085c-3.132 2.306-6.167 3.705-9.16 4.633a.117.117 0 01-.128-.043 24.503 24.503 0 01-1.87-3.049.118.118 0 01.063-.163 18.694 18.694 0 002.858-1.363.118.118 0 00.01-.195 14.574 14.574 0 01-.569-.447.112.112 0 00-.12-.015c-5.923 2.742-12.412 2.742-18.405 0a.114.114 0 00-.119.016c-.183.152-.375.302-.567.446a.118.118 0 00.012.195c.912.524 1.86.986 2.857 1.365a.116.116 0 01.063.161 21.81 21.81 0 01-1.87 3.05.12.12 0 01-.13.042 30.344 30.344 0 01-9.144-4.633.124.124 0 01-.048-.086C-.32 16.414.98 9.48 5.728 2.372a.107.107 0 01.05-.043A30.08 30.08 0 0113.231.012a.118.118 0 01.12.057c.323.573.693 1.309.943 1.91a27.828 27.828 0 018.373 0c.25-.588.606-1.337.928-1.91a.114.114 0 01.12-.057 30.15 30.15 0 017.454 2.317c.02.009.038.023.048.044zm-15.521 13.02c.028-2.024-1.444-3.7-3.292-3.7-1.833 0-3.291 1.661-3.291 3.7 0 2.04 1.487 3.7 3.29 3.7 1.834 0 3.293-1.66 3.293-3.7zm12.169 0c.029-2.024-1.444-3.7-3.291-3.7-1.834 0-3.292 1.661-3.292 3.7 0 2.04 1.487 3.7 3.292 3.7 1.847 0 3.29-1.66 3.29-3.7z" > < /path> < /
                    svg > <
                    /a> < /
                    li > <
                    li >
                    <
                    a href = "https://twitter.com/pickyparrotsnft"
                    class = "theIc" >
                    <
                    svg viewBox = "0 0 35 28"
                    fill = "white"
                    xmlns = "http://www.w3.org/2000/svg"
                    class = "yo50" >
                    <
                    path fill = "white"
                    d = "M10.831 28c12.997 0 20.104-10.771 20.104-20.112 0-.306-.006-.61-.02-.913a14.372 14.372 0 003.525-3.66 14.082 14.082 0 01-4.058 1.112A7.094 7.094 0 0033.49.517a14.17 14.17 0 01-4.486 1.716 7.068 7.068 0 00-12.224 4.834c0 .555.062 1.095.183 1.612-5.873-.295-11.08-3.108-14.565-7.385a7.052 7.052 0 00-.957 3.553 7.064 7.064 0 003.144 5.884 7.01 7.01 0 01-3.2-.884v.09a7.07 7.07 0 005.668 6.929 7.077 7.077 0 01-3.191.121 7.073 7.073 0 006.6 4.91 14.171 14.171 0 01-8.776 3.025A14.34 14.34 0 010 24.824 19.996 19.996 0 0010.831 28" > < /path> < /
                    svg > <
                    /a> < /
                    li > <
                    li >
                    <
                    a href = "https://www.instagram.com/pickyparrotsnft/"
                    class = "theIc" >
                    <
                    svg xmlns = "http://www.w3.org/2000/svg"
                    fill = "white"
                    x = "0px"
                    y = "0px"
                    viewBox = "0 0 24 24"
                    class = "yo50" >
                    <
                    path fill = "white"
                    d = "M 8 3 C 5.2 3 3 5.2 3 8 L 3 16 C 3 18.8 5.2 21 8 21 L 16 21 C 18.8 21 21 18.8 21 16 L 21 8 C 21 5.2 18.8 3 16 3 L 8 3 z M 8 5 L 16 5 C 17.7 5 19 6.3 19 8 L 19 16 C 19 17.7 17.7 19 16 19 L 8 19 C 6.3 19 5 17.7 5 16 L 5 8 C 5 6.3 6.3 5 8 5 z M 17 6 C 16.4 6 16 6.4 16 7 C 16 7.6 16.4 8 17 8 C 17.6 8 18 7.6 18 7 C 18 6.4 17.6 6 17 6 z M 12 7 C 9.2 7 7 9.2 7 12 C 7 14.8 9.2 17 12 17 C 14.8 17 17 14.8 17 12 C 17 9.2 14.8 7 12 7 z M 12 9 C 13.7 9 15 10.3 15 12 C 15 13.7 13.7 15 12 15 C 10.3 15 9 13.7 9 12 C 9 10.3 10.3 9 12 9 z" > < /path> < /
                    svg > <
                    /a> < /
                    li > <
                    li >
                    <
                    a href = "https://opensea.io/collection/pickyparrotsofficial"
                    class = "theIc" >
                    <
                    img src = "../images/opensea.svg"
                    class = "yo51" / >
                    <
                    /a> < /
                    li > <
                    /li> < /
                    ul > <
                    /section> < /
                    aside >

                    <
                    main >
                    <
                    section class = "eVQSwo" >
                    <
                    div class = "yo1" >
                    <
                    div class = "yo" >
                    <
                    img alt = ""
                    aria - hidden = "true"
                    src = "/images/image4.png" / >
                    <
                    /div> < /
                    div > <
                    /section> <
                    div class = "yoyo" >
                    <
                    div class = "styled__Wrap-j4pu8b-1 gxfyuu" >
                    <
                    div class = "wat" >
                    <
                    div color = "black"
                    class = "styled__Wrap-sc-1r9w3ao-2 jSWSNp" >
                    <
                    div class = "yopm" >
                    <
                    Slideshow / >
                    <
                    /div> <
                    div class = "styled__Item-sc-1r9w3ao-0 flhUca hiddene" >
                    <
                    p > Members on Discord < /p> <
                    div class = "styled__CounterWrap-sc-1r9w3ao-1 clZZRW" >
                    <
                    svg width = "24"
                    height = "24"
                    viewBox = "0 0 71 55"
                    fill = "none"
                    xmlns = "http://www.w3.org/2000/svg" >
                    <
                    g clip - path = "url(#clip0)" >
                    <
                    path d = "M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1626 26.2532 30.1066 30.1693C30.1066 34.1136 27.28 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9 23.0133 53.7545 26.2532 53.6986 30.1693C53.6986 34.1136 50.9 37.3253 47.3178 37.3253Z"
                    fill = "white" / >
                    <
                    /g> <
                    defs >
                    <
                    clipPath id = "clip0" >
                    <
                    rect width = "71"
                    height = "55"
                    fill = "white" / >
                    <
                    /clipPath> < /
                    defs > <
                    /svg> <
                    h3 > < span > < CountUpAnimation > 16800 < /CountUpAnimation></span > + < /h3> < /
                    div > <
                    /div> <
                    div class = "styled__Item-sc-1r9w3ao-0 flhUca hiddene" >
                    <
                    p class = "yo232" > Followers on Twitter < /p> <
                    div class = "styled__CounterWrap-sc-1r9w3ao-1 clZZRW" >
                    <
                    svg xmlns = "http://www.w3.org/2000/svg"
                    fill = "white"
                    width = "24"
                    height = "24"
                    viewBox = "0 0 24 24" > < path d = "M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" / > < /svg> <
                    h3 > < span > < CountUpAnimation > 25700 < /CountUpAnimation></span > + < /h3> < /
                    div > <
                    /div> <
                    div class = "styled__Item-sc-1r9w3ao-0 flhUca hiddene" >
                    <
                    p class = "yo232" > Followers on Instagram < /p> <
                    div class = "styled__CounterWrap-sc-1r9w3ao-1 clZZRW" >
                    <
                    svg xmlns = "http://www.w3.org/2000/svg"
                    fill = "white"
                    width = "24"
                    height = "24"
                    viewBox = "0 0 24 24" > < path d = "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" / > < /svg> <
                    h3 > < span > < CountUpAnimation > 20100 < /CountUpAnimation></span > + < /h3> < /
                    div > <
                    /div> < /
                    div > <
                    /div> < /
                    div > <
                    /div> <
                    section id = "about"
                    class = "byszLD" >
                    <
                    article class = "hfMfbP" >
                    <
                    div >
                    <
                    h1 class = "gsCztf" > Welcome to the world of the Picky Parrots! < /h1> <
                    p class = "bIKSMr l-height"
                    class = "yo3" > A massive family of parrots who have been captured by poachers a big part of their lives. < /p> <
                    p class = "bIKSMr l-height" > Since our team of rangers were able to hunt the poachers and arrest them, we now need a safe place
                    for the Picky Parrots family.In order to do this we need all of you to take
                    care of one or multiple Parrots.We created this safe haven inside the Ethereum Blockchain where we can realize the Picky Parrots so they can fly around and live life freely! < br > < /br><br></br >
                    <
                    br > < /br><br></br > < a href = "https://discord.gg/pickyparrotsnft"
                    target = "_blank"
                    class = "bxifui" > Join Our Discord < /a> < /
                    p > <
                    /div> <
                    div >
                    <
                    div class = "yo5" >
                    <
                    div class = "yo6" >
                    <
                    img class = "yo7"
                    alt = ""
                    aria - hidden = "true"
                    src = "/images/image5.png" / >
                    <
                    /div> < /
                    div > <
                    /div> < /
                    article > <
                    /section>

                    <
                    Mint / >

                    <
                    section id = "roadmap"
                    class = "cPykhe" >
                    <
                    article class = "fJrOmp" >
                    <
                    h1 class = "cyTCCG" > Roadmap < /h1> <
                    ul class = "gcWKix" >
                    <
                    li class = "dueVtW" >
                    <
                    div class = "yo9 itXeLG" > 12 '21</div> <
                    div class = "csmXRy" >
                    <
                    h3 class = "yo10" > MINT START < /h3> <
                    p > In December we drop Picky Parrots in the Ethereum Blockchain.Of every sold Parrot 5 % goes to the World Parrot Trust.They save and secure parrots in the real worldfmint < /p> < /
                    div > <
                    /li> {
                    /*<li class="dueVtW">
                                                    <div class="yo11 itXeLG">12'21</div>
                                                    <div class="csmXRy">
                                                        <h3 class="yo12">100K GIVEAWAY</h3>
                                                        <p>On the 31st of December, we announce the winner of $100.000 under the Picky Parrots holder who have 5 or more Picky Parrots NFT's!</p>
                                                    </div>
                                                </li>*/
                } <
                li class = "dueVtW" >
                <
                div class = "yo13 itXeLG" > 01 '22</div> <
            div class = "csmXRy" >
                <
                h3 > SURPRISE AIRDROP < /h3> <
            p > Surprise airdrop to the Picky Parrots holders with 2 or more parrots!For every 2 Picky Parrots in your wallet, you will receive a special gift.The bigger your collection, the more gifts you 'll get!</p> < /
            div > <
                /li> <
            li class = "dueVtW" >
                <
                div class = "yo14 itXeLG" > 02 '22</div> <
            div class = "csmXRy" >
                <
                h3 class = "yo15" > MERCH LAUNCH < /h3> <
            p > Launch of the Picky Parrots merch collection, with the option of having your Picky Parrot NFT printed on the merch. < /p> < /
            div > <
                /li> <
            li class = "dueVtW" >
                <
                div class = "yo16 itXeLG" > 02 '22</div> <
            div class = "csmXRy" >
                <
                h3 class = "yo17" > Picky Parrots Game < /h3> <
            p > Holders can earn NFTs with our Picky Parrots Game!Everyday the top 3 players will get parts of a puzzle which will form a complete NFT.The NFT will be transferred to your wallet at the end of the week! < /p> < /
            div > <
                /li> < /
            ul > <
                /article> < /
            section >

                <
                section id = "team"
            class = "emfBEk" >
                <
                article class = "icAZWS" >
                <
                h1 class = "gnlFyh" > FAQs < /h1> <
            Faq question = { "What is an NFT?" }
            answer = { "An NFT (non-fungible token) is a piece of art that lives on the blockchain. Owning an NFT is just like owning a painting, but instead of owning it physically, you own it virtually, on the blockchain. Picky Parrots is a collection of different NFT's that will live on the Ethereum Blockchain." } > < /Faq> <
            Faq question = { "How can I buy a Picky Parrot NFT?" }
            answer = { "You will be able to mint a Picky Parrot directly on our website <a href='www.pickyparrots.io'>(www.pickyparrots.io)</a>, on the launch date." } > < /Faq> <
            Faq question = { "When is the launch date?" }
            answer = { "The Picky Parrots project will go live on the 21st of December at 15:00 PM EST" } > < /Faq> <
            Faq question = { "How much will it cost to mint a Picky Parrot NFT?" }
            answer = { "Picky Parrots will be minted at 0.08 ETH + gas fees." } > < /Faq> <
            Faq question = { "What is the minimum SPA?" }
            answer = { "This is the minimum resell price we are aiming on secondary market platforms once the mint is over." } > < /Faq> <
            Faq question = { "How can I invite people to the Discord server?" }
            answer = { "You can invite people on your computer and on your mobile device." } > < /Faq> < /
            article > <
                /section>

            <
            section id = "team"
            class = "" >
                <
                article class = "icAZWS" >
                <
                h1 class = "gnlFyh" > Team < /h1> <
            ul class = "hbeApN" >
                <
                li class = "fVrnld" > < a href = "https://www.linkedin.com/in/joeri-visser-84347a161" > < /a> <
            div class = "yo18" >
                <
                div class = "flexable-item"
            class = "yo20" >
                <
                li class = "yo19" >
                <
                a href = "https://www.linkedin.com/in/joeri-visser-84347a161"
            target = "_blank"
            class = "cFpUrE" >
                <
                svg xmlns = "http://www.w3.org/2000/svg"
            width = "22"
            height = "24"
            viewBox = "0 0 24 24" > < path d = "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" / > < /svg> < /
            a > <
                /li> <
            img class = "yo21"
            alt = ""
            aria - hidden = "true"
            src = "/images/PickyParrot50/1.png" / >
                <
                /div> <
            a href = "https://www.linkedin.com/in/joeri-visser-84347a161" > < /a> < /
            div > <
                div class = "bvKQoa" >
                <
                div >
                <
                h4 class = "yo22" > UnknownPanda < /h4> <
            p > founder / artist < /p> < /
            div > <
                /div> < /
            li > <
                li class = "fVrnld" >
                <
                div class = "yo23" >
                <
                li class = "yo24" >
                <
                a href = "https://lk.linkedin.com/in/danukz"
            target = "_blank"
            class = "cFpUrE" >
                <
                svg xmlns = "http://www.w3.org/2000/svg"
            width = "22"
            height = "24"
            viewBox = "0 0 24 24" > < path d = "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" / > < /svg> < /
            a > <
                /li> <
            div class = "yo25" >
                <
                img class = "yo26"
            alt = ""
            aria - hidden = "true"
            src = "/images//PickyParrot50/10.png" / >
                <
                /div> < /
            div > <
                div class = "bvKQoa" >
                <
                div >
                <
                h4 class = "yo27 yo22" > Danukz < /h4> <
            p > Art director < /p> < /
            div > <
                /div> < /
            li > <
                li class = "fVrnld" >
                <
                div class = "yo28" >
                <
                div class = "yo29" >
                <
                img class = "yo30"
            alt = ""
            aria - hidden = "true"
            src = "/images/PickyParrot50/11.png" / >
                <
                /div> < /
            div > <
                div class = "bvKQoa" >
                <
                div >
                <
                h4 class = "yo31 yo22" > Veunex < /h4> <
            p > NFT wizard < /p> < /
            div > <
                /div> < /
            li > <
                li class = "fVrnld" >
                <
                div class = "yo32" >
                <
                div class = "yo33" >
                <
                img class = "yo34"
            alt = ""
            aria - hidden = "true"
            src = "/images/PickyParrot50/12.png" / >
                <
                /div> < /
            div > <
                div class = "bvKQoa" >
                <
                div >
                <
                h4 class = "yo35 yo22" > Enid < /h4> <
            p > parrot Designer < /p> < /
            div > <
                /div> < /
            li > <
                /ul> < /
            article > <
                /section> < /
            main >

                <
                footer class = "bYeQms" >
                <
                footer class = "fMoFan" >
                <
                div class = "easzQW" >
                <
                div class = "f-about" >
                <
                img src = "/images/f-image6.png"
            width = "275" / >
                <
                ul class = "gbysfq" >
                <
                li > < p class = "gaHVYA" > 10 K parrots who flying around in the ethereum blockchain. < /p></li >
                <
                /ul> < /
            div > <
                div class = "yo43" >
                <
                div >
                <
                h4 class = "krCXHQ" > Menu < /h4> <
            ul class = "gbysfq" >
                <
                li > < a href = "#about"
            class = "gaHVYA" > About < /a></li >
                <
                li > < a href = "#mint"
            class = "gaHVYA" > Mint < /a></li >
                <
                li > < a href = "#roadmap"
            class = "gaHVYA" > Roadmap < /a></li >
                <
                li > < a href = "#team"
            class = "gaHVYA" > Team < /a></li >
                <
                /ul> < /
            div > <
                div >
                <
                h4 class = "krCXHQ" > Links < /h4> <
            ul class = "gbysfq" >
                <
                li > < a href = "https://etherscan.io/address/0x27433113B7b2B25E0CC018E0c6eE629A0466683E"
            target = "_blank"
            class = "gaHVYA" > Smart Contract < /a></li >
                <
                li > < a href = "https://opensea.io/collection/pickyparrotsofficial"
            target = "_blank"
            class = "gaHVYA" > Opensea < /a></li >
                <
                li > < a href = "#roadmap"
            class = "gaHVYA" > Terms < /a></li >
                <
                li routerLinkActive = "active" > < a routerLink = "signin"
            class = "gaHVYA" > Signin < /a></li >
                <
                /ul> < /
            div > <
                /div> < /
            div > <
                div class = "easzQW"
            class = "yo44 easzQW" >
                <
                div > < p class = "iwZnub" > Copyright @Picky Parrots 2021. All rights reserved. < /p> </div >
                <
                div >
                <
                ul class = "bPgont f-link" >
                <
                li >
                <
                a href = "https://discord.gg/pickyparrotsnft"
            target = "_blank"
            class = "gaHVYA" >
                <
                svg viewBox = "0 0 37 28"
            fill = "none"
            xmlns = "http://www.w3.org/2000/svg" >
                <
                path d = "M31.218 2.373c4.136 6.096 6.179 12.974 5.415 20.89a.119.119 0 01-.048.085c-3.132 2.306-6.167 3.705-9.16 4.633a.117.117 0 01-.128-.043 24.503 24.503 0 01-1.87-3.049.118.118 0 01.063-.163 18.694 18.694 0 002.858-1.363.118.118 0 00.01-.195 14.574 14.574 0 01-.569-.447.112.112 0 00-.12-.015c-5.923 2.742-12.412 2.742-18.405 0a.114.114 0 00-.119.016c-.183.152-.375.302-.567.446a.118.118 0 00.012.195c.912.524 1.86.986 2.857 1.365a.116.116 0 01.063.161 21.81 21.81 0 01-1.87 3.05.12.12 0 01-.13.042 30.344 30.344 0 01-9.144-4.633.124.124 0 01-.048-.086C-.32 16.414.98 9.48 5.728 2.372a.107.107 0 01.05-.043A30.08 30.08 0 0113.231.012a.118.118 0 01.12.057c.323.573.693 1.309.943 1.91a27.828 27.828 0 018.373 0c.25-.588.606-1.337.928-1.91a.114.114 0 01.12-.057 30.15 30.15 0 017.454 2.317c.02.009.038.023.048.044zm-15.521 13.02c.028-2.024-1.444-3.7-3.292-3.7-1.833 0-3.291 1.661-3.291 3.7 0 2.04 1.487 3.7 3.29 3.7 1.834 0 3.293-1.66 3.293-3.7zm12.169 0c.029-2.024-1.444-3.7-3.291-3.7-1.834 0-3.292 1.661-3.292 3.7 0 2.04 1.487 3.7 3.292 3.7 1.847 0 3.29-1.66 3.29-3.7z" > < /path> < /
            svg > <
                /a> < /
            li > <
                li >
                <
                a href = "https://twitter.com/pickyparrotsnft"
            target = "_blank"
            class = "gaHVYA" >
                <
                svg viewBox = "0 0 35 28"
            xmlns = "http://www.w3.org/2000/svg" >
                <
                path d = "M10.831 28c12.997 0 20.104-10.771 20.104-20.112 0-.306-.006-.61-.02-.913a14.372 14.372 0 003.525-3.66 14.082 14.082 0 01-4.058 1.112A7.094 7.094 0 0033.49.517a14.17 14.17 0 01-4.486 1.716 7.068 7.068 0 00-12.224 4.834c0 .555.062 1.095.183 1.612-5.873-.295-11.08-3.108-14.565-7.385a7.052 7.052 0 00-.957 3.553 7.064 7.064 0 003.144 5.884 7.01 7.01 0 01-3.2-.884v.09a7.07 7.07 0 005.668 6.929 7.077 7.077 0 01-3.191.121 7.073 7.073 0 006.6 4.91 14.171 14.171 0 01-8.776 3.025A14.34 14.34 0 010 24.824 19.996 19.996 0 0010.831 28" > < /path> < /
            svg > <
                /a> < /
            li > <
                li >
                <
                a href = "https://www.instagram.com/pickyparrotsnft/"
            target = "_blank"
            class = "gaHVYA" >
                <
                svg viewBox = "0 0 24 24" >
                <
                path d = "M 8 3 C 5.2 3 3 5.2 3 8 L 3 16 C 3 18.8 5.2 21 8 21 L 16 21 C 18.8 21 21 18.8 21 16 L 21 8 C 21 5.2 18.8 3 16 3 L 8 3 z M 8 5 L 16 5 C 17.7 5 19 6.3 19 8 L 19 16 C 19 17.7 17.7 19 16 19 L 8 19 C 6.3 19 5 17.7 5 16 L 5 8 C 5 6.3 6.3 5 8 5 z M 17 6 C 16.4 6 16 6.4 16 7 C 16 7.6 16.4 8 17 8 C 17.6 8 18 7.6 18 7 C 18 6.4 17.6 6 17 6 z M 12 7 C 9.2 7 7 9.2 7 12 C 7 14.8 9.2 17 12 17 C 14.8 17 17 14.8 17 12 C 17 9.2 14.8 7 12 7 z M 12 9 C 13.7 9 15 10.3 15 12 C 15 13.7 13.7 15 12 15 C 10.3 15 9 13.7 9 12 C 9 10.3 10.3 9 12 9 z" > < /path> < /
            svg > <
                /a> < /
            li > <
                li class = "yo45" >
                <
                a href = "https://opensea.io/collection/pickyparrotsofficial"
            target = "_blank"
            class = "gaHVYA" >
                <
                img src = "../images/opensea.svg"
            width = "30" / >
                <
                /a> < /
            li > <
                /ul> < /
            div > <
                /div> < /
            footer > <
                /footer> < /
            div >
        );
    }
}

export default App;