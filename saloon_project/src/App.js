import React from 'react'

import {BrowserRouter,Route,Switch} from 'react-router-dom'

import Homepage from './components/Homepage'
import AuthPage from './components/Auth'
function App() {
  return (
    <div>

    <BrowserRouter>
    <Switch>
    <Route path="/" exact component={Homepage}/>
    <Route path="/authenticate" exact component={AuthPage} />
    </Switch>
    </BrowserRouter>
    </div>
  )
}

export default App;
