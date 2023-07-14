import DateAspect from './_aspects/Date/Europe';
import NumberAspect from './_aspects/Number/SABY';
import CalendarEntitiesAspect from './_aspects/CalendarEntities/French';
import pluralFunction from './_aspects/Plural/English';
import timeInterval from './_aspects/TimeInterval/French';
import Money from './_aspects/Money/Russia';

import ILocale from '../interfaces/ILocale';
import IDate from '../interfaces/IDate';
import INumber from '../interfaces/INumber';
import ICalendarEntities from '../interfaces/ICalendarEntities';
import ITimeUnits from '../interfaces/ITimeUnits';
import IMoney from '../interfaces/IMoney';
import IEcosystem from '../interfaces/IEcosystem';

/**
 * Конфигурация для французской локали.
 * @public
 * @author Кудрявцев И.С.
 */
class FrFr implements ILocale {
    code: string = 'fr-FR';
    directionality: string = 'ltr';
    ecosystem: IEcosystem = {
        name: 'SABY',
    };
    date: IDate = new DateAspect();
    number: INumber = new NumberAspect();
    money: IMoney = new Money();
    calendarEntities: ICalendarEntities = new CalendarEntitiesAspect();
    timeInterval: (interval: ITimeUnits, short: boolean) => string = timeInterval;
    plural: (pluralNumber: number, ...words: string[]) => string = pluralFunction;
}

export default new FrFr();
