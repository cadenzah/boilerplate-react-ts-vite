import React, { Fragment, Suspense } from 'react';
import { Routes as RouterSwitch, Route } from 'react-router-dom';

interface IRouteComponent {
    [key: string]: () => Promise<{ default: React.ComponentType }>;
}

const PRESERVED = import.meta.globEager('/src/pages/(_app|404).tsx');
const ROUTES = import.meta.glob('/src/pages/**/[a-z[]*.tsx') as IRouteComponent;

interface IPreserved {
    [key: string]: React.ComponentType;
}

const preserved = Object.keys(PRESERVED).reduce((preserved, file) => {
    const key = file.replace(/\/src\/pages\/|\.tsx$/g, '');
    return { ...preserved, [key]: PRESERVED[file].default };
}, {} as IPreserved);

const routes = Object.keys(ROUTES).map((route) => {
    const path = route
        .replace(/\/src\/pages|index|\.tsx$/g, '')
        .replace(/\[\.{3}.+\]/, '*')
        .replace(/\[(.+)\]/, ':$1');

    return { path, component: React.lazy(ROUTES[route]) };
});

export default function Routes(): JSX.Element {
    const App = preserved?.['_app'] || Fragment;
    const NotFound = preserved?.['404'] || Fragment;

    return (
        <App>
            <Suspense fallback={'Loading...'}>
                <RouterSwitch>
                    {routes.map(({ path, component: Component = Fragment }) => (
                        <Route key={path} path={path} element={<Component />} />
                    ))}
                    <Route path="*" element={<NotFound />} />
                </RouterSwitch>
            </Suspense>
        </App>
    );
}
