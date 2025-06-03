import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCode, FaExchangeAlt, FaTimes } from 'react-icons/fa';
import { SiSolidity, SiJavascript, SiReact, SiTypescript } from 'react-icons/si';

interface CodeSnippet {
  id: string;
  language: string;
  title: string;
  code: string;
  icon: React.ReactNode;
  color: string;
  description: string;
}


const codeSnippets: CodeSnippet[] = [
  {
    id: 'smart-contract',
    language: 'solidity',
    title: 'NFT Smart Contract',
    icon: <SiSolidity />,
    color: 'text-blue-400',
    description: 'An ERC-721 NFT contract with custom minting and royalty functions',
    code: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract thisNTF is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    
    // Royalty info
    mapping(uint256 => uint256) private _royaltyPercentage;
    mapping(uint256 => address) private _royaltyReceiver;
    
    event NFTMinted(uint256 tokenId, address creator, string tokenURI);

    constructor() ERC721("thisNFT", "tNFT") {}
    
    function mintNFT(
        address recipient,
        string memory tokenURI,
        uint256 royaltyPercentage
    ) public returns (uint256) {
        require(royaltyPercentage <= 10, "Royalty too high");
        
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);
        
        // Set royalty info
        _royaltyPercentage[newItemId] = royaltyPercentage;
        _royaltyReceiver[newItemId] = recipient;
        
        emit NFTMinted(newItemId, recipient, tokenURI);
        
        return newItemId;
    }
    
    function getRoyaltyInfo(uint256 tokenId, uint256 salePrice) 
        external 
        view 
        returns (address receiver, uint256 royaltyAmount) 
    {
        royaltyAmount = (salePrice * _royaltyPercentage[tokenId]) / 100;
        return (_royaltyReceiver[tokenId], royaltyAmount);
    }
}`
  },
  {
    id: 'ethers-integration',
    language: 'javascript',
    title: 'Ethers.js Integration',
    icon: <SiJavascript />,
    color: 'text-yellow-400',
    description: 'Connecting to a smart contract and executing transactions with Ethers.js',
    code: `import { ethers } from "ethers";

// Contract ABI and address
const contractABI = [
  "function mintNFT(address recipient, string memory tokenURI, uint256 royaltyPercentage) public returns (uint256)",
  "function getRoyaltyInfo(uint256 tokenId, uint256 salePrice) external view returns (address receiver, uint256 royaltyAmount)",
  "event NFTMinted(uint256 tokenId, address creator, string tokenURI)"
];
const contractAddress = "0x123...abc";

// Connect to provider and contract
async function connectToContract() {
  if (typeof window.ethereum !== "undefined") {
    try {
      // Connect to the user's wallet (MetaMask)
      await window.ethereum.request({ method: "eth_requestAccounts" });
      
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      
      console.log("Connected to contract:", contractAddress);
      return { provider, signer, contract };
    } catch (error) {
      console.error("Error connecting to contract:", error);
    }
  }
}

// Mint an NFT
async function mintNFT(recipientAddress, tokenURI, royaltyPercentage) {
  const { contract } = await connectToContract();
  
  try {
    const tx = await contract.mintNFT(
      recipientAddress,
      tokenURI,
      royaltyPercentage
    );
    
    // Wait for transaction to be mined
    const receipt = await tx.wait();
    
    // Get the event from the transaction receipt
    const mintEvent = receipt.events.find(event => event.event === "NFTMinted");
    const { tokenId, creator } = mintEvent.args;
    
    console.log("NFT Minted! TokenID:", tokenId.toString());
    return tokenId;
  } catch (error) {
    console.error("Error minting NFT:", error);
    throw error;
  }
}`
  },
  {
    id: 'react-dapp',
    language: 'jsx',
    title: 'React DApp Component',
    icon: <SiReact />,
    color: 'text-blue-400',
    description: 'React component for a decentralized application interface',
    code: `import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import contractABI from './contractABI.json';

