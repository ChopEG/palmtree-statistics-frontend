// import './App.scss';
import * as React from 'react';
import MainPage from './components/main';
import ChatPage from './components/chat';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class App extends React.Component {
  render() {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route path="/chat/:name" component={ChatPage}/>
                    <Route path="/" component={MainPage}/>
                </Switch>
            </Router>
        </div>
    );
  }
}

export default App;
