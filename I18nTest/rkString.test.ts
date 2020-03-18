import {assert} from 'chai';
import RkString from 'I18n/_i18n/RkString';

describe('RkString', () => {
    it('RkString', () => {
        const rkString = new RkString('Английский', () => 'English');

        assert.equal(rkString.valueOf(), 'English');
        assert.equal(rkString.toString(), 'English');
        assert.equal(rkString.toJSON(), 'English');
        assert.equal(rkString.length, 7);
    });
});
