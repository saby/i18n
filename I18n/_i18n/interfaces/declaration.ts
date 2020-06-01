export interface IGlobal {
    requirejs: Require;
    contents: IContents;
}

export interface IContents {
    buildnumber: string;
    modules: {
        [key: string]: IModule;
    };
    availableLanguage?: object;
    defaultLanguage?: string;
}

export interface IModule {
    buildnumber?: string;
    path?: string;
    dict?: string[];
    service?: string;
}
