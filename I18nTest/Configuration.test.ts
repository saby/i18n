import {assert} from 'chai';
import * as sinon from 'sinon';
import Configuration from 'I18n/_i18n/Configuration';
import {cookie} from 'Env/Env';

describe('Configuration', () => {

    const getRequest = (acceptLanguage) => {
        return {
            headers: {
                'accept-language': acceptLanguage
            }
        }
    };
    let stub;

    beforeEach(function() {
        stub = sinon.stub(cookie, 'get');
        stub.returns('en-US');
    });

    afterEach(() => {
        stub.restore();
        stub = undefined;
    });

    it('load', function() {
        assert.equal(Configuration.load(), 'en-US');

        stub.returns(null);
        assert.equal(Configuration.load(), '');

        stub.returns('en');
        assert.equal(Configuration.load(), 'en-US');
    });

    it('isSet', () => {
        assert.equal(Configuration.isSet(), true);

        stub.returns(null);
        assert.equal(Configuration.isSet(), false);
    });

    describe('detect', () => {
        const fullAvailableLang = {
            'en-US': 'FFF',
            'en-GB': 'FFF',
            'ru-RU': 'hhh',
            'en': 'FFF',
            'ru': 'hhh'
        };
        const AvailableLangRU = {
            'ru-RU': 'hhh',
            'ru': 'hhh'
        };

        it('accept-language do have a priority locale', () => {
            const request = getRequest('en-US,en;q=0.9,ru;q=0.8,ru-RU;q=0.7');

            assert.equal(Configuration.detect(request, fullAvailableLang), 'en-US');
            assert.equal(Configuration.detect(request, AvailableLangRU), 'ru-RU');
        });

        it('accept-language do have a priority lang', () => {
            const request = getRequest('en,ru;q=0.9,en-US;q=0.8,ru-RU;q=0.7');

            assert.equal(Configuration.detect(request, fullAvailableLang), 'en-US');
            assert.equal(Configuration.detect(request, AvailableLangRU), 'ru-RU');
        });

        it('accept-language do not have available language', () => {
            const request = getRequest('fr,fr-FR;q=0.9');

            assert.equal(Configuration.detect(request, fullAvailableLang), '');
        });
    });
});
