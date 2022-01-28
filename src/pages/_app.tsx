import React from 'react';
import Navigation from '@/components/Navigation';
import CounterContainer from '@/containers/CounterContainer';

const COUNTERS = Array.from({length: 5}, (v, i) => i);

function Page(props: React.PropsWithChildren<Record<string, unknown>>): JSX.Element {
    const { children } = props;
    return (
        <div className="Page">
            <Navigation />
            {
                COUNTERS.map((index) => (
                    <CounterContainer key={index} idx={`${index}`} />
                ))
            }
            {children}
        </div>
    );
}

export default Page;
