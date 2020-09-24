import React, { Component } from 'react'

export default class App extends Component {

  
  constructor(props) {
    super(props)
  
    this.state = {
      display: "0",
       equation: "",
    }
    this.numInput = this.numInput.bind(this);
    this.operInput = this.operInput.bind(this);
    this.decInput = this.decInput.bind(this);
    this.clearInput = this.clearInput.bind(this);
    this.calculate = this.calculate.bind(this);
  }

  numInput(e){
    if(this.state.equation.match(/[0-9]/) && !this.state.equation.includes("=")){
    if(this.state.equation.match(/[+\-*]/) == null){
      let val = this.state.equation + e.currentTarget.value;
      this.setState({
        display : val,
        equation : val,
      });
    } else {
      this.setState({
        display : this.state.display + e.currentTarget.value,
        equation : this.state.equation + e.currentTarget.value,
      });
    }
    }else if (this.state.equation.match(/[+\-*]/)){
      let val = this.state.equation + e.currentTarget.value;
      this.setState({
        display: e.currentTarget.value,
        equation: val
      });
    } else if (this.state.display === "0" && e.currentTarget.value !== this.state.equation.match("=")){
      this.setState({
        display: e.currentTarget.value,
        equation: e.currentTarget.value,
      });
    }
  }

  operInput(e){
    if(this.state.equation.includes("=")){
      let val = this.state.equation;
      val += e.currentTarget.value;
      this.setState({
        equation: val,
      });
    } else {
    if (this.state.equation !== "" && this.state.equation.match(/[*\-+]$/) == null){
      let val = this.state.equation;
      val += e.currentTarget.value;
      this.setState({
        equation: val,
      });
    } else if(this.state.equation.match(/[*\-+]$/) !== null) {
      let val = this.state.equation;
      val = val.substring(0, (val.length - 1));
      val += e.currentTarget.value;
      this.setState({
        equation: val,
      });
    }
    }
  }

  decInput(e){
    if(this.state.equation === "" || this.state.equation.includes("=")){
      let val = '.'
      this.setState({
        display: val,
        equation: val
      });
    } else if(this.state.equation.match(/[+\-*]$/)){
      let val = '.';
      this.setState({
        display: val,
        equation: this.state.equation + val
      });
    } else if(!this.state.display.includes(".")){
      this.setState({
        display: this.state.display + e.currentTarget.value,
        equation: this.state.equation + e.currentTarget.value
      });
    } 
  }

  clearInput(){
    this.setState({
      display: "0",
      equation: ""
    });
  }

  calculate(){
    if(this.state.equation.includes("=")){
      let val = `${this.state.display} = ${this.state.display}`;
      this.setState({
        equation: val
      });
    } else if(this.state.equation !== "" && this.state.equation.match(/[+\-*]$/) !== null && this.state.equation.match(/[+\-*]$/) == null) { 
      let result = Number.isInteger(eval(this.state.equation)) ? eval(this.state.equation) : parseFloat(eval(this.state.equation).toFixed(5));
      let val = this.state.equation;
      val += ` = ${result}`;
      this.setState({
        display: result,
        equation: val,
      });
    }
  }


  render() {
    return <React.Fragment>
      <div>
        <h2 className="bg-primary text-center text-white p-2">Simple Calculator</h2>
      </div>

      <div className="form-group m-2 p-2">
        <input className="form-control m-2 p-2" value={this.state.display || this.state.equation} autoFocus={true}/>
      </div>
          <table>
            <table>
            <tr>
                <td>
                    <button className="btn btn-danger  m-2" value="7" onClick={this.numInput}>7</button>
                </td>
                
                <td>
                    <button className="btn btn-danger  m-2" value="8" onClick={this.numInput}>8</button>
                </td>
        
                <td>
                    <button className="btn btn-danger  m-2" value="9" onClick={this.numInput}>9</button>
                </td>
                <td>
                    <button className="btn btn-secondary  m-2" value ="+" onClick={this.operInput}>+</button>
                </td>
                <td>
                    <button className="btn btn-secondary  m-2" value="-" onClick={this.operInput}>-</button>
                </td>
            </tr>
        </table>

        <table>
            <tr>
                <td>
                    <button className="btn btn-danger  m-2" value="4" onClick={this.numInput}>4</button>
                </td>
                <td>
                    <button className="btn btn-danger  m-2" value="5" onClick={this.numInput}>5</button>
                </td>
                <td>
                    <button className="btn btn-danger  m-2" value="6" onClick={this.numInput}>6 </button>
                </td>
                <td>
                  <button className="btn btn-secondary m-2" value="/" onClick={this.operInput}>/</button>
                </td>
                <td>
                    <button className="btn btn-secondary  m-2" value="*" onClick={this.operInput}>*</button>
                </td>
            </tr>
        </table>

        <table>
            <tr>
                <td>
                    <button className="btn btn-danger  m-2" value="1" onClick={this.numInput}>1</button>
                </td>
                <td>
                    <button className="btn btn-danger  m-2" value="2" onClick={this.numInput}>2</button>
                </td>
                <td>
                    <button className="btn btn-danger  m-2" value="3" onClick={this.numInput}>3</button>
                </td>
                <td>
                    <button className="btn btn-secondary  m-2" value="." onClick={this.decInput}>.</button>
                </td>
                <td>
                    <button className="btn btn-secondary m-2" value="=" onClick={this.calculate}>=</button>
                </td>
            </tr>
            </table>

            <table>
                <tr>
                    <td>
                        <button className="btn btn-danger center m-2" value="0" onClick={this.numInput}>0</button>
                    </td>
                    <td>
                        <button className="btn btn-danger m-2" value="" onClick={this.clearInput}>Clear</button>
                    </td>
                </tr>
            </table>
        </table>
    </React.Fragment>
  }
}