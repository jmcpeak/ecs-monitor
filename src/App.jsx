import { ThemeProvider } from '@mui/material/styles';
import { Outlet } from 'react-router-dom';
import AppBar from './components/Layout/AppBar';
import SettingsModal from './components/settings/settingsModalComponent.jsx';
import SnackbarChurn from './components/Layout/Snackbars/SnackbarChurn.jsx';
import 'nprogress/nprogress.css';
import './app.css';
import theme from './theme.js';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppBar />
      <Outlet />
      <SnackbarChurn />
      <SettingsModal />
    </ThemeProvider>
  );
};

export default App;
