// import './App.scss';
import * as React from 'react';
import MainPage from './containers/MainPage';
import ChatPage from './containers/ChannelPage';

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
