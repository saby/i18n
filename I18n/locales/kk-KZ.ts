import DateAspect from './_aspects/Date/Russia';
import NumberAspect from './_aspects/Number/SABY';
import CalendarEntitiesAspect from './_aspects/CalendarEntities/Kazakh';
import pluralFunction from './_aspects/Plural/Kazakh';
import timeInterval from './_aspects/TimeInterval/Kazakh';
import Money from './_aspects/Money/Kazakhstan';

import ILocale from '../interfaces/ILocale';
import IDate from '../interfaces/IDate';
import INumber from '../interfaces/INumber';
import ICalendarEntities from '../interfaces/ICalendarEntities';
import ITimeUnits from '../interfaces/ITimeUnits';
import IMoney from '../interfaces/IMoney';
import IEcosystem from '../interfaces/IEcosystem';

/**
 * Конфигурация для казахской локали.
 * @public
 * @author Кудрявцев И.С.
 */
class KkKz implements ILocale {
    code: string = 'kk-KZ';
    directionality: string = 'ltr';
    ecosystem: IEcosystem = {
        name: 'Setty',
    };
    date: IDate = new DateAspect();
    number: INumber = new NumberAspect();
    money: IMoney = new Money();
    calendarEntities: ICalendarEntities = new CalendarEntitiesAspect();
    timeInterval: (interval: ITimeUnits, short: boolean) => string = timeInterval;
    plural: (pluralNumber: number, ...words: string[]) => string = pluralFunction;
}

export default new KkKz();
