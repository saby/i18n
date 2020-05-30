import plural from 'I18n/locales/_aspects/Plural/Russian';
import {assert} from 'chai';

describe('plural for russian language', () => {
    it('should return form for singular', () => {
        assert.strictEqual(
            plural(1, 'Язык', 'Языка', 'Языков', 'Языкаааа'),
            'Язык'
        );
    });

    it('should return form for 2-4', () => {
        const pluralNumber = 3;

        assert.strictEqual(
            plural(pluralNumber, 'Язык', 'Языка', 'Языков', 'Языкаааа'),
            'Языка'
        );
    });

    it('should return form for plural', () => {
        const pluralNumber = 15;

        assert.strictEqual(
            plural(pluralNumber, 'Язык', 'Языка', 'Языков', 'Языкаааа'),
            'Языков'
        );
    });

    it('should return form for fractions', () => {
        const pluralNumber = 3.6;

        assert.strictEqual(
            plural(pluralNumber, 'Язык', 'Языка', 'Языков', 'Языкаааа'),
            'Языкаааа'
        );
    });
});
