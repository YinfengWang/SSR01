import React from 'react';
import AppStoreClass from './app-store';


const appStore = new AppStoreClass();
export {appStore};
export const createStoreMap = () => ({
    appStore: new AppStoreClass(),
});

