import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import "./App.css";
import Characters from "./components/Characters";
import Comics from "./components/Comics";
import Series from "./components/Series";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import SingleCharacter from "./components/SingleCharacter";
import SingleComic from "./components/SingleComic";
import SingleSeries from "./components/SingleSeries";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to the Marvel API</h1>
          <br></br>
          <Link className="showlink" to="/">
            Home
          </Link>
          <Link className="showlink" to="/characters/page/0">
            Characters
          </Link>
          <Link className="showlink" to="/comics/page/0">
            Comics
          </Link>
          <Link className="showlink" to="/series/page/0">
            Series
          </Link>
        </header>
        <div className="App-body">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/characters/page/0" element={<Characters />} />
            <Route
              exact
              path="/characters/page/:page"
              element={<Characters />}
            />
            <Route exact path="/characters/:id" element={<SingleCharacter />} />
            <Route exact path="/comics/page/0" element={<Comics />} />
            <Route exact path="/comics/page/:page" element={<Comics />} />
            <Route exact path="/comics/:id" element={<SingleComic />} />
            <Route exact path="/series/page/0" element={<Series />} />
            <Route exact path="/series/page/:page" element={<Series />} />
            <Route exact path="/series/:id" element={<SingleSeries />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
