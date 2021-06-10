import React from 'react'

import {BrowserRouter,Route,Switch} from 'react-router-dom'

import Homepage from './components/Homepage'
import AuthPage from './components/Auth'
import DashboardBase from './components/DashboardBase'
function App() {
  return (
    <div>

    <BrowserRouter>
    <Switch>
    <Route path="/" exact component={Homepage}/>
    <Route path="/authenticate" exact component={AuthPage} />
    <Route path="/dashboard"  component={DashboardBase} />
    </Switch>
    </BrowserRouter>
    </div>
  )
}

export default App;
