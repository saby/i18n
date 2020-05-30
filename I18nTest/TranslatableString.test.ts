import TranslatableString from 'I18n/_i18n/TranslatableString';
import Translator from 'I18n/_i18n/Translator';
import Controller from 'I18n/_i18n/Controller';
import * as sinon from 'sinon';
import {assert} from 'chai';

describe('TranslatableString', () => {
    const context = {
        'en-US': {
            Замок: 'Castle'
        },
        'fr-FR': {
            Замок: 'Château'
        }
    };

    const localeConfigEN = {
        code: 'en-US'
    };
    const localeConfigFR = {
        code: 'fr-FR'
    };

    const controller = new Controller({});
    const translator = new Translator(context, controller);
    const translatableString = new TranslatableString({
        key: 'Замок'
    }, translator);

    let stubCurrentLocaleConfig;

    beforeEach(() => {
        stubCurrentLocaleConfig = sinon.stub(controller, 'currentLocaleConfig');

        stubCurrentLocaleConfig.get(() => localeConfigEN);
    });

    afterEach(() => {
        stubCurrentLocaleConfig.restore();

        stubCurrentLocaleConfig = undefined;
    });

    it('should translated key from en-US', () => {
        assert.equal(translatableString.toString(), 'Castle');
    });

    it('should translated key from fr-FR', () => {
        stubCurrentLocaleConfig.get(() => localeConfigFR);

        assert.equal(translatableString.toString(), 'Château');
    });

    it('toJSON should return translated key', () => {
        assert.equal(translatableString.toJSON(), 'Castle');
    });

    it('valueOf should return translated key', () => {
        assert.equal(translatableString.valueOf(), 'Castle');
    });
});
