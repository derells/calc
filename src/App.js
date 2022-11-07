import React, { Component } from "react";
import Button from "./components/Button";
import "./css/stylee.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      current: "0",
      previous: [],
      nextIsReset: false,
    };
  }

  reset = () => {
    this.setState({ current: "0", previous: [], nextIsReset: false });
  };

  addToCurrent = (symbol) => {
    if (["/", "-", "+", "*"].indexOf(symbol) > -1) {
      let { previous } = this.state;
      previous.push(this.state.current + symbol);
      this.setState({ previous, nextIsReset: true });
    } else {
      if (
        (this.state.current === "0" && symbol !== ".") ||
        this.state.nextIsReset
      ) {
        this.setState({ current: symbol, nextIsReset: false });
      }
      this.setState({ current: this.state.current + symbol });
    }
  };

  calculate = (symbol) => {
    let { current, previous, nextIsReset } = this.state;
    if (previous.length > 0) {
      current = eval(String(previous[previous.length - 1] + current));
      this.setState({ current, previous, nextIsReset: true });
    }
  };

  render() {
    const buttons = [
      { Symbol: "C", cols: 3, action: this.reset },
      { Symbol: "/", cols: 1, action: this.addToCurrent },
      { Symbol: "7", cols: 1, action: this.addToCurrent },
      { Symbol: "8", cols: 1, action: this.addToCurrent },
      { Symbol: "9", cols: 1, action: this.addToCurrent },
      { Symbol: "*", cols: 1, action: this.addToCurrent },
      { Symbol: "4", cols: 1, action: this.addToCurrent },
      { Symbol: "5", cols: 1, action: this.addToCurrent },
      { Symbol: "6", cols: 1, action: this.addToCurrent },
      { Symbol: "-", cols: 1, action: this.addToCurrent },
      { Symbol: "1", cols: 1, action: this.addToCurrent },
      { Symbol: "2", cols: 1, action: this.addToCurrent },
      { Symbol: "3", cols: 1, action: this.addToCurrent },
      { Symbol: "+", cols: 1, action: this.addToCurrent },
      { Symbol: "0", cols: 2, action: this.addToCurrent },
      { Symbol: ".", cols: 1, action: this.addToCurrent },
      { Symbol: "=", cols: 1, action: this.calculate },
    ];
    return (
      <div className="App">
        {this.state.previous.length > 0 ? (
          <div className="floaty-last">
            {this.state.previous[this.state.previous.length - 1]}
          </div>
        ) : null}
        <input className="result" type="text" value={this.state.current} />

        {buttons.map((btn, i) => {
          return (
            <Button
              key={i}
              symbol={btn.Symbol}
              cols={btn.cols}
              action={(symbol) => btn.action(symbol)}
            />
          );
        })}
      </div>
    );
  }
}

export default App;
