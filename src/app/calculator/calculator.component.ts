import { Component } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.scss'
})
export class CalculatorComponent {
  input: string = '';
  result: string = '';

  pressNum(num: string) {
    if (num == '.') {
      if (this.input != '') {
        const lastNum = this.getLastOperand(this.input)
        console.log(lastNum.lastIndexOf('.'))

        if (lastNum.lastIndexOf('.') >= 0) return;
      }
    }

    if (num == '0') {
      if (this.input == '') return;
      const prevKey = this.input[this.input.length - 1];
      if (prevKey === '/' || prevKey === '*' || prevKey === '+' || prevKey === '-') return;
    }

    this.input = this.input + num;
    this.calculateAnswer();
  }

  getLastOperand(op: string):string {
    const lastKey = this.input[this.input.length - 1];
    if (lastKey === '/' || lastKey === '*' || lastKey === '+' || lastKey === '-') return '';
    this.input = this.input + op;
    this.calculateAnswer();
    return this.input
  }

  pressOperator(op: string) {
    if (this.input == '') return;

    const lastKey = this.input[this.input.length - 1];
    if (lastKey === '/' || lastKey === '*' || lastKey === '+' || lastKey === '-') {
      this.input = this.input.substring(0, this.input.length - 1);
    }
    this.input = this.input + op;
    this.calculateAnswer();
  }

  clear() {
    if(this.input != '') {
      this.input = this.input.substring(0, this.input.length - 1);
    }
  }

  allClear() {
    this.input = '';
    this.result = '';
  }

  calculateAnswer() {
    let formula = this.input;
    let lastKey = formula[formula.length - 1];

    if (lastKey === '.') {
      formula = formula.substring(0, formula.length - 1);
    }

    lastKey = formula[formula.length - 1];
    if (lastKey === '/' || lastKey === '*' || lastKey === '+' || lastKey === '-') {
      formula = formula.substring(0, formula.length - 1);
    }
    console.log(formula);
    this.result = eval(formula);
  }

  getAnswer() {
    this.calculateAnswer();
    this.input = this.result;
    if(this.input == '0') this.input = '';
  }
}