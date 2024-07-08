import plural from 'I18n/locales/_aspects/Plural/Russian';

describe('plural for russian language', () => {
    test('should return form for singular', () => {
        expect(plural(1, 'Язык', 'Языка', 'Языков', 'Языкаааа')).toStrictEqual('Язык');
    });

    test('should return form for 2-4', () => {
        const pluralNumber = 3;

        expect(plural(pluralNumber, 'Язык', 'Языка', 'Языков', 'Языкаааа')).toStrictEqual('Языка');
    });

    test('should return form for plural', () => {
        const pluralNumber = 15;

        expect(plural(pluralNumber, 'Язык', 'Языка', 'Языков', 'Языкаааа')).toStrictEqual('Языков');
    });

    test('should return form for fractions', () => {
        const pluralNumber = 3.6;

        expect(plural(pluralNumber, 'Язык', 'Языка', 'Языков', 'Языкаааа')).toStrictEqual(
            'Языкаааа'
        );
    });
});
