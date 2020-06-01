import Store from 'I18n/_i18n/Store';
import {assert} from 'chai';

describe('Store', () => {
    let store;

    beforeEach(() => {
        store = new Store<string>(['first'], (key: string) => Promise.resolve(key));
    });

    afterEach(() => {
        store = undefined;
    });

    it('should return value asynchronous', () => {
        return store.get('first').then((value) => {
            assert.strictEqual(value, 'first');
        });
    });

    it('should return value synchronous', () => {
        store.set('second', 'second');

        assert.strictEqual(store.get('second', true), 'second');
    });

    it('should delete loading from queue if value loaded', () => {
        store.set('second');

        store.get('second').then(() => {
            store.get('second').then((value) => {
                assert.strictEqual(value, 'second');
            });
        });
    });
});
