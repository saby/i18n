import Store from 'I18n/_i18n/Store';

describe('Store', () => {
    let store: Store<string, string>;

    beforeEach(() => {
        store = new Store<string, string>(
            ['first'],
            (key: string) => {
                return Promise.resolve(key);
            },
            () => {}
        );
    });

    test('should return value asynchronous', () => {
        return store.get('first').then((value) => {
            expect(value).toStrictEqual('first');
        });
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
