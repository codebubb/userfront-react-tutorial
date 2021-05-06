import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';

import Userfront from '@userfront/react';

Userfront.init('jb7wvwb6');

const SignupForm = Userfront.build({
  toolId: 'bmldom',
});

const LoginForm = Userfront.build({
  toolId: 'ldobnl',
});

const PasswordResetForm = Userfront.build({
  toolId: 'klrkmk',
});

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/login'>Login</Link>
            </li>
            <li>
              <Link to='/reset'>Reset</Link>
            </li>
            <li>
              <Link to='/dashboard'>Dashboard</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/reset'>
            <PasswordReset />
          </Route>
          <Route path='/dashboard'>
            <Dashboard />
          </Route>
          <Route path='/'>
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

const Home = () => (
  <div>
    <h2>Home</h2>;
    <SignupForm />
  </div>
);

const Login = () => (
  <div>
    <h2>Login</h2>
    <LoginForm />
  </div>
);

const PasswordReset = () => (
  <div>
    <h2>Password Reset</h2>;
    <PasswordResetForm />
  </div>
);

const Dashboard = () => {
  const [privateData, setPrivateData] = useState<{ data: string }>();

  // Get private data
  useEffect(() => {
    (async () => {
      try {
        const result = await fetch('http://localhost:3010/data', {
          headers: {
            Authorization: `Bearer ${Userfront.accessToken()}`,
          },
        }).then((response) => response.json());
        setPrivateData(result);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  if (!Userfront.accessToken()) {
    return (
      <Redirect
        to={{
          pathname: '/login',
        }}
      />
    );
  }

  const userData = JSON.parse(atob(Userfront.accessToken().split('.')[1]));

  return (
    <div>
      <h2>Dashboard</h2>
      <h3>User data</h3>
      <pre>{JSON.stringify(userData, null, 2)}</pre>
      <h3>Private data</h3>
      <pre>{JSON.stringify(privateData, null, 2)}</pre>
      <button onClick={Userfront.logout}>Logout</button>
    </div>
  );
};
