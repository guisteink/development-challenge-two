import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes, Redirect } from "react-router-dom";
import Home from './views/Home'
import Detail from './views/DetailPatient'

ReactDOM.render(

    <BrowserRouter>
        <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/detail/:id" element={<Detail />} />
        </Routes>
    </BrowserRouter>

    ,document.getElementById('root')
);

