import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import '../themes/original.scss'
import '../lib/fontello/css/facts.css'

import Nav from './common/Nav'
import Home from './common/Home'
import CreateGame from './create/CreateGame'
import Archive from './archive/index'

class GetTheFactsStraight extends React.Component {

  render() {
    return (
      <Router>
        <>
          <Nav />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/create" component={CreateGame} />
            <Route exact path="/quizzes" component={Archive} />
          </Switch>
        </>
      </Router>
    )
  }
}

ReactDOM.render(<GetTheFactsStraight />, document.getElementById('app'));
