// export the function's result
// can be editted when ssr is used
import {
    useSelector as _useSelector,
    useDispatch as _useDispatch,
    type TypedUseSelectorHook
} from 'react-redux';
import {
    configureStore,
    type StateFromReducersMapObject,
    type PreloadedState
} from '@reduxjs/toolkit';
import appSlice from '@/store/app';

const reducer = {
    app: appSlice.reducer
};

export type RootState = StateFromReducersMapObject<typeof reducer>;
export function initStore(preloadedState?: PreloadedState<RootState>) {
    return configureStore({
        reducer,
        preloadedState
        // middleware: (getDefaultMiddleware) => {
        //     return getDefaultMiddleware();
        // },
    });
}

type Store = ReturnType<typeof initStore>;
export type AppDispatch = Store['dispatch'];
export const useDispatch = () => _useDispatch<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = _useSelector;