const NFTMinter = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState('');
  const [contract, setContract] = useState(null);
  const [tokenURI, setTokenURI] = useState('');
  const [royalty, setRoyalty] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const [mintedId, setMintedId] = useState(null);
  
  const contractAddress = "0x123...abc";
  
  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);
  
  const checkIfWalletIsConnected = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          setIsConnected(true);
          setupContract();
        }
      } catch (error) {
        console.error("Error checking wallet connection:", error);
      }
    }
  };
  
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
        setIsConnected(true);
        setupContract();
      } catch (error) {
        console.error("Error connecting wallet:", error);
      }
    } else {
      alert("Please install MetaMask to use this application.");
    }
  };
  
  const setupContract = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const nftContract = new ethers.Contract(contractAddress, contractABI, signer);
    setContract(nftContract);
  };
  
  const handleMint = async (e) => {
    e.preventDefault();
    
    if (!contract || !tokenURI) return;
    
    setIsLoading(true);
    
    try {
      const tx = await contract.mintNFT(account, tokenURI, royalty);
      const receipt = await tx.wait();
      
      const mintEvent = receipt.events.find(event => event.event === "NFTMinted");
      const tokenId = mintEvent.args.tokenId.toString();
      
      setMintedId(tokenId);
      setIsLoading(false);
      setTokenURI('');
    } catch (error) {
      console.error("Error minting NFT:", error);
      setIsLoading(false);
    }
  };
  
  return (
    <div className="nft-minter">
      <h2>NFT Minter</h2>
      
      {!isConnected ? (
        <button onClick={connectWallet}>Connect Wallet</button>
      ) : (
        <form onSubmit={handleMint}>
          <div className="form-group">
            <label>Token URI (IPFS or URL)</label>
            <input 
              type="text" 
              value={tokenURI} 
              onChange={(e) => setTokenURI(e.target.value)} 
              placeholder="ipfs://..."
              required
            />
          </div>
          
          <div className="form-group">
            <label>Royalty Percentage (0-10%)</label>
            <input 
              type="range" 
              min="0" 
              max="10"
              value={royalty} 
              onChange={(e) => setRoyalty(parseInt(e.target.value))} 
            />
            <span>{royalty}%</span>
          </div>
          
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Minting..." : "Mint NFT"}
          </button>
          
          {mintedId && (
            <div className="success-message">
              NFT minted successfully! Token ID: {mintedId}
            </div>
          )}
        </form>
      )}
    </div>
  );
};

export default NFTMinter;`
  },
  {
    id: 'typescript-dex',
    language: 'typescript',
    title: 'TypeScript DEX Interface',
    icon: <SiTypescript />,
    color: 'text-blue-500',
    description: 'TypeScript interfaces for a decentralized exchange',
    code: `import { BigNumber } from 'ethers';

// Token interface
export interface Token {
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  logoURI?: string;
}

// Pool interface
export interface Pool {
  id: string;
  token0: Token;
  token1: Token;
  reserve0: BigNumber;
  reserve1: BigNumber;
  totalSupply: BigNumber;
  fee: number;
}

// Swap parameters
export interface SwapParams {
  tokenIn: string;
  tokenOut: string;
  amountIn: BigNumber;
  slippageTolerance: number; // in percentage (e.g., 0.5 for 0.5%)
  deadline: number; // timestamp
  recipient: string;
}

// Service for interacting with DEX
export class DexService {
  private provider: any;
  private routerContract: any;
  private factoryContract: any;
  
  constructor(provider: any, routerAddress: string, factoryAddress: string) {
    this.provider = provider;
    // Initialize contracts here
  }
  
  // Get token price in USD
  async getTokenPrice(tokenAddress: string): Promise<number> {
    // Implementation
    return 0;
  }
  
  // Get all available pools
  async getPools(): Promise<Pool[]> {
    // Implementation
    return [];
  }
  
  // Calculate amount out based on amount in
  async getAmountOut(
    amountIn: BigNumber,
    tokenIn: string,
    tokenOut: string
  ): Promise<{
    amountOut: BigNumber;
    path: string[];
    priceImpact: number;
  }> {
    // Implementation
    return {
      amountOut: BigNumber.from(0),
      path: [tokenIn, tokenOut],
      priceImpact: 0
    };
  }
  
