import DateAspect from './_aspects/Date/Arabic';
import NumberAspect from './_aspects/Number/SABY';
import CalendarEntitiesAspect from './_aspects/CalendarEntities/Arabian';
import pluralFunction from './_aspects/Plural/Arabian';
import timeInterval from './_aspects/TimeInterval/Arabian';
import Money from './_aspects/Money/Russia';

import ILocale from '../interfaces/ILocale';
import IDate from '../interfaces/IDate';
import INumber from '../interfaces/INumber';
import ICalendarEntities from '../interfaces/ICalendarEntities';
import ITimeUnits from '../interfaces/ITimeUnits';
import IMoney from '../interfaces/IMoney';
import IEcosystem from '../interfaces/IEcosystem';

/**
 * Конфигурация для арабской(Объединённые Арабские Эмираты) локали.
 * @public
 * @author Кудрявцев И.С.
 */
class ArAe implements ILocale {
    code: string = 'ar-AE';
    directionality: string = 'rtl';
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

export default new ArAe();
