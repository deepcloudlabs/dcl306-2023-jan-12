import React from 'react';
import ReactDOM from 'react-dom/client';
import "bootstrap/dist/css/bootstrap.css";
import {Route, Routes} from "react-router";
import UserWins from "./component/mastermind/user-wins";
import UserLoses from "./component/mastermind/user-loses";
import {BrowserRouter} from "react-router-dom";
import GameProvider from "./provider/game-provider";

const root = ReactDOM.createRoot(document.getElementById('root'));
const routing = <Routes>
    <Route path="/" element={<GameProvider />}></Route>
    <Route path="/wins" element={<UserWins />}></Route>
    <Route path="/loses" element={<UserLoses />}></Route>
</Routes>

root.render(
  <BrowserRouter>
      {routing}
  </BrowserRouter>
);

