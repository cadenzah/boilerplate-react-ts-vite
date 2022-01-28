import React from 'react';
import Navigation from '@/components/Navigation';
import CounterContainer from '@/containers/CounterContainer';

function Page(props: React.PropsWithChildren<Record<string, unknown>>): JSX.Element {
    const { children } = props;
    return (
        <div className="Page">
            <Navigation />
            <CounterContainer />
            {children}
        </div>
    );
}

export default Page;
