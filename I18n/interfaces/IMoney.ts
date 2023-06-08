import { langCode } from './IAvailableCodes';

export interface IMoneyEntities {
    currency: string[];
    shortCurrency: string,
    superShortCurrency: string,
    subunit: string[],
    shortSubunit: string,
    superShortSubunit: string
}

type MoneyByLang = {
    [nameLang in langCode]: IMoneyEntities;
};

export default interface IMoney extends MoneyByLang {
    symbol: string;
}


