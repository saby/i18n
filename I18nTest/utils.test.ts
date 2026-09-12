import { getClassifierByRegion, getRegionByClassifier } from 'I18n/utils';
import { regionCode } from 'I18n/interfaces/IAvailableCodes';

describe('getClassifierByRegion', () => {
    test('should return "643" for "RU"', () => {
        expect(getClassifierByRegion('RU')).toStrictEqual('643');
    });

    test('should return "398" for "KZ"', () => {
        expect(getClassifierByRegion('KZ')).toStrictEqual('398');
    });

    test('should return "860" for "UZ"', () => {
        expect(getClassifierByRegion('UZ')).toStrictEqual('860');
    });

    test('should return "784" for "AE"', () => {
        expect(getClassifierByRegion('AE')).toStrictEqual('784');
    });

    test('should return "376" for "IL"', () => {
        expect(getClassifierByRegion('IL')).toStrictEqual('376');
    });

    test('should return error if classifier not exists', () => {
        expect(() => getClassifierByRegion('OO' as regionCode)).toThrow(Error);
    });
});

describe('getRegionByClassifier', () => {
    test('should return "RU" for "643"', () => {
        expect(getRegionByClassifier('643')).toStrictEqual('RU');
    });

    test('should return "KZ" for "398"', () => {
        expect(getRegionByClassifier('398')).toStrictEqual('KZ');
    });

    test('should return "UZ" for "860"', () => {
        expect(getRegionByClassifier('860')).toStrictEqual('UZ');
    });

    test('should return "AE" for "784"', () => {
        expect(getRegionByClassifier('784')).toStrictEqual('AE');
    });

    test('should return "IL" for "376"', () => {
        expect(getRegionByClassifier('376')).toStrictEqual('IL');
    });

    test('should return error if classifier not exists', () => {
        expect(() => getRegionByClassifier('000')).toThrow(Error);
    });
});
