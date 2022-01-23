import React from 'react';
import { useParams } from 'react-router-dom';

function Page(): JSX.Element {
    const { userId } = useParams<{ userId: string }>();

    return (
        <div className="Page">
            <p>{userId}&apos;s profile</p>
        </div>
    );
}

export default Page;
