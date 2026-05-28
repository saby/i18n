import plural from 'I18n/locales/_aspects/Plural/English';

describe('plural for english language', () => {
    test('should return form for singular', () => {
        expect(plural(1, 'Language', 'Languages')).toStrictEqual('Language');
    });

    test('should return form plural', () => {
        const pluralNumber = 15;

        expect(plural(pluralNumber, 'Language', 'Languages')).toStrictEqual('Languages');
    });
});
