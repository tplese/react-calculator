import React, {Component} from 'react';
import './css/style.css';

class Application extends Component {
  constructor(props) {
    super(props);

    this.state = {
      operandShown: '0',
      operandRemembered: '0',
      operator: '=',
      operandToggle: false
    };
  }

  componentDidUpdate(props, state) {
    // Pushes first operand into memory so you can write second operand
    if (this.state.operandToggle && this.state.operandToggle !== state.operandToggle) {
      this.setState({operandRemembered: this.state.operandShown});
    };
  }

  // Writing new operand into the main field
  pushOperand(operand) {
    if (this.state.operandShown === '0' && !this.state.operandToggle) {
      this.setState({operandShown: operand});
    } else if (this.state.operandShown !== '0' && this.state.operandToggle) {
      this.setState({operandShown: operand, operandToggle: false});
    } else {
      this.setState({operandShown: this.state.operandShown + operand});
    };
  }

  // Sets operator (+, -, *, /) for the operation
  pushOperator(operator) {
    if (this.state.operator === '=') {
      this.setState({operator: operator, operandToggle: true});
    } else if (this.state.operator !== '=' && this.state.operandToggle) {
      this.setState({operator: operator});
    } else if (this.state.operator !== '=' && !this.state.operandToggle) {
      this.executeEquation();
      this.setState({operator: operator});
    };
  }

  // When +, ', *, / or = are pushed
  executeEquation() {
    if (this.state.operator === '+') {
      this.setState({operandShown: ((+this.state.operandRemembered) + (+this.state.operandShown)) + ''});
    };

    if (this.state.operator === '-') {
      this.setState({operandShown: ((+this.state.operandRemembered) - (+this.state.operandShown)) + ''});
    };

    if (this.state.operator === '*') {
      this.setState({operandShown: ((+this.state.operandRemembered) * (+this.state.operandShown)) + ''});
    };

    if (this.state.operator === '/') {
      if (this.state.operandShown === '0') {
        this.setState({operandShown: '0'});  
      } else {
        this.setState({operandShown: ((+this.state.operandRemembered) / (+this.state.operandShown)) + ''});
      }
    };

    this.setState({operandToggle: true});
  }

  // Resets calculator to starting state when C pushed
  resetExpression() {
    this.setState({
      operandShown: '0',
      operandRemembered: '0',
      operator: '=',
      operandToggle: false,
    });
  }

  // Deletes last operand when CE is pushed
  lastOperandDelete() {
    this.setState({operandShown: '0'});
  }
  
  // Deletes digits one by one when DEL is pushed
  lastDigitDelete() {
    if ((this.state.operandShown.length === 2 && this.state.operandShown.startsWith('-')) || this.state.operandShown.length === 1) {
      this.setState({operandShown: '0'});
    } else {
      this.setState({operandShown: this.state.operandShown.slice(0, this.state.operandShown.length - 1)});
    };
  }

  // Imediately performed operations on the operand in main field
  pushOperation(operation) {
    if (operation === '1/x') {
      if (this.state.operandShown === '0') {
        this.setState({operandShown: '0'});
      } else {
        this.setState({operandShown: (1 / (+this.state.operandShown)) + ''});
      };
    } else if (operation === 'x^2') {
      this.setState({operandShown: ((+this.state.operandShown) * (+this.state.operandShown)) + ''});
    } else if (operation === 'sqrt') {
      this.setState({operandShown: (Math.sqrt(this.state.operandShown)) + ''});
    } else if (operation === '%') {
      if (this.state.operator === '*' || this.state.operator === '/') {
        this.setState({operandShown: ((+this.state.operandShown) / 100) + ''})
      } else if (this.state.operator === '+' || this.state.operator === '-') {
        this.setState({operandShown: ((+this.state.operandShown) / 100 * this.state.operandRemembered) + ''})
      } else {
        this.setState({operandShown: '0'});
      };
    };
  }

  // Sets operand in main field to positive/negative
  togglePositiveNegative() { 
    if (this.state.operandShown.startsWith('-') && this.state.operandShown !== '0') {
      this.setState({operandShown: this.state.operandShown.slice(1), operandToggle: false});
    } else if (this.state.operandShown !== '0') {
      this.setState({operandShown: '-' + this.state.operandShown, operandToggle: false});
    };
  }


  render() {
    return (
      <div id='application'>
        <div id='expression' class='row'>
          <div id='operandRemembered' class='operands'>
            {(this.state.operator !== '=') ?
              <span>{this.state.operandRemembered} {this.state.operator}</span>
              :
              <span id='hidden'>{this.state.operandRemembered} {this.state.operator}</span>
            }           
          </div>
          <div id='operandShown'  class='operands'>{this.state.operandShown}</div>
        </div>
        
        <div class='row'>
          <button onClick={() => this.pushOperation('%')}>%</button>
          <button onClick={() => this.lastOperandDelete()}>CE</button>
          <button onClick={() => this.resetExpression()}>C</button>
          <button onClick={() => this.lastDigitDelete()}>DEL</button>
        </div>
        <div class='row'>
          <button onClick={() => this.pushOperation('1/x')}>1/x</button>
          <button onClick={() => this.pushOperation('x^2')}>x^2</button>
          <button onClick={() => this.pushOperation('sqrt')}>SQRT</button>
          <button onClick={() => this.pushOperator('/')}>/</button>
        </div>
        <div class='row'>
        <button onClick={() => this.pushOperand('7')}>7</button>
          <button onClick={() => this.pushOperand('8')}>8</button>
          <button onClick={() => this.pushOperand('9')}>9</button>
          <button onClick={() => this.pushOperator('*')}>*</button>
        </div>
        <div class='row'>
          <button onClick={() => this.pushOperand('4')}>4</button>
          <button onClick={() => this.pushOperand('5')}>5</button>
          <button onClick={() => this.pushOperand('6')}>6</button>
          <button onClick={() => this.pushOperator('-')}>-</button>
        </div>
        <div class='row'>
        <button onClick={() => this.pushOperand('1')}>1</button>
          <button onClick={() => this.pushOperand('2')}>2</button>
          <button onClick={() => this.pushOperand('3')}>3</button>
          <button onClick={() => this.pushOperator('+')}>+</button>
        </div>
        <div class='row'>
          <button onClick={() => this.togglePositiveNegative()}>+/-</button>
          <button onClick={() => this.pushOperand('0')}>0</button>
          <button onClick={() => this.pushOperand('.')}>.</button>
          <button onClick={() => this.executeEquation()}>=</button>
        </div>
      </div>
    );
  }

}

export default Application;