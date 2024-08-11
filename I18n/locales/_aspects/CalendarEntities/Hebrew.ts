import ICalendarEntities from '../../../interfaces/ICalendarEntities';

/**
 * Описание констант календарных значений для иврита.
 * @public
 * @author Кудрявцев И.С.
 */
export default class Hebrew implements ICalendarEntities {
    minDays: string[] = ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ש'];
    shortDays: string[] = ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ש'];
    longDays: string[] = [
        'יוֹם רִאשוֹן',
        'יוֹם שֵנִי',
        'יוֹם שלִישִי',
        'יוֹם רְבִיעִי',
        'יוֹם חֲמִישִי',
        'יוֹם שִישִי',
        'שַבָּת',
    ];
    shortMonths: string[] = [
        'יָנוּאַר',
        'פֶבּרוּאַר',
        'מֶרץ',
        'אַפּרִיל',
        'מַאי',
        'יוּנִי',
        'יוּלִי',
        'אוֹגוּסט',
        'סֶפּטֶמבֶּר',
        'אוֹקטוֹבֶּר',
        'נוֹבֶמבֶּר',
        'דֶצֶמבֶּר',
    ];
    shortGenitiveMonths: string[] = [
        'יָנוּאַר',
        'פֶבּרוּאַר',
        'מֶרץ',
        'אַפּרִיל',
        'מַאי',
        'יוּנִי',
        'יוּלִי',
        'אוֹגוּסט',
        'סֶפּטֶמבֶּר',
        'אוֹקטוֹבֶּר',
        'נוֹבֶמבֶּר',
        'דֶצֶמבֶּר',
    ];
    shortLocativeMonths: string[] = [
        'יָנוּאַר',
        'פֶבּרוּאַר',
        'מֶרץ',
        'אַפּרִיל',
        'מַאי',
        'יוּנִי',
        'יוּלִי',
        'אוֹגוּסט',
        'סֶפּטֶמבֶּר',
        'אוֹקטוֹבֶּר',
        'נוֹבֶמבֶּר',
        'דֶצֶמבֶּר',
    ];
    longMonths: string[] = [
        'יָנוּאַר',
        'פֶבּרוּאַר',
        'מֶרץ',
        'אַפּרִיל',
        'מַאי',
        'יוּנִי',
        'יוּלִי',
        'אוֹגוּסט',
        'סֶפּטֶמבֶּר',
        'אוֹקטוֹבֶּר',
        'נוֹבֶמבֶּר',
        'דֶצֶמבֶּר',
    ];
    longGenitiveMonths: string[] = [
        'יָנוּאַר',
        'פֶבּרוּאַר',
        'מֶרץ',
        'אַפּרִיל',
        'מַאי',
        'יוּנִי',
        'יוּלִי',
        'אוֹגוּסט',
        'סֶפּטֶמבֶּר',
        'אוֹקטוֹבֶּר',
        'נוֹבֶמבֶּר',
        'דֶצֶמבֶּר',
    ];
    longLocativeMonths: string[] = [
        'יָנוּאַר',
        'פֶבּרוּאַר',
        'מֶרץ',
        'אַפּרִיל',
        'מַאי',
        'יוּנִי',
        'יוּלִי',
        'אוֹגוּסט',
        'סֶפּטֶמבֶּר',
        'אוֹקטוֹבֶּר',
        'נוֹבֶמבֶּר',
        'דֶצֶמבֶּר',
    ];
    am: string = 'לפני הצהריים';
    pm: string = 'אחרי הצהריים';
    minHalfYear: string = 'חצי שנה $digit$s$';
    longHalfYear: string = '$digit$s$ חצי שנה';
    longHalfYears: string[] = ['חצי שנה I', 'חצי שנה II '];
    shortHalfYears: string[] = ['חצי שנה I', 'חצי שנה II '];
    minQuarter: string = '$digit$s$ ברבע׳';
    shortQuarter: string = '$digit$s$ ברבע׳';
    longQuarter: string = '$digit$s$ ברבעון';
    manyQuarter: string = '$digit$s$ ברבעון';
    quarters: string[] = ['I', 'II', 'III', 'IV'];
    longQuarters: string[] = ['I ברבעון', 'II ברבעון', 'III ברבעון', 'IV ברבעון'];
    shortQuarters: string[] = ['I ברבעון', 'II ברבעון', 'III ברבעון', 'IV ברבעון'];
    minQuarters: string[] = ['I ברבעון', 'II ברבעון', 'III ברבעון', 'IV ברבעון'];
    today: string = 'היום';
    allPeriod: string = 'כל התקופה';
    openFinishPeriod: string = 'עד $digit$s$';
    openStartPeriod: string = 'מ-$digit$s$';
}
