class Translate {

    private inputValue: string = '';
    private inputValueArr: string[] = [];
    private outputValue: string = '';
    private outputValueArr: string[] = [];

    private consonants: string = 'bcdfghjklmnpqrstvwxyz';
    private vowels: string = 'aeiou';

    constructor(inputValue: string) {
        this.inputValue = inputValue;
    }

    private getInputValue(): string {
        return this.inputValue;
    }

    private getInputValueArr(): string[] {
        return this.inputValueArr;
    }

    private getInputValueItem(i: number): string {
        return this.inputValueArr[i];
    }

    private getOutputValue(): string {
        return this.outputValue;
    }

    private getOutputValueArr(): string[] {
        return this.outputValueArr;
    }

    private setOutputValue() {
        if (this.getOutputValueArr()) {
            this.outputValue = this.getOutputValueArr().join('-');
        }
    }

    private setInputValueArr(inputValueArr: string[]) {
        this.inputValueArr = inputValueArr;
    }

    private setOutputValueArr(inputValue: string, i: number): void {
        this.outputValueArr[i] = inputValue;
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

    private translateForConsonant(i: number): void {
        let result: string = '';
        result = this.getInputValueItem(i).substr(1, this.getInputValueItem(i).length) + this.getInputValueItem(i).substr(0, 1) + 'ay';
        result = result.charAt(0).toUpperCase() + result.slice(1);
        this.setOutputValueArr(result, i);
    }

    private traslateForVowel(i: number): void {
        let result: string = '';
        result = this.getInputValueItem(i) + 'way';
        this.setOutputValueArr(result, i);
    }

    private translateSameResult(i: number): void {
        this.setOutputValueArr(this.getInputValueItem(i), i);
    }

    private translatePunctuation(i: number): void {
        let result: string = '';
        let punctuationPosition: number = this.getInputValueItem(i).indexOf('\'');
    }
    
    private translateCapitalization(i: number): void {

    }

    public runTranslating(): string {
        let inputValueArr: string[] = [];

        // pokud je to spojene z vice slov
        if (this.getInputValue().indexOf('-') > -1) {
            // pocatecni inicializace vstupnich promennych
            inputValueArr = this.getInputValue().split('-');
            // s timto se pracuje dale v prekladovych metodach
            this.setInputValueArr(inputValueArr);

            if (inputValueArr.length > 0) {
                for (let i = 0; i < inputValueArr.length; i++) {
                    let inputValue: string = this.getInputValueItem(i).toLowerCase();
                    let firstChar: string = this.getInputValueItem(i).substr(0, 1);

                    // tady zacinam predkladat
                    this.translateParticularWords(firstChar, i);
                }
            }

        // pokud prekladam jen 1 slovo
        } else {
            inputValueArr[0] = this.getInputValue();
            this.setInputValueArr(inputValueArr);

            let firstChar: string = this.getInputValueItem(0).substr(0, 1);

            this.translateParticularWords(firstChar, 0);
        }

        this.setOutputValue();

        return this.getOutputValue();
    }

    private translateParticularWords(firstChar: string, i: number): void {
        if (this.shouldBeChanged()) {
            if (this.getConsonants().indexOf(firstChar) > -1) {
                this.translateForConsonant(i);
            } else if (this.getVowels().indexOf(firstChar) > -1) {
                this.traslateForVowel(i);
            }
            // zkontroluje interpunkci
            this.translatePunctuation(i);
            // zkontroluje velka a mala pismena
            this.translateCapitalization(i);
        } else {
            this.translateSameResult(i);
        }
    }

}

export default Translate;