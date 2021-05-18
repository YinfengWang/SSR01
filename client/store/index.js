import AppStoreClass from './app-store';
import TopicStoreClass from './topic.store';

export const AppStore = AppStoreClass;

export default {
    AppStore,
};

export const createStoreMap = () => ({
    appStore: new AppStore(),
});

export const createClientStoreMap = (initalState) =>
    ({
        appStore: new AppStore(initalState),
        topicStore: new TopicStoreClass(),

    })
;
