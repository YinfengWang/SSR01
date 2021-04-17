import AppStoreClass from './app-store';

export const AppStore = AppStoreClass;

export default {
    AppStore,
};

export const createStoreMap = () => ({
    appStore: new AppStore(),
});
