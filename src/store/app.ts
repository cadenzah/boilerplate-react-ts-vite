import { createSlice, createSelector } from '@reduxjs/toolkit';
import { type RootState } from '@/store';

// default state for this slice state
interface ICounter {
    id: string;
    value: number;
}
interface ICounterMap {
    [key: string]: ICounter
}
interface IState {
    counters: ICounterMap;
}
const initialState: IState = {
    counters: {}
};

// reducers
const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        init: (state, { payload }) => {
            const { id } = payload;
            const newCounter: ICounter = { id, value: 0 };
            const newCounters: ICounterMap = {
                ...state.counters,
                [id]: newCounter
            }
            state.counters = newCounters;
        },
        increment: (state, { payload }) => {
            const { id, value } = payload;
            state.counters[id].value += value;
        },
        decrement: (state, action) => {
            const { id } = action.payload;
            state.counters[id].value = state.counters[id].value - action.payload.value;
        }
    }
});

// selectors
interface IArgs { [key: string]: any }
const forwardArgs = (_: RootState, args?: IArgs) => args;
const selectAppSlice = (state: RootState) => state.app;

const selectCounterMap = createSelector([selectAppSlice], (app) => app.counters);
export const makeSelectCounterMap = () => createSelector([selectAppSlice], (app) => app.counters);

export const makeSelectCount =
    (id: string) =>
        (state: RootState) => (
            createSelector(
                [selectCounterMap, forwardArgs],
                (counters, args = { id: '0' }) => (
                    counters[args.id].value
                )
            )(state, { id })
        );

export default appSlice;
