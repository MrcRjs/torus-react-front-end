import React from 'react'
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

  render() {
    return (
      <div className="App">
        <div>
          { this.state.startButton === true ? <button onClick={this.enableTorus}>Start using Torus</button> : false }
        </div>
        <div>
          {/* <button onClick={this.enableTorus}>Enable Torus</button> */}
          <div>MaxBID: { this.state.maxBid } </div>
          <div>Account: {this.state.account}</div>
          <div>Balance: {this.state.balance}</div>
          <input type={"number"} value={ this.state.bid } placeholder={"Bid"}/>
          <button onClick={()=> {
            console.log("POST " );
          }} >BID NOW</button>
        </div>
      </div>
    )
  }
}

export default App
