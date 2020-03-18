import * as keyboard from 'I18n/_i18n/keyboard'
import {assert} from 'chai';

describe('keyboard', () => {
    describe('reverseKeyboardLayout', () => {
        it('detect current layout', async () => {
            assert.strictEqual(await keyboard.changeLayout('rjhjyfdbhec', 'ru'), 'коронавирус');
        });

        it('current layout be given in arguments', async () => {
            assert.strictEqual(await keyboard.changeLayout('rjhjyfdbhec', 'ru', 'en'), 'коронавирус');
        });

        it('current layout be not supported', async () => {
            assert.strictEqual(await keyboard.changeLayout('rjhjyfdbhec', 'ru', 'fr'), 'rjhjyfdbhec');
        });
    });
});
