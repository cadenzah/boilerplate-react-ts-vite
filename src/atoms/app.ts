
import { atom, useAtom } from 'jotai';
import { selectAtom } from 'jotai/utils';

interface ICounter {
    id: string;
    value: number;
}
interface ICounterMap {
    [key: string]: ICounter;
}

// atoms with initial default values
const counters = atom<ICounterMap>({});

// getters
const getCounterById = (id: string) => {
    return atom((get) => get(counters));
}

// mutations
const initCounter = (id: string) => {
    return atom(null, (_get, set) => {
        set(counters, (countersMap) => {
            const newCounter: ICounter = { id, value: 0 };
            const newCountersMap = {
                ...countersMap,
                [id]: newCounter
            };
            return newCountersMap;
        });
    });
};

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
    counters,
    initCounter,
    increment,
    decrement
};

export default atoms;
