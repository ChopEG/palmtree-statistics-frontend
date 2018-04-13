import * as React from 'react';
import MainPage from './containers/MainPage';
import ChannelPage from './containers/ChannelPage';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class App extends React.Component {
  render() {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route path="/channel/:name" component={ChannelPage}/>
                    <Route path="/" component={MainPage}/>
                </Switch>
            </Router>
        </div>
    );
  }
}

export default App;
