import ICalendarEntities from '../../../interfaces/ICalendarEntities';

/**
 * Описание констант календарных значений для арабского языка.
 * @public
 * @author Кудрявцев И.С.
 */
export default class Arabian implements ICalendarEntities {
    minDays: string[] = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
    shortDays: string[] = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
    longDays: string[] = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
    shortMonths: string[] = [
        'يناير',
        'فبراير',
        'مارس',
        'إبريل',
        'مايو',
        'يونية',
        'يولية',
        'أغسطس',
        'سبتمبر',
        'أكتوبر',
        'نوفمبر',
        'ديسمبر',
    ];
    longMonths: string[] = [
        'يناير',
        'فبراير',
        'مارس',
        'إبريل',
        'مايو',
        'يونية',
        'يولية',
        'أغسطس',
        'سبتمبر',
        'أكتوبر',
        'نوفمبر',
        'ديسمبر',
    ];
    longGenitiveMonths: string[] = [
        'يناير',
        'فبراير',
        'مارس',
        'إبريل',
        'مايو',
        'يونية',
        'يولية',
        'أغسطس',
        'سبتمبر',
        'أكتوبر',
        'نوفمبر',
        'ديسمبر',
    ];
    longLocativeMonths: string[] = [
        'يناير',
        'فبراير',
        'مارس',
        'إبريل',
        'مايو',
        'يونية',
        'يولية',
        'أغسطس',
        'سبتمبر',
        'أكتوبر',
        'نوفمبر',
        'ديسمبر',
    ];
    shortGenitiveMonths: string[] = [
        'يناير',
        'فبراير',
        'مارس',
        'إبريل',
        'مايو',
        'يونية',
        'يولية',
        'أغسطس',
        'سبتمبر',
        'أكتوبر',
        'نوفمبر',
        'ديسمبر',
    ];
    shortLocativeMonths: string[] = [
        'يناير',
        'فبراير',
        'مارس',
        'إبريل',
        'مايو',
        'يونية',
        'يولية',
        'أغسطس',
        'سبتمبر',
        'أكتوبر',
        'نوفمبر',
        'ديسمبر',
    ];
    am: string = 'صباحا';
    pm: string = 'مساءً';
    minHalfYear: string = 'نصف عام $digit$s$';
    longHalfYear: string = '$digit$s$ نصف عام';
    minQuarter: string = '$digit$s$ ربع سنة';
    shortQuarter: string = '$digit$s$ ربع سنة';
    longQuarter: string = '$digit$s$ ربع سنة';
    manyQuarter: string = '$digit$s$ ربع سنة';
    quarters: string[] = ['I', 'II', 'III', 'IV'];
    longQuarters: string[] = ['I ربع سنة', 'II ربع سنة', 'III ربع سنة', 'IV ربع سنة'];
    today: string = 'اليوم';
    allPeriod: string = 'كل هذه الفترة';
    openFinishPeriod: string = 'من $digit$s$';
    openStartPeriod: string = 'حتى $digit$s$';
}
