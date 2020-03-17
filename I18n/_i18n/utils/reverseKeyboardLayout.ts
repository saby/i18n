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

function reverseKeyboardLayout(text: string, requiredKeyboardLayout: string, currentKBLayout?: string): string {
   currentKBLayout = currentKBLayout || _detectKBLayout(text, requiredKeyboardLayout);

   if (!(currentKBLayout && layouts.hasOwnProperty(currentKBLayout))) {
      return text;
   }

   let result = '';

   for (const chart of text) {
      const indexChart = layouts[currentKBLayout].indexOf(chart);

      if (indexChart !== -1) {
         result += layouts[requiredKeyboardLayout][indexChart];
      } else {
         result += chart;
      }
   }

   return result;
}

export default reverseKeyboardLayout;
