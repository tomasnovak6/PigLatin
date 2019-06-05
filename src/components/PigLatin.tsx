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
        this.getFirstChar();
    }

    // hlavni metoda, ktera ten cely preklad spousti
    getFirstChar() {
        let inputValue = this.state.inputValue.toLowerCase();
        let firstChar = inputValue.substr(0, 1);

        if (this.shouldBeChanged()) {
            if (this.getConsonants().indexOf(firstChar) > -1) {
                this.setConsonant();
            } else if (this.getVowels().indexOf(firstChar) > -1) {
                this.setVowel();
            }
        } else {
            this.setSameResult();
        }
    }

    // getter pro souhlasky
    getConsonants(): string {
        return this.consonants;
    }

    // getter pro samohlasky
    getVowels(): string {
        return this.vowels;
    }

    // setter pro souhlasky
    setConsonant(): void {
        let { inputValue } = this.state;
        let result: string = '';
        result = inputValue.substr(1, inputValue.length) + inputValue.substr(0, 1) + 'ay';
        result = result.charAt(0).toUpperCase() + result.slice(1);

        this.setState({
            outputValue: result,
        });
    }

    // setter pro samohlasky
    setVowel(): void {
        let { inputValue } = this.state;
        let result: string = '';
        result = inputValue + 'way';

        this.setState({
            outputValue: result,
        });
    }

    setSameResult(): void {
        this.setState({
            outputValue: this.state.inputValue,
        });
    }

    shouldBeChanged(): boolean {
        let result: boolean = true;
        let { inputValue } = this.state;

        if (inputValue.endsWith('way')) {
            result = false;
        }

        return result;
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
                    <input type="submit" onClick={this.onValueSubmit} value="Submit" />
                </div>
                <div className="row"><span className="font-weight-bold">Result:</span> {outputValue}</div>
            </div>
        );
    }

}

export default PigLatin;