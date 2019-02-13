/// <amd-module name="I18n/_i18n/cutParameterFromURL" />
/**
 * Возращает массив параметров строкой в формате URL, исключая указаный параметр.
 * Пример: '?param1=value1&param2=value2'
 * @param query {Array} Массив параметров запроса.
 * @param deleteParam {String} Имя исключаемого параметра.
 * @returns {String}
 */
export default (query, deleteParam) => {
    if (Object.keys(query).length === 0 || Object.keys(query).length === 1 && query.hasOwnProperty(deleteParam)) {
        return '';
    }

    let result = '?';

    for (const name in query) {
        if (name !== deleteParam) {
            result += name + '=' + query[name] + '&';
        }
    }

    return result.slice(0, result.length - 1);
}
