class Translate {

    private inputValue: string = '';
    private outputValue: string = '';

    private consonants: string = 'bcdfghjklmnpqrstvwxyz';
    private vowels: string = 'aeiou';

    constructor(inputValue: string) {
        this.inputValue = inputValue;
    }

    private getInputValue(): string {
        return this.inputValue;
    }

    public getOutputValue(): string {
        return this.outputValue;
    }

    private setOutputValue(inputValue: string): void {
        this.outputValue = inputValue;
    }

    private getConsonants(): string {
        return this.consonants;
    }

    private getVowels(): string {
        return this.vowels;
    }

    private shouldBeChanged(): boolean {
        let result: boolean = true;

        if (this.getInputValue().endsWith('way')) {
            result = false;
        }

        return result;
    }

    private translateForConsonant(): void {
        let result: string = '';
        result = this.getInputValue().substr(1, this.getInputValue().length) + this.getInputValue().substr(0, 1) + 'ay';
        result = result.charAt(0).toUpperCase() + result.slice(1);
        this.setOutputValue(result);
    }

    private traslateForVowel(): void {
        let result: string = '';
        result = this.getInputValue() + 'way';
        this.setOutputValue(result);
    }

    private translateSameResult(): void {
        this.setOutputValue(this.getInputValue());
    }

    private translatePunctuation(): void {
        let result: string = '';
        let punctuationPosition: number = this.getInputValue().indexOf('\'');
    }

    private translateHyphens(): void {

    }

    private translateCapitalization(): void {

    }

    public runTranslating(): string {
        let inputValue: string = this.getInputValue().toLowerCase();
        let firstChar: string = inputValue.substr(0, 1);
        let result: string = '';

        if (this.shouldBeChanged()) {
            if (this.getConsonants().indexOf(firstChar) > -1) {
                this.translateForConsonant();
            } else if (this.getVowels().indexOf(firstChar) > -1) {
                this.traslateForVowel();
            }
            // this.translatePunctuation();
        } else {
            this.translateSameResult();
        }

        return this.getOutputValue();
    }

}

export default Translate;