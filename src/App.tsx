import React from 'react';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import HomePage from './components/HomePage';
import LeadsPage from './components/LeadsPage';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {Provider} from 'react-redux';
import {store} from './redux/store';

function App() {
    return (
        <Provider store={store}>
            <Router>
                <div className="App">
                    <Header/>
                    <div className="main-container">
                        <Sidebar/>
                        <Routes>
                            <Route path="/" element={<HomePage/>}/>
                            <Route path="/leads" element={<LeadsPage/>}/>
                        </Routes>
                    </div>
                </div>
            </Router>
        </Provider>
    );
}

export default App;
