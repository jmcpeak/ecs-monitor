import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './app/store';
import { removeTrailingSlash } from './config';
import { routes } from './consts';

const elementId = 'root';
const container = document.getElementById(elementId) as HTMLElement;
const root = ReactDOM.createRoot(container);
const path = removeTrailingSlash();

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route element={<App />} path={path}>
          {routes.map(({ key, ...props }) => (
            <Route key={key} {...props} />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);
