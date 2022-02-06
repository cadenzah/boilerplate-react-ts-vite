import React from 'react';
import { Link } from 'react-router-dom';

const MENUS = {
    HOME: '/',
    PROFILE: '/profile',
    PROFILE_cadenzah: '/profile/cadenzah',
    NOTICE: '/notice'
} as { [key: string]: string };

function Navigation(): JSX.Element {
    return (
        <div className="navigation">
            {Object.keys(MENUS).map((menu, index) => (
                <li key={index}>
                    <Link to={MENUS[menu]}>{menu}</Link>
                </li>
            ))}
        </div>
    );
}

export default Navigation;
