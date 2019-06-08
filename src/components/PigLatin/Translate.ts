class Translate {

    private inputValue: string = '';
    private inputValueArr: string[] = [];
    private outputValue: string = '';
    private outputValueArr: string[] = [];

    private consonants: string = 'bcdfghjklmnpqrstvwxyz';
    private vowels: string = 'aeiou';

    private punctationInput: string[][] = [[],[]];
    private punctationChars: string[] = ['.', '\''];
    private capitalizationInput: string[] = [];

    constructor(inputValue: string) {
        this.inputValue = inputValue;
    }

    private setCapitalizationInput(inputValueArr: string[]): void {
        inputValueArr.forEach((item, i) => {
            this.capitalizationInput[i] = '';
            for (let j = 0; j < this.getInputValueItem(i).length; j++) {
                let c: string = this.getInputValueItem(i).charAt(j);
                if (c === c.toUpperCase()) {
                    this.capitalizationInput[i] += '1';
                } else if (c === c.toLowerCase()) {
                    this.capitalizationInput[i] += '0';
                }
            }
            this.setInputValueItemLower(inputValueArr[i], i);
        });
    }

    private setPunctationInput(inputValueArr: string[], punctation: number): void {
        inputValueArr.forEach((item, i) => {
            this.punctationInput[punctation][i] = '';
            for (let j = 0; j < this.getInputValueItem(i).length; j++) {
                if (this.getInputValueItem(i).charAt(j) === this.punctationChars[punctation]) {
                    this.punctationInput[punctation][i] += '1';
                } else {
                    this.punctationInput[punctation][i] += '0';
                }
            }
            this.setInputValueItemNoPunctation(inputValueArr[i], i, this.punctationChars[punctation]);
        });

        console.log('punctationInput', this.punctationInput)
    }

    private getCapitalizationInput(i: number) {
        return this.capitalizationInput[i];
    }

    private getPuncationInput(punctation: number, i: number) {
        return this.punctationInput[punctation][i];
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

    private setInputValueItemLower(inputValueArr: string, i: number): void {
        this.inputValueArr[i] = inputValueArr.toLowerCase();
    }

    private setInputValueItemNoPunctation(inputValueArr: string, i: number, punctation: string): void {
        this.inputValueArr[i] = inputValueArr.split(punctation).join('');
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

    private translateCapitalization(i: number): void {
        let result: string = this.getOutputValueItem(i);
        for (let j = 0; j < this.getCapitalizationInput(i).length; j++) {
            if (this.getCapitalizationInput(i).charAt(j) === '1') {
                result = result.slice(0, j) + result.charAt(j).toUpperCase() + result.slice(j+1);
            } else {
                result = result.slice(0, j) + result.charAt(j).toLowerCase() + result.slice(j+1);
            }
        }

        this.setOutputValueItem(result, i);
    }

    private translatePunctuation(i: number, punctation: number): void {
        let result: string = this.getOutputValueItem(i);
        let inputLength: number = this.getPuncationInput(punctation, i).length;
        let outputLength: number = this.getOutputValueItem(i).length;
        let positionFromEnd: number = 0;

        for (let j = 0; j < inputLength; j++) {
            if (this.getPuncationInput(punctation, i).charAt(j) === '1') {
                positionFromEnd = outputLength - inputLength + j + 1;
                result = result.slice(0, positionFromEnd) + this.punctationChars[punctation] + result.slice(positionFromEnd);
            }
        }

        this.setOutputValueItem(result, i);
    }

    /**
     * Main method for translation.
     */
    public runTranslating(): string {
        let inputValueArr: string[] = [];
        let firstChar: string = '';

        // if should be translate more words
        if (this.getInputValue().indexOf('-') > -1) {
            // pocatecni inicializace vstupnich promennych
            inputValueArr = this.getInputValue().split('-');

            // data initialization for translate methods
            this.setInputValueArr(inputValueArr);
            this.setPunctationInput(inputValueArr, 0);
            this.setPunctationInput(inputValueArr, 1);
            this.setCapitalizationInput(inputValueArr);

            if (inputValueArr.length > 0) {
                inputValueArr.forEach((item, i) => {
                    firstChar = this.getInputValueItem(i).substr(0, 1);

                    // here is the beggining of translating
                    this.translateParticularWords(firstChar, i);
                });
            }


        // if should be translated just one word
        } else {
            inputValueArr[0] = this.getInputValue();
            this.setInputValueArr(inputValueArr);

            this.setPunctationInput(inputValueArr, 0);
            this.setPunctationInput(inputValueArr, 1);
            this.setCapitalizationInput(inputValueArr);

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

            // validates punctation
            this.translatePunctuation(i, 0);
            this.translatePunctuation(i, 1);

            // validates the small and big letter
            this.translateCapitalization(i);
        } else {
            this.translateSameResult(i);
        }
    }

}

export default Translate;