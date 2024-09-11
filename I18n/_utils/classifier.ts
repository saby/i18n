import { regionCode } from './../interfaces/IAvailableCodes';

const REGION_AND_CLASSIFIER: { [key in regionCode]: string } = {
    RU: '643',
    KZ: '398',
    UZ: '860',
    AE: '784',
    IL: '376',
    US: '840',
    FR: '250',
    GB: '826',
    TM: '795',
};

/**
 * Возвращает цифровой код страны соответствующей двухбуквенному.
 * @param {String} regionCode Двухбуквенный код страны. Например, RU.
 * @return {String} Трёхзначный цифровой код страны. Например, 643.
 */
export function getClassifierByRegion(regionCode: regionCode): string {
    if (REGION_AND_CLASSIFIER.hasOwnProperty(regionCode)) {
        return REGION_AND_CLASSIFIER[regionCode];
    }

    throw new Error(`Classifier code not exists for region code ${regionCode}`);
}

/**
 * Возвращает двухбуквенный код страны соответствующей цифровому.
 * @param {String} classifierCode Трёхзначный цифровой код страны. Например, 643.
 * @return {String} Двухбуквенный код страны. Например, RU.
 */
export function getRegionByClassifier(classifierCode: string): regionCode {
    for (const [region, classifier] of Object.entries(REGION_AND_CLASSIFIER)) {
        if (classifierCode === classifier) {
            return region as regionCode;
        }
    }

    throw new Error(`Region code not exists for classifier code ${classifierCode}`);
}
