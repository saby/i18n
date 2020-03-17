import * as utils from 'I18n/_i18n/utils'
import {assert} from 'chai';

describe('utils', () => {
    describe('reverseKeyboardLayout', () => {
        it('detect current layout', () => {
            assert.strictEqual(utils.reverseKeyboardLayout('rjhjyjdbhec', 'ru'), 'короновирус');
        });

        it('current layout be given in arguments', () => {
            assert.strictEqual(utils.reverseKeyboardLayout('rjhjyjdbhec', 'ru', 'en'), 'короновирус');
        });

        it('current layout be not supported', () => {
            assert.strictEqual(utils.reverseKeyboardLayout('rjhjyjdbhec', 'ru', 'fr'), 'rjhjyjdbhec');
        });
    });
});
