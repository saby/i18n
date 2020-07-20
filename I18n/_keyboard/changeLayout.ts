// TODO Когда будем переходить на аспекты, убрать хардкод и подключать нужные аспекты раскладки динамически.
const layouts = {
   en: 'qwertyuiop[]asdfghjkl;\'zxcvbnm,./QWERTYUIOP{}ASDFGHJKL:"ZXCVBNM<>?',
   ru: 'йцукенгшщзхъфывапролджэячсмитьбю.ЙЦУКЕНГШЩЗХЪФЫВАПРОЛДЖЭЯЧСМИТЬБЮ,'
};

function _detectKBLayout(text: string, exclude: string = ''): string {
   let maxMatch = 0;
   let result = '';

   for (const layout in layouts) {
      if (exclude !== layout) {
         let match = 0;

         for (const chart of text) {
            if (layouts[layout].includes(chart)) {
               match += 1;
            }
         }

         if (match > maxMatch) {
            maxMatch = match;
            result = layout;
         }
      }
   }

   return result;
}

/**
 * Проецирует текст введенный в одной раскладке в другую раскладку.
 * @param {String} text - Строка, которую надо преобразовать.
 * @param {String} requiredKeyboardLayout - На какую раскладку надо переключить. Двухсимвольный код языка. Например 'ru' или 'en'.
 * @param {String} [currentKBLayout] - В какой раскладке строка передана. Двухсимвольный код языка. Например 'ru' или 'en'. Если не передан сработает автоопределение.
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
function changeLayout(text: string, requiredKeyboardLayout: string, currentKBLayout?: string): Promise<string> {
   return new Promise<string>((resolve) => {
      const detectedKBLayout = currentKBLayout || _detectKBLayout(text, requiredKeyboardLayout);

      if (!(detectedKBLayout && layouts.hasOwnProperty(detectedKBLayout))) {
         resolve(text);
      }

      let result = '';

      for (const chart of text) {
         const indexChart = layouts[detectedKBLayout].indexOf(chart);

         if (indexChart !== -1) {
            result += layouts[requiredKeyboardLayout][indexChart];
         } else {
            result += chart;
         }
      }

      resolve(result);
   });
}

export default changeLayout;
