const LAST_TWO_DIGITS = 100;
const LAST_DIGIT = 10;
const LEFT_BORDER_THIRD_FORM = 5;

function isFraction(value: number): boolean {
    return value % 1 > 0;
}

function isThirdForm(value: number): boolean {
    const lastDigit = value % LAST_DIGIT;
    const penultimateDigit = Math.floor((value % LAST_TWO_DIGITS) / LAST_DIGIT);

    return penultimateDigit === 1 || lastDigit === 0 || lastDigit >= LEFT_BORDER_THIRD_FORM;
}

function isEndsInOne(value: number): boolean {
    return value % LAST_DIGIT === 1;
}

/**
 * Плюральная функция для русского языка.
 * @author Кудрявцев И.С.
 */
export default (
    pluralNumber: number,
    word1: string,
    word2: string,
    word3: string,
    word4: string
): string => {
    if (isFraction(pluralNumber)) {
        return word4;
    }

    if (isThirdForm(pluralNumber)) {
        return word3;
    }

    if (isEndsInOne(pluralNumber)) {
        return word1;
    }

    return word2;
};
