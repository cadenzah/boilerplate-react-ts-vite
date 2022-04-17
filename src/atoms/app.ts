
import { atom, useAtom } from 'jotai';
import { atomFamily, selectAtom } from 'jotai/utils';
import type { PrimitiveAtom } from 'jotai';

interface ICounter {
    id: string;
    value: number;
}
interface ICounterMap {
    [key: string]: ICounter;
}

// atoms with initial default values
// const countersAtom = atom<ICounterMap>({});
const countersFamily = atomFamily((id: string) => atom<ICounter>({ id, value: 0 }));

// getters
// An atom config is an immutable object. The atom config doesn't hold an atom value. The atom value is stored in a Provider state.
// Below function will always create new atom config... new reference
// const getCounterById = atomFamily((id: string) => atom(id));
const getCounterById = (id: string) => countersFamily(id);

// mutations
// const initCounter = (id: string) => {
//     return atom(null, (_get, set) => {
//         set(counters, (countersMap) => {
//             const newCounter: ICounter = { id, value: 0 };
//             const newCountersMap = {
//                 ...countersMap,
//                 [id]: newCounter
//             };
//             return newCountersMap;
//         });
//     });
// };

interface IPropsOperation {
    id: string;
    value: number;
}
const increment = ({ id, value }: IPropsOperation) => {
    return atom(null, (_get, set) => {
        set(counters, (counterMap) => {
            const newCounterMap: ICounterMap = {
                ...counterMap
            };
            newCounterMap[id].value += value;
            return newCounterMap;
        });
    });
};
const decrement = ({ id, value }: IPropsOperation) => {
    const [currentCounters, setCounterMap] = useAtom(counters);
    currentCounters[id].value -= value;
    setCounterMap(currentCounters);
}

const atoms = {
    countersAtom,
    getCounterById,
    initCounter,
    increment,
    decrement
};

export default atoms;
