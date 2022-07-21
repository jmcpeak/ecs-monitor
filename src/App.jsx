import { ThemeProvider } from '@mui/material/styles';
import { Outlet } from 'react-router-dom';
import AppBar from './components/Layout/AppBar';
import SettingsModal from './components/settings/settingsModalComponent';
import { TaskChurn } from './components/Layout/Snackbars';
import 'nprogress/nprogress.css';
import './app.css';
import theme from './theme';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppBar />
      <Outlet />
      <TaskChurn />
      <SettingsModal />
    </ThemeProvider>
  );
};

export default App;
