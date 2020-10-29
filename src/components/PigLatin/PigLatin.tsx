import * as React from 'react';
import { Component } from 'react';

import { Button, Input } from 'antd';

import Translate from './Translate';

interface PigLatinProps {}
interface PigLatinState {
    inputValue: string;
    outputValue: string;
    errors: string[];
}

class PigLatin extends Component<PigLatinProps, PigLatinState> {

    constructor(props: PigLatinProps) {
        super(props);

        this.state = this.initialState();

        this.onValueChange = this.onValueChange.bind(this);
        this.onValueSubmit = this.onValueSubmit.bind(this);
        this.onValueReset = this.onValueReset.bind(this);
    }

    initialState() {
        return {
            inputValue: '',
            outputValue: '',
            errors: [],
        };
    }

    onValueChange(e: any) {
        let value: string = e.target.value;

        this.setState({
            inputValue: value,
        });
        this.validateInput(value);
    }

    validateInput(value: string = ''): boolean {
        let result: boolean = true;
        let errors: string[] = [];
        let inputValue: string;
        if (!value) {
            inputValue = this.state.inputValue;
        } else {
            inputValue = value;
        }

        if (!inputValue) {
            errors.push('Please enter the input value.');
        }
        if (inputValue !== null && inputValue.length > 50) {
            errors.push('The maximum length is 50 characters.');
        }
        if (errors.length > 0) {
            result = false;
        }

        this.setState({
            errors: errors,
        });

        return result;
    }

    onValueSubmit() {
        let translate: string = new Translate(this.state.inputValue).runTranslating();

        if (this.validateInput()) {
            this.setState({
                outputValue: translate,
            });
        }
    }

    onValueReset() {
        this.setState(this.initialState());
    }

    render() {
        let { inputValue, outputValue } = this.state;

        return (
            <div className="container">
                <div className="row">
                    <h2>Pig-Latin Task</h2>
                </div>
                <div className="row">
                    <Input placeholder="Input value" size="large" className="input-value" onChange={(e) => this.onValueChange(e)} value={inputValue} />
                </div>
                <div className="row error">
                    <span>{this.state.errors}</span>
                </div>
                <div className="row">
                    <Button type="primary" onClick={this.onValueSubmit}>Translate</Button>
                    <Button type="default" onClick={this.onValueReset}>Reset</Button>
                </div>
                <div className="row result">
                    <h3>Result of the translation:</h3>
                    <span>{outputValue}</span>
                </div>
            </div>
        );
    }

}

export default PigLatin;