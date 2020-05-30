import plural from 'I18n/locales/_aspects/Plural/English';
import {assert} from 'chai';

describe('plural for english language', () => {
    it('should return form for singular', () => {
        assert.strictEqual(
            plural(1, 'Language', 'Languages'),
            'Language'
        );
    });

    it('should return form plural', () => {
        const pluralNumber = 15;

        assert.strictEqual(
            plural(pluralNumber, 'Language', 'Languages'),
            'Languages'
        );
    });
});
