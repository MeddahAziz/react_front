import logo from './logo.svg';
//import './App.css';
import Navbar from './Navbar';
import Table from './Table';
import Footer from './Footer';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Main from './main';
import LoginPage from './login';
import LoginSecond from './loginsecond';
import SignupPage from './signup';
import Hero from './Hero';
import Admin from "./Admin";

function App() {
    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route exact path="/">
                        <Hero/>
                    </Route>
                    <Route exact path="/main">
                        <Main />
                    </Route>
                    <Route exact path="/login">
                        <LoginPage />
                    </Route>
                    <Route exact path="/log">
                        <LoginSecond />
                    </Route>
                    <Route exact path="/signup">
                        <SignupPage />
                    </Route>
                    <Route exact path="/Admin">
                        <Admin/>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
