
import { atom, useAtom } from 'jotai';

interface ICounter {
    id: string;
    value: number;
}
interface ICounterMap {
    [key: string]: ICounter;
}

// atoms with initial default values
const counters = atom<ICounterMap>({});

// mutations
interface IPropsInitCounter {
    id: string;
}
const initCounter = ({ id }: IPropsInitCounter) => {
    const [oldCounters, setCounterMap] = useAtom(counters);
    const newCounter: ICounter = { id, value: 0 };
    const newCounters: ICounterMap = {
        ...oldCounters,
        [id]: newCounter
    };
    setCounterMap(newCounters);
}

interface IPropsOperation {
    id: string;
    value: number;
}
const increment = ({ id, value }: IPropsOperation) => {
    const [currentCounters, setCounterMap] = useAtom(counters);
    currentCounters[id].value += value;
    setCounterMap(currentCounters);
}
const decrement = ({ id, value }: IPropsOperation) => {
    const [currentCounters, setCounterMap] = useAtom(counters);
    currentCounters[id].value -= value;
    setCounterMap(currentCounters);
}

const atomObj = {
    atoms: {
        counters,
    },
    mutations: {
        initCounter,
        increment,
        decrement
    },
};

export default atomObj;
