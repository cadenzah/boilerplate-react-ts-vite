import { createSlice, createSelector } from '@reduxjs/toolkit';
import { type RootState } from '@/store';

// default state for this slice state
const initialState = {
    value: 0
};

// reducers
const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        increment: (state, { payload }) => {
            state.value += payload;
        },
        decrement: (state, action) => {
            state.value = state.value - action.payload;
        }
    }
});

// selectors
interface IArgs { [key: string]: any }
const forwardArgs = (_: RootState, args?: IArgs) => args;
const selectAppSlice = (state: RootState) => state.app;
const selectAppValue = createSelector([selectAppSlice], (app) => app.value);

export const makeSelectCount = (offset: number) => (
    createSelector([selectAppValue, forwardArgs], (value) => value + offset)
);

export default appSlice;
appSlice.getInitialState()
