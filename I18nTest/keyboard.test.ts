import { changeLayout } from 'I18n/keyboard';

describe('keyboard', () => {
    describe('reverseKeyboardLayout', () => {
        test('should detect current layout', async () => {
            expect(await changeLayout('rjhjyfdbhec', 'ru')).toStrictEqual('коронавирус');
        });

        test('should return current text if detected layout equal current', async () => {
            expect(await changeLayout('rjhjyfdbhec', 'en')).toStrictEqual('rjhjyfdbhec');
        });

        test('current layout be given in arguments', async () => {
            expect(await changeLayout('rjhjyfdbhec', 'ru', 'en')).toStrictEqual('коронавирус');
        });

        test('current layout be not supported', async () => {
            expect(await changeLayout('rjhjyfdbhec', 'ru', 'fr')).toStrictEqual('rjhjyfdbhec');
        });

        test('should change punctuation mark', async () => {
            expect(await changeLayout('rjhjyfdbhec, e[jlb!', 'ru')).toStrictEqual(
                'коронавирусб уходи!'
            );
            expect(await changeLayout('коронавирусб уходи!', 'en')).toStrictEqual(
                'rjhjyfdbhec, e[jlb!'
            );
        });

        test('should change quotation mark', async () => {
            expect(await changeLayout('"rjhjyfdbhec, e[jlb"', 'ru')).toStrictEqual(
                'Экоронавирусб уходиЭ'
            );
            expect(await changeLayout('Экоронавирусб уходиЭ', 'en')).toStrictEqual(
                '"rjhjyfdbhec, e[jlb"'
            );
        });

        test('should return the original value when called again', async () => {
            const ruWord = '"Однако, это успех!"';
            const enWord = "@Jlyfrj? 'nj ecgt[!@";

            expect(await changeLayout(ruWord, 'en')).toStrictEqual(enWord);
            expect(await changeLayout(enWord, 'ru')).toStrictEqual(ruWord);
        });

        test('should return the original value if it is number', async () => {
            expect(await changeLayout('1234', 'en')).toStrictEqual('1234');
            expect(await changeLayout('1234', 'ru')).toStrictEqual('1234');
        });
    });
});
