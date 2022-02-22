import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes, Redirect } from "react-router-dom";
import Home from './views/Home'
import Detail from './views/DetailPatient'
import Create from './views/CreatePatient'

ReactDOM.render(

    <BrowserRouter>
        <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/create" element={<Create />} />
            <Route path="/create/:id" element={<Create />} />
        </Routes>
    </BrowserRouter>

    , document.getElementById('root')
);

