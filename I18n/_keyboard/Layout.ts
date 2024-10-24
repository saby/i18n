import type { langCode } from './../interfaces/IAvailableCodes';

const layouts: { [name in langCode]?: string } = {
    ru: 'йцукенгшщзхъфывапролджэячсмитьбю.ЙЦУКЕНГШЩЗХЪФЫВАПРОЛДЖЭЯЧСМИТЬБЮ,"№;:?',
    en: 'qwertyuiop[]asdfghjkl;\'zxcvbnm,./QWERTYUIOP{}ASDFGHJKL:"ZXCVBNM<>?@#$^&',
};

export default class Layout {
    static get(name: langCode): string | undefined {
        return layouts[name];
    }

    static has(name: string): boolean {
        return layouts.hasOwnProperty(name);
    }

    static getAll(): { [name in langCode]?: string } {
        return layouts;
    }

    static change(text: string, from: langCode, to: langCode) {
        const result = [];
        const currentLayouts = layouts[from];
        const targetLayouts = layouts[to];

        if (!(currentLayouts && targetLayouts)) {
            return text;
        }

        for (const chart of text) {
            const indexChart = currentLayouts.indexOf(chart);

            if (indexChart !== -1) {
                result.push(targetLayouts[indexChart]);
            } else {
                result.push(chart);
            }
        }

        return result.join('');
    }
}
