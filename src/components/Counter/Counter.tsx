import React from 'react';
import './Counter.scss';

interface IProps {
    increment: () => void;
    decrement: () => void;
    count: number;
}

function Counter(props: IProps): JSX.Element {
    const { count, increment, decrement } = props;
    return (
        <div className="container">
            <p>{count}</p>
            <button onClick={() => increment()}>+</button>
            <button onClick={() => decrement()}>-</button>
        </div>
    );
}

export default Counter;
