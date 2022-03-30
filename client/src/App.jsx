import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Dashboard from './components/Dashboard';
import Auth from './components/Auth';
import Navbar from './components/Navbar';
import { MainToast } from './components/common/Toast';

import 'react-toastify/dist/ReactToastify.css';
import history from './services/history';

function App() {
  return (
    <BrowserRouter history={history}>
      <Switch>
        <Route exact path='/' component={Auth} />
        <Route path='/dashboard'>
          <Navbar />
          <Dashboard />
        </Route>
      </Switch>
      <MainToast />
    </BrowserRouter>
  );
}

export default App;
