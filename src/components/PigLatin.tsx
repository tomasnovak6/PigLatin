import * as React from 'react';
import { Component } from 'react';

interface PigLatinProps {

}

interface PigLatinState {
    inputValue: string;
    outputValue: string;
}

class PigLatin extends Component<PigLatinProps, PigLatinState> {

    private consonants: string = 'bcdfghjklmnpqrstvwxyz';
    private vowels: string = 'aeiou';

    constructor(props: PigLatinProps) {
        super(props);

        this.state = this.initialState();

        this.onValueChange = this.onValueChange.bind(this);
        this.onValueSubmit = this.onValueSubmit.bind(this);
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
        console.log('submit');
    }

    getFirstChar() {
        let { inputValue } = this.state;
        let firstChar = inputValue.substr(0, 1);

        if (this.getConsonants().indexOf(firstChar) > -1) {
            this.setConsonant();
        } else if (this.getVowels().indexOf(firstChar) > -1) {
            this.setVowel();
        } else {
            console.log('neni to nic z toho');
        }
    }

    getConsonants(): string {
        return this.consonants;
    }

    getVowels(): string {
        return this.vowels;
    }

    setConsonant() {

    }

    setVowel() {

    }

    render() {
        let { inputValue, outputValue } = this.state;

        console.log('state', this.state);

        return (
            <div className="container">
                <div className="row">
                    <h1>Pig-Latin Component</h1>
                </div>
                <div className="row">
                    <input type="text" onChange={(e) => this.onValueChange(e)} defaultValue={inputValue} />
                    <input type="submit" onClick={this.onValueSubmit} value="Submit" />
                </div>
                <div className="row"><span className="font-weight-bold">Result:</span> {outputValue}</div>
            </div>
        );
    }

}

export default PigLatin;