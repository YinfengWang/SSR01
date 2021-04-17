import AppStoreClass from './app-store';

export const AppStore = AppStoreClass;

export default {
    AppStore,
};

export const createStoreMap = () => ({
    appStore: new AppStore(),
});

export const createClientStoreMap = () =>
    // const dafaultState = window.context.state;
    ({
        appStore: new AppStore(),
    })
;
