import * as React from 'react';
import { Component } from 'react';

import Translate from './Translate';

interface PigLatinProps {

}

interface PigLatinState {
    inputValue: string;
    outputValue: string;
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
        };
    }

    onValueChange(e: any) {
        let value: string = e.target.value;

        this.setState({
            inputValue: value,
        });
    }

    onValueSubmit() {
        let translate = new Translate(this.state.inputValue);

        // tady jeste pridat validaci
        this.setState({
            outputValue: translate.outputValue,
        });
    }

    onValueReset() {
        this.setState(this.initialState());
    }

    render() {
        let { inputValue, outputValue } = this.state;

        return (
            <div className="container">
                <div className="row">
                    <h1>Pig-Latin Component</h1>
                </div>
                <div className="row">
                    <input type="text" onChange={(e) => this.onValueChange(e)} defaultValue={inputValue} />
                </div>
                <div className="row">
                    <input type="submit" onClick={this.onValueSubmit} value="Submit" />
                    <input type="button" onClick={this.onValueReset} value="Reset" />
                </div>
                <div className="row"><span className="font-weight-bold">Result on the translation:</span> {outputValue}</div>
            </div>
        );
    }

}

export default PigLatin;