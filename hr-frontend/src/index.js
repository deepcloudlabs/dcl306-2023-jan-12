import React from 'react';
import ReactDOM from 'react-dom/client';
import Hr from './hr';
import "bootstrap/dist/css/bootstrap.css";
import HrProvider from "./provider/hr-provider";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <HrProvider>
        <Hr/>
    </HrProvider>
);