class Translate {

    private inputValue: string = '';
    private inputValueArr: string[] = [];
    private outputValue: string = '';
    private outputValueArr: string[] = [];

    private consonants: string = 'bcdfghjklmnpqrstvwxyz';
    private vowels: string = 'aeiou';

    private punctuationInput: boolean[][] = [[], []];
    private capitalizationInput: boolean[][] = [[],[]];

    constructor(inputValue: string) {
        this.inputValue = inputValue;
    }

    private setPunctationInput(inputValueArr: string[]): void {
        let testedChar: string = '.';

        // apostrof

        // tecka
        inputValueArr.forEach((item, i) => {
            for (let j = 0; j < this.getInputValueItem(i).length; j++) {
                if (this.getInputValueItem(i).indexOf(testedChar)) {
                    this.punctuationInput[i][j] = true;
                } else {
                    this.punctuationInput[i][j] = false;
                }
            }
        });

        console.log('punctationInput', this.punctuationInput);
    }

    private setCapitalizationInput(inputValueArr: string[]): void {
        inputValueArr.forEach((item, i) => {
            for (let j = 0; j < this.getInputValueItem(i).length; j++) {
                let c: string = this.getInputValueItem(i).charAt(j);
                if (c === c.toUpperCase()) {
                    this.capitalizationInput[i][j] = true;
                } else if (c === c.toLowerCase()) {
                    this.capitalizationInput[i][j] = false;
                }
            }
            this.setInputValueItem(inputValueArr[i], i);
        });
    }

    private getCapitalizationInput(i: number) {
        return this.capitalizationInput[i];
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

    private getOutputValueItem(i: number): string {
        return this.outputValueArr[i];
    }

    private setOutputValue() {
        if (this.getOutputValueArr()) {
            this.outputValue = this.getOutputValueArr().join('-');
        }
    }

    private setInputValueArr(inputValueArr: string[]) {
        this.inputValueArr = inputValueArr;
    }

    private setInputValueItem(inputValueArr: string, i: number): void {
        this.inputValueArr[i] = inputValueArr.toLowerCase();
    }

    private setOutputValueItem(inputValue: string, i: number): void {
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
        this.setOutputValueItem(result, i);
    }

    private traslateForVowel(i: number): void {
        let result: string = '';
        result = this.getInputValueItem(i) + 'way';
        this.setOutputValueItem(result, i);
    }

    private translateSameResult(i: number): void {
        this.setOutputValueItem(this.getInputValueItem(i), i);
    }

    private translatePunctuation(i: number): void {
        let result: string = '';
        let punctuationPosition: number = this.getInputValueItem(i).indexOf('\'');
    }

    private translateCapitalization(i: number): void {
        let result: string = this.getOutputValueItem(i);
        this.getCapitalizationInput(i).forEach((item, j) => {
            if (item === true) {
                result = result.slice(0, j) + result.charAt(j).toUpperCase() + result.slice(j+1);
            } else {
                result = result.slice(0, j) + result.charAt(j).toLowerCase() + result.slice(j+1);
            }
        });

        this.setOutputValueItem(result, i);
    }

    public runTranslating(): string {
        let inputValueArr: string[] = [];
        let firstChar: string = '';

        // pokud je to spojene z vice slov
        if (this.getInputValue().indexOf('-') > -1) {
            // pocatecni inicializace vstupnich promennych
            inputValueArr = this.getInputValue().split('-');
            // s timto se pracuje dale v prekladovych metodach
            this.setInputValueArr(inputValueArr);

            this.setCapitalizationInput(inputValueArr);
            this.setPunctationInput(inputValueArr);

            if (inputValueArr.length > 0) {
                inputValueArr.forEach((item, i) => {
                    firstChar = this.getInputValueItem(i).substr(0, 1);

                    // tady zacinam prekladat
                    this.translateParticularWords(firstChar, i);
                });
            }

        // pokud prekladam jen 1 slovo
        } else {
            inputValueArr[0] = this.getInputValue();
            this.setInputValueArr(inputValueArr);

            this.setCapitalizationInput(inputValueArr);
            this.setPunctationInput(inputValueArr);

            firstChar = this.getInputValueItem(0).substr(0, 1);

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
            // zkontroluje velka a mala pismena
            this.translateCapitalization(i);
            // zkontroluje interpunkci
            // this.translatePunctuation(i);
        } else {
            this.translateSameResult(i);
        }
    }

}

export default Translate;