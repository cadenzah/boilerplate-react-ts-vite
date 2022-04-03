import React, { useState, useCallback } from 'react';
import { useAtom } from 'jotai';
import { app } from '@/atoms';

import Counter from '@/components/Counter';

const DEFAULT_OFFSET = 1;
const convertInput = (value: string) => {
    if (value === '') {
        return DEFAULT_OFFSET;
    }
    return parseInt(value);
};

const countersAtom = app.atoms.counters;

interface IProps {
    idx: string;
}

function CounterContainer(props: IProps): JSX.Element {
    const { idx } = props;
    const [offset, setOffset] = useState(DEFAULT_OFFSET);
    // const dispatch = useDispatch();
    const [counterMap] = useAtom(countersAtom);

    // const selectCounterMap = useMemo(() => makeSelectCounterMap(), []);
    // const counterMap = useSelector(selectCounterMap);
    if (counterMap[idx] === undefined) {
        // dispatch(actions.init({ id: idx }));
        app.mutations.initCounter({ id: idx });
        return (<></>);
    }
    console.log(counterMap[idx]);

    // const selectCount = useCallback((idx: string) => makeSelectCount(idx), []);
    // const count = useSelector(selectCount(idx));
    const count = counterMap[idx].value;

    // const increment = useCallback(
    //     () => dispatch(actions.increment({ id: idx, value: offset })),
    //     [dispatch, idx, offset]
    // );
    // const decrement = useCallback(
    //     () => dispatch(actions.decrement({ id: idx, value: offset })),
    //     [dispatch, idx, offset]
    // );
    const increment = useCallback(
        () => {
            app.mutations.increment({ id: idx, value: offset });
        }, [app.mutations.increment, idx, offset]
    );
    const decrement = useCallback(
        () => {
            app.mutations.decrement({ id: idx, value: offset });
        }, [app.mutations.decrement, idx, offset]
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
