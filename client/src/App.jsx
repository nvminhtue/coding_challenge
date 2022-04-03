import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Dashboard from './components/Dashboard/Dashboard.container';
import Auth from './components/Auth';
import { MainToast } from './components/common/Toast';
import history from './services/history';

import 'react-toastify/dist/ReactToastify.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  return (
    <BrowserRouter history={history}>
      <Switch>
        <Route exact path='/' component={Auth} />
        <Route path='/dashboard' component={Dashboard} />
      </Switch>
      <MainToast />
    </BrowserRouter>
  );
}

export default App;
