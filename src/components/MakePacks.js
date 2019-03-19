import React from 'react';

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      result: '',
      size: 10
    };
  }

  makePack = (list, size) => {
    let actualSum = 0;
    let pack = [];
    let sublist = list.slice();
    let ind = 0;
    while (actualSum < size && ind < sublist.length) {
      if (sublist[ind] + actualSum <= size) {
        actualSum += sublist[ind];
        pack.push(sublist[ind]);
        sublist = sublist.slice(0, ind).concat(sublist.slice(ind + 1));
      } else {
        ind += 1;
      }
    }
    return { pack, sublist };
  };

  makePacks = (list, size) => {
    const { pack, sublist } = this.makePack(list, size);
    if (pack.length === 0) {
      return [sublist];
    } else {
      return [pack].concat(this.makePacks(sublist, size));
    }
  };

  onChange = e => {
    const value = e.target.value;
    if (value.match(/^-{0,1}\d+$/)) {
      this.setState({ value });
    }
  };

  onSizeChange = e => {
    const size = e.target.value;
    if (size.match(/^-{0,1}\d+$/)) {
      this.setState({ size });
    }
  };

  onCalculate = () => {
    let list = this.state.value.split('').map(x => parseInt(x));
    let result = this.makePacks(list, this.state.size);
    result = result.map(x => `${x} | `);
    this.setState({ result });
  };

  render() {
    return (
      <div>
        <input type="text" name="val" value={this.state.value} onChange={e => this.onChange(e)} />
        <input type="text" name="size" value={this.state.size} onChange={e => this.onSizeChange(e)} />
        <button onClick={e => this.onCalculate()}>Calculate</button>
        <p>Le résultat est : {this.state.result}</p>
      </div>
    );
  }
}

export default Calculator;
