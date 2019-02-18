export default {
    plural: (num, word1, word2) => {

    if (num > 1 || num === 0) {
        return word2;
    }

    return word1;
}
}
