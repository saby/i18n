import IContents from './IContents';

/**
 * Интерфейс глобального окружения wasaby.
 */
export default interface IWasabyGlobal {
    wsConfig: {
        IS_BUILDER: boolean;
    };
    contents: IContents;
}
