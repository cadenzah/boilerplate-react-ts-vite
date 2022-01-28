import React from 'react';
import Navigation from '@/components/Navigation';
import CounterContainer from '@/containers/CounterContainer';

function Page(props: React.PropsWithChildren<Record<string, unknown>>): JSX.Element {
    const { children } = props;
    return (
        <div className="Page">
            <Navigation />
            {
                [0, 1, 2].map((index) => (
                    <CounterContainer key={index} idx={`${index}`} />
                ))
            }
            {children}
        </div>
    );
}

export default Page;
