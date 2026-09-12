/**
 * Плюральная функция для английского языка.
 * @author Кудрявцев И.С.
 */
export default (pluralNumber: number, word1: string, word2: string, word3: string): string => {
    if (pluralNumber === 1 || pluralNumber === 0) {
        return word1;
    }

    if (pluralNumber === 2) {
        return word2;
    }

    return word3;
};
