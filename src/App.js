import React from 'react'
import TruffleContract from "@truffle/contract";
import Biding from './contracts/Bidding.json';
import secp256k1 from "@aztec/secp256k1";
import web3Obj from './helper'

class App extends React.Component {
  state = {
    maxBid: 100,
    bid: 0,
    startButton: true,
    account: '',
    balance: ''
  };

  componentDidMount() {
    const isTorus = sessionStorage.getItem('pageUsingTorus');

    if (isTorus) {
      this.setState({ startButton: false},
        () => web3Obj.initialize().then(() => {
          this.setStateInfo()
        })
      )
    }
  }

  setStateInfo = () => {
    // TODO: Handle current maxbid value
    web3Obj.web3.eth.getAccounts().then(accounts => {
      this.setState({ account: accounts[0] });
      web3Obj.web3.eth.getBalance(accounts[0]).then(balance => {
        this.setState({ balance: (balance/(1e18)), bid: this.state.maxBid * 1.1 }) // Balance is wei
      })
    })
  };

  enableTorus = async () => {
    try {
      await web3Obj.initialize();
      this.setStateInfo()
    } catch (error) {
      console.error(error)
    }
  };

  handleBid = async () => {
    //0x60cd6638b6578d0bced19e5d8673d15a8d3a148136e914ea442b1cc9fd0970a2
    console.log(web3Obj);
    const BiddingContract = TruffleContract(Biding);
    BiddingContract.setProvider(web3Obj.web3.currentProvider);
    //const biddingContract = await BiddingContract.new();

    const { public_key } = secp256k1.accountFromPrivateKey(
      '0x60cd6638b6578d0bced19e5d8673d15a8d3a148136e914ea442b1cc9fd0970a2'
    );
    console.log({ public_key })
  }

  render() {
    return (
      <div className="App">
        <div>
          { this.state.startButton === true ? <button onClick={this.enableTorus}>Start using Torus</button> : false }
        </div>
        <ul>
          {/* <button onClick={this.enableTorus}>Enable Torus</button> */}
          <li>MaxBID: { this.state.maxBid }</li>
          <li>Account: {this.state.account}</li>
          <li>Balance: {this.state.balance}</li>
          <input type={"number"} value={ this.state.bid } placeholder={"Bid"}/>
          <button onClick={ this.handleBid } >BID NOW</button>
        </ul>
      </div>
    )
  }
}

export default App
