import Store from 'I18n/_i18n/Store';

describe('Store', () => {
    let store;

    beforeEach(() => {
        store = new Store<string>(['first'], (key: string) => {
            return Promise.resolve(key);
        });
    });

    afterEach(() => {
        store = undefined;
    });

    test('should return value asynchronous', () => {
        return store.get('first').then((value) => {
            expect(value).toStrictEqual('first');
        });
    });

    test('should return value synchronous', () => {
        store.set('second', 'second');

        expect(store.get('second', true)).toStrictEqual('second');
    });

    test('should delete loading from queue if value loaded', () => {
        store.set('second');

        store.get('second').then(() => {
            store.get('second').then((value) => {
                expect(value).toStrictEqual('second');
            });
        });
    });
});
