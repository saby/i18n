export interface IDictionary {
    [key: string]: string;
}

export default interface IContext {
    [localeCode: string]: IDictionary;
}
