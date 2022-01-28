import React, { useMemo, useCallback, useState } from 'react';
import { useSelector, useDispatch } from '@/store';
import appSlice, { makeSelectCount } from '@/store/app';

import Counter from '@/components/Counter';

const { actions } = appSlice;

const DEFAULT_OFFSET = 1;
const convertInput = (value: string) => {
    if (value === '') {
        return DEFAULT_OFFSET;
    }
    return parseInt(value);
};

function CounterContainer(): JSX.Element {
    const [offset, setOffset] = useState(DEFAULT_OFFSET);
    const selectCount = useCallback((offset: number) => makeSelectCount(offset), [offset]);
    const count = useSelector(selectCount(10));
    const dispatch = useDispatch();

    const increment = useCallback(() => dispatch(actions.increment(offset)), [dispatch, offset]);
    const decrement = useCallback(() => dispatch(actions.decrement(offset)), [dispatch, offset]);

    return (
        <div className="container">
            <Counter increment={() => increment()} decrement={() => decrement()} count={count} />
            <input value={offset || DEFAULT_OFFSET} onChange={(e) => setOffset(convertInput(e.target.value))} />
        </div>
    );
}

export default CounterContainer;
