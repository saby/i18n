import IContents from './IContents';

export default interface IWasabyGlobal {
    wsConfig: {
        IS_BUILDER: boolean;
    };
    contents: IContents;
}
