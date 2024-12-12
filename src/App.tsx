import { Layout } from './layout/layout.tsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './pages/home/home.tsx';
import { Navigate } from 'react-router';
import { Provider } from 'react-redux';
import store from './store';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route path='/' element={<Navigate to='/home' />} />
            <Route path='/home' element={<Home />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
