/**
 * Плюральная функция для английского языка.
 * @author Кудрявцев И.С.
 */
export default (pluralNumber: number, word1: string, word2: string): string => {
    if (pluralNumber > 1 || pluralNumber === 0) {
        return word2;
    }

    return word1;
};
