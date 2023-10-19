const layouts = {
    ru: 'йцукенгшщзхъфывапролджэячсмитьбю.ЙЦУКЕНГШЩЗХЪФЫВАПРОЛДЖЭЯЧСМИТЬБЮ,"№;:?',
    en: 'qwertyuiop[]asdfghjkl;\'zxcvbnm,./QWERTYUIOP{}ASDFGHJKL:"ZXCVBNM<>?@#$^&',
};

export default class Layout {
    static get(name) {
        return layouts[name];
    }

    static has(name) {
        return layouts.hasOwnProperty(name);
    }

    static getAll() {
        return layouts;
    }

    static change(text, from, to) {
        const result = [];

        for (const chart of text) {
            const indexChart = layouts[from].indexOf(chart);

            if (indexChart !== -1) {
                result.push(layouts[to][indexChart]);
            } else {
                result.push(chart);
            }
        }

        return result.join('');
    }
}