  // Execute a swap
  async swap(params: SwapParams): Promise<{
    transactionHash: string;
    amountOut: BigNumber;
  }> {
    const {
      tokenIn,
      tokenOut,
      amountIn,
      slippageTolerance,
      deadline,
      recipient
    } = params;
    
    // Calculate minimum amount out based on slippage
    const { amountOut, path } = await this.getAmountOut(
      amountIn,
      tokenIn,
      tokenOut
    );
    
    const slippageFactor = 10000 - Math.floor(slippageTolerance * 100);
    const minAmountOut = amountOut.mul(slippageFactor).div(10000);
    
    // Execute swap
    try {
      // Implementation
      return {
        transactionHash: "0x...",
        amountOut: BigNumber.from(0)
      };
    } catch (error) {
      console.error("Swap failed:", error);
      throw error;
    }
  }
}`
  }
];

const CodeSnippetsButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSnippet, setActiveSnippet] = useState<CodeSnippet>(codeSnippets[0]);
  const [isTyping, setIsTyping] = useState(true);
  const [visibleCode, setVisibleCode] = useState('');
  const [typingSpeed, setTypingSpeed] = useState(5);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  useEffect(() => {
    if (!isOpen) return;
    setIsTyping(true);
    setVisibleCode('');
    
    
    let currentPosition = 0;
    const code = activeSnippet.code;
    
    const typingInterval = setInterval(() => {
      if (currentPosition < code.length) {const newPosition = Math.min(currentPosition + typingSpeed, code.length);
        setVisibleCode(code.substring(0, newPosition));
        currentPosition = newPosition;
      } else {
        setIsTyping(false);
        clearInterval(typingInterval);
      }
    }, 30);
    
    return () => clearInterval(typingInterval);
  }, [activeSnippet, typingSpeed]);

    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (isOpen && !target.closest('.snippet-container') && !target.closest('.snippet-button')) {
          setIsOpen(false);
        }
      };
  
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

  return (
    <>
      <motion.button
        className="fixed right-0 top-1/2 transform -translate-y-1/2 bg-teal-500 hover:bg-teal-600 text-white p-3 rounded-l-lg shadow-lg z-50 snippet-button"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ x: -5 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaCode className="text-xl" />
        <span className="sr-only">Code Snippets</span>
      </motion.button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed right-0 top-20 h-full bg-neutral-900/95 backdrop-blur-lg z-40 overflow-y-auto w-full rounded-xl md:w-3/4 lg:w-2/3 xl:w-1/2 shadow-2xl snippet-container"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                  <FaCode className="text-teal-400" />
                  Code Snippets
                </h3>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full bg-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-700 transition-colors"
                >
                  <FaTimes />
                </button>
              </div>
              
             <div className="flex flex-row overflow-x-auto mb-6 gap-3 xl:justify-center">
                {codeSnippets.map((snippet) => (
                  <button
                    key={snippet.id}
                    onClick={() => setActiveSnippet(snippet)}
                    className={`sm:w-[12rem] p-4 rounded-xl transition-all flex flex-shrink-0 items-center gap-3 ${
                      activeSnippet.id === snippet.id
                        ? 'bg-gradient-to-r from-teal-500/20 to-blue-500/20 border border-teal-500/30'
                        : 'glass-panel hover:border-teal-500/20'
                    }`}
                  >
                    <div className={`text-2xl ${snippet.color}`}>
                      {snippet.icon}
                    </div>
                    <div className="text-left hidden sm:block">
                      <div className={`font-medium ${activeSnippet.id === snippet.id ? 'text-teal-400' : 'text-white'}`}>
                        {snippet.title}
                      </div>
                      <div className="text-xs text-neutral-400">
                        {snippet.language}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              
              <motion.div 
                className="glass-panel p-4 rounded-xl overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center justify-between mb-4 p-2 border-b border-neutral-800">
                  <div className="flex items-center gap-3">
                    <div className={`text-xl ${activeSnippet.color}`}>
                      {activeSnippet.icon}
                    </div>
                    <div>
                      <h4 className="font-medium text-white">{activeSnippet.title}</h4>
                      <p className="text-sm text-neutral-400">{activeSnippet.description}</p>
                    </div>
                  </div>
                  <div className="hidden sm:flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="absolute left-0 top-0 bottom-0 w-12 bg-neutral-900/50 text-neutral-600 text-xs text-right select-none pr-2">
                    {visibleCode.split('\n').map((_, index) => (
                      <div key={index} className="leading-loose">
                        {index + 1}
                      </div>
                    ))}
                  </div>
                  
                  <pre className="p-4 pl-16 overflow-x-auto text-sm leading-loose">
                    <code className={`language-${activeSnippet.language}`}>
                      {visibleCode}
                    </code>
                  </pre>
                  
                  {isTyping && (
                    <div className="absolute right-4 bottom-4 flex items-center gap-2 text-teal-400 text-sm">
                      <span className="animate-pulse">Typing</span>
                      <span className="inline-block w-2 h-4 bg-teal-400 animate-blink"></span>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center justify-between mt-4 p-2 border-t border-neutral-800 text-xs text-neutral-500">
                  <div>
                    {activeSnippet.language.toUpperCase()}
                  </div>
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => setTypingSpeed(Math.max(1, typingSpeed - 2))}
                      className="text-neutral-400 hover:text-teal-400 transition-colors"
                      disabled={typingSpeed <= 1}
                    >
                      Slower
                    </button>
                    <button 
                      onClick={() => setTypingSpeed(typingSpeed + 2)}
                      className="text-neutral-400 hover:text-teal-400 transition-colors"
                    >
                      Faster
                    </button>
                    <button 
                      onClick={() => {
                        setIsTyping(false);
                        setVisibleCode(activeSnippet.code);
                      }}
                      className="text-neutral-400 hover:text-teal-400 transition-colors"
                    >
                      Skip
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CodeSnippetsButton;