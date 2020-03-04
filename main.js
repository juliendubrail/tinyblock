const SHA256 = require('crypto-js/sha256');

class Block{
    constructor(index,timestamp,data,previousHash=''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash(){
        return SHA256(this.index + this.timestamp + this.previousHash + JSON.stringify(this.data)).toString();
    }
}

class BlockChain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock(){
        return new Block(0,'01/01/2017','Genesis',0);
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    isChainValid(){
        for (let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const lastBlockIndex = i-1;
            const previousBlock = this.chain[lastBlockIndex];
  
            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
        }
        return true;
    }
}

let moonCoin = new BlockChain();

console.log('Mining block 1');
moonCoin.addBlock(new Block(1, '01/02/2017', { amount: 4}));

console.log('Mining block 2');
moonCoin.addBlock(new Block(2,  '02/02/2017', {amount: 8}));
moonCoin.addBlock(new Block(3,  '04/02/2017', {amount: 16}));

//console.log(JSON.stringify(moonCoin,null,4));

console.log("is chain valid", moonCoin.isChainValid());

moonCoin.chain[1].data = { amount : 60000};

console.log("is chain valid", moonCoin.isChainValid());