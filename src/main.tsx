import React from 'react';
import ReactDOM from 'react-dom';
import '@/style/index.scss';

import { BrowserRouter } from 'react-router-dom';
import Routes from '@/routes';

import { Provider } from 'react-redux';
import { initStore } from '@/store';
const store = initStore();

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <Routes />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
