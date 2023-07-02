import React from 'react';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import { Provider } from 'react-redux';
import store from './Redux/Store';
import Protected from './components/Protected';
import Todo from './components/Todo';
import Registration from './components/Registration';
import UserTable from './components/UserTable';
import Login from './components/Login';
import UserDetail from './components/UserDetail';
function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/todo" element={<Protected Component={Todo} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Registration />} />
          <Route path="/user" element={<UserTable />} />
          <Route path="/userdetail" element={<UserDetail/>}/>
      </Routes>
      </Router>
    </Provider>
  );
}

export default App;
