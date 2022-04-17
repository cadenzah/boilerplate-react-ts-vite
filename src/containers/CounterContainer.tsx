import React, { useState, useCallback } from 'react';
import { useAtom } from 'jotai';
import { useUpdateAtom, useAtomValue } from 'jotai/utils';
import { app } from '@/atoms';

import Counter from '@/components/Counter';

const DEFAULT_OFFSET = 1;
const convertInput = (value: string) => {
    if (value === '') {
        return DEFAULT_OFFSET;
    }
    return parseInt(value);
};

const countersAtom = app.counters;

interface IProps {
    idx: string;
}

function CounterContainer(props: IProps): JSX.Element {
    const { idx } = props;
    const [offset, setOffset] = useState(DEFAULT_OFFSET);
    
    const [counter, setCounter] = useAtom(app.getCounterById(idx)); // 이거 리렌더가 계속 발생한다.......... 왜??????????????????????????????? (1)
    // const [counterMap] = useAtom(app.getCounters());
    const initCounter = useUpdateAtom(app.initCounter(idx));
    const increment = useUpdateAtom(app.increment({ id: idx, value: offset }));

    console.log(counter);
    // const selectCounterMap = useMemo(() => makeSelectCounterMap(), []);
    // const counterMap = useSelector(selectCounterMap);
    if (counter === undefined) {
        // dispatch(actions.init({ id: idx }));
        // app.initCounter({ id: idx });
        setCounter(0);
        // 이게 실행되고 나서, atom 내 특정 일부분만 watch하고 있는 경우 변화되었다는 것 감지를 못하나봄. 리프레시가 안 된다. 왜???????????????? (2)
        return (<></>);
    }
    // console.log(counterMap[idx], counter);
    console.log(counter);

    // const selectCount = useCallback((idx: string) => makeSelectCount(idx), []);
    // const count = useSelector(selectCount(idx));
    const count = counter.value;

    // const increment = useCallback(
    //     () => dispatch(actions.increment({ id: idx, value: offset })),
    //     [dispatch, idx, offset]
    // );
    // const decrement = useCallback(
    //     () => dispatch(actions.decrement({ id: idx, value: offset })),
    //     [dispatch, idx, offset]
    // );
    // const increment = useCallback(
    //     () => {
    //         app.mutations.increment({ id: idx, value: offset });
    //     }, [app.mutations.increment, idx, offset]
    // );
    const decrement = useCallback(
        () => {
            app.decrement({ id: idx, value: offset });
        }, [app.decrement, idx, offset]
    );

    return (
        <div className="container">
            <Counter
                increment={() => increment()}
                decrement={() => decrement()}
                count={count}
            />
            <input
                value={offset || DEFAULT_OFFSET}
                onChange={(e) => setOffset(convertInput(e.target.value))}
            />
        </div>
    );
}

export default CounterContainer;
