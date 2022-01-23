import React from 'react';
import Navigation from '@/components/Navigation';

function Page(props: React.PropsWithChildren<Record<string, unknown>>): JSX.Element {
    const { children } = props;
    return (
        <div className="Page">
            <Navigation />
            {children}
        </div>
    );
}

export default Page;
