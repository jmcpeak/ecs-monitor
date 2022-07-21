import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import { removeTrailingSlash } from './config';
import { routes } from './consts';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <BrowserRouter>
    <Routes>
      <Route element={<App />} path={removeTrailingSlash()}>
        {routes.map(({ key, ...props }) => (
          <Route key={key} {...props} />
        ))}
      </Route>
    </Routes>
  </BrowserRouter>
);
