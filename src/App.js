import React from "react";
import "./css/App.css";
import Recettes from "./components/Recettes.js";
import Blog from "./components/Blog.js";
import {BrowserRouter, Routes, Route, NavLink} from "react-router-dom";

function App() {
  return (
    <div className='App'>
      <>
        <BrowserRouter>
            <div id="Nav">
                <div>
                    <NavLink to="/recettes" style = {({isActive}) => ({
                        borderBottom: isActive ? '5px solid lightcoral' : ''
                      })}>
                        Recettes
                    </NavLink>
                </div>
                <div>
                    <NavLink to="/blog" style = {({isActive}) => ({
                        borderBottom: isActive ? '5px solid lightcoral' : ''
                      })}>
                        Blog
                    </NavLink>
                </div>
            </div>
            <Routes>
                <Route exact path="/recettes" element = {<Recettes/>}/>
                <Route exact path="/blog" element = {<Blog/>}/>
                <Route exact path="/" element = {<h1>Sélectionnez une page.</h1>}/>
            </Routes>
        </BrowserRouter>
      </>
    </div>
  );
}

export default App;
