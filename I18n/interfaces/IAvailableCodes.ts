/**
 * Направление контента
 */
export type directionalityCode = 'ltr' | 'rtl';

/**
 * Доступные коды языков
 */
export type langCode = 'ru' | 'en' | 'ar' | 'he' | 'fr' | 'uz' | 'kk' | 'tk' | 'zh' | 'el' | 'es';

/**
 * Доступные коды регионов
 */
export type regionCode = 'RU' | 'US' | 'GB' | 'AE' | 'IL' | 'FR' | 'UZ' | 'KZ' | 'TM';

/**
 * Доступные коды локалей, ффомирутеся все комбинации языков и региональных языков.
 */
export type localeCode = `${langCode}-${regionCode}`;
