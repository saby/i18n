export default (pluralNumber: number, word1: string, word2: string, word3: string, word4: string): string => {

    // если есть дробная часть
    if (pluralNumber % 1 > 0) {
        return word4;
    }

    // если две последние цифры 11 ... 19
    pluralNumber = pluralNumber % 100;
    if (pluralNumber >= 11 && pluralNumber <= 19) {
        return word3;
    }

    // все остальные случаи - по последней цифре
    pluralNumber = pluralNumber % 10;

    if (pluralNumber === 1) {
        return word1;
    }

    if (pluralNumber === 2 || pluralNumber === 3 || pluralNumber === 4) {
        return word2;
    }

    return word3;
};
