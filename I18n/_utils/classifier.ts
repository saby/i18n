const REGION_AND_CLASSIFIER = {
    RU: '643',
    KZ: '398',
    UZ: '860',
    AE: '784',
    IL: '376',
};

/**
 * Возвращает цифровой код страны соответствующей двухбуквенному.
 * @param {String} regionCode Двухбуквенный код страны. Например, RU.
 * @return {String} Трёхзначный цифровой код страны. Например, 643.
 */
export function getClassifierByRegion(regionCode: string): string {
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
export function getRegionByClassifier(classifierCode: string): string {
    for (const [region, classifier] of Object.entries(REGION_AND_CLASSIFIER)) {
        if (classifierCode === classifier) {
            return region;
        }
    }

    throw new Error(`Region code not exists for classifier code ${classifierCode}`);
}
