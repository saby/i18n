import ICalendarEntities from '../../../interfaces/ICalendarEntities';

const months = [
    '一月',
    '二月',
    '三月',
    '四月',
    '五月',
    '六月',
    '七月',
    '八月',
    '九月',
    '十月',
    '十一月',
    '十二月',
];

const days = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];

const quarters = ['第一季度', '第二季度', '第三季度', '第四季度'];

/**
 * Описание констант календарных значений для китайского языка.
 * @public
 * @author Кудрявцев И.С.
 */
export default class Chinese implements ICalendarEntities {
    minDays: string[] = days;
    shortDays: string[] = days;
    longDays: string[] = days;
    shortMonths: string[] = months;
    shortGenitiveMonths: string[] = months;
    shortLocativeMonths: string[] = months;
    longMonths: string[] = months;
    longGenitiveMonths: string[] = months;
    longLocativeMonths: string[] = months;
    am: string = 'дп';
    pm: string = 'пп';
    minHalfYear: string = '$digit$s$ 半年';
    longHalfYear: string = '$digit$s$ 半年';
    longHalfYears: string[] = ['上半年', '下半年'];
    shortHalfYears: string[] = ['上半年', '下半年'];
    minQuarter: string = '第$digit$s$ 季度';
    shortQuarter: string = '第$digit$s$ 季度';
    longQuarter: string = '第$digit$s$ 季度';
    manyQuarter: string = '第$digit$s$ 季度';
    quarters: string[] = ['一', '二', '三', '四'];
    longQuarters: string[] = quarters;
    shortQuarters: string[] = quarters;
    minQuarters: string[] = quarters;
    today: string = '今天';
    allPeriod: string = '整个期间';
    openFinishPeriod: string = '从 $digit$s$';
    openStartPeriod: string = '到 $digit$s$';
}
