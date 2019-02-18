export default {
    /**
     * Для английской локали
     * @param num число
     * @param word1 слово для 1
     * @param word2 слово для нескольких
     * @returns {String}
     * @private
     */
    plural: (num, word1, word2, word3, word4) => {

        // если есть дробная часть
        if (num % 1 > 0) {
            return word4;
        }

        // если две последние цифры 11 ... 19
        num = num % 100;
        if (num >= 11 && num <= 19) {
            return word3;
        }

        // все остальные случаи - по последней цифре
        num = num % 10;

        if (num == 1) {
            return word1;
        }

        if (num == 2 || num == 3 || num == 4) {
            return word2;
        }

        return word3;
    }
}
