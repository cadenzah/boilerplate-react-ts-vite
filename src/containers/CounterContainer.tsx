import React, { useMemo, useCallback, useState, useEffect } from 'react';
import { useSelector, useDispatch } from '@/store';
import appSlice, { makeSelectCount, makeSelectCounterMap } from '@/store/app';

import Counter from '@/components/Counter';

const { actions } = appSlice;

const DEFAULT_OFFSET = 1;
const convertInput = (value: string) => {
    if (value === '') {
        return DEFAULT_OFFSET;
    }
    return parseInt(value);
};

interface IProps {
    idx: string;
}

function CounterContainer(props: IProps): JSX.Element {
    const { idx } = props;
    const [offset, setOffset] = useState(DEFAULT_OFFSET);
    const dispatch = useDispatch();

    const selectCounterMap = useMemo(() => makeSelectCounterMap(), []);
    const counterMap = useSelector(selectCounterMap);
    if (counterMap[idx] === undefined) {
        dispatch(actions.init({ id: idx }));
    }

    const selectCount = useCallback((idx: string) => makeSelectCount(idx), []);
    const count = useSelector(selectCount(idx));

    const increment = useCallback(
        () => dispatch(actions.increment({ id: idx, value: offset })),
        [dispatch, idx, offset]
    );
    const decrement = useCallback(
        () => dispatch(actions.decrement({ id: idx, value: offset })),
        [dispatch, idx, offset]
    );

    return (
        <div className="container">
            <Counter increment={() => increment()} decrement={() => decrement()} count={count} />
            <input
                value={offset || DEFAULT_OFFSET}
                onChange={(e) => setOffset(convertInput(e.target.value))}
            />
        </div>
    );
}

export default CounterContainer;
