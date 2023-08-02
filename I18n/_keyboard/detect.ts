import Layout from './Layout';

export default function detect(text: string): string {
    let maxMatch = 0;
    let result = '';

    for (const [lang, layout] of Object.entries(Layout.getAll())) {
        let match = 0;

        for (const chart of text) {
            if (layout.includes(chart)) {
                match += 1;
            }
        }

        if (match > maxMatch) {
            maxMatch = match;
            result = lang;
        }
    }

    return result;
}
