import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import { removeTrailingSlash } from './config';
import { routes } from './consts.jsx';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <BrowserRouter>
    <Routes>
      <Route path={removeTrailingSlash()} element={<App />}>
        {routes.map((props) => (
          <Route {...props} />
        ))}
      </Route>
    </Routes>
  </BrowserRouter>
);
