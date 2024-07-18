import Layout from './Layout';
import detect from './detect';
import { langCode } from 'I18n/interfaces/IAvailableCodes';

const SEPARATOR = /\s/;

/**
 * Проецирует текст введенный в одной раскладке в другую раскладку.
 * @param {String} text - Строка, которую надо преобразовать.
 * @param {String} requiredKeyboardLayout - На какую раскладку надо переключить. Двухсимвольный код языка. Например 'ru' или 'en'.
 * @param {String} [userKeyboardLayout] - В какой раскладке строка передана. Используется для проверки доступности данной языковой раскладки.
 * @returns {String}
 * @public
 * @author Кудрявцев И.С.
 * @example
 * <pre>
 *    await I18n.keyboard.changeLayout('ghbdtn, Fktrc!', 'ru', 'en') => 'привет, Алекс!'
 *    await I18n.keyboard.changeLayout('ghbdtn, Fktrc!', 'ru') => 'привет, Алекс!'
 *    await I18n.keyboard.changeLayout('ghbdtn, Фдуч!', 'ru', 'en') => 'привет, Фдуч!'
 *    await I18n.keyboard.changeLayout('ghbdtn, Фдуч!', 'ru') => 'привет, Фдуч!'
 *    await I18n.keyboard.changeLayout('привет, Alex!', 'ru') => 'привет, Фдуч!'
 * </pre>
 */
function changeLayout(
    text: string,
    requiredKeyboardLayout: langCode,
    userKeyboardLayout?: string
): Promise<string> {
    return new Promise<string>((resolve) => {
        const currentLangText = userKeyboardLayout || detect(text) || requiredKeyboardLayout;

        if (!Layout.has(requiredKeyboardLayout) || !Layout.has(currentLangText)) {
            resolve(text);
        }

        const result = [];
        const words = text.split(SEPARATOR);

        for (const word of words) {
            const currentLangWord = detect(word) || requiredKeyboardLayout;

            if (currentLangWord === requiredKeyboardLayout) {
                result.push(word);

                continue;
            }

            result.push(Layout.change(word, currentLangWord, requiredKeyboardLayout));
        }

        resolve(result.join(' '));
    });
}

export default changeLayout;
