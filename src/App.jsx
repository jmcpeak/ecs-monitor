import { ThemeProvider } from '@mui/material/styles';
import { Outlet } from 'react-router-dom';
import AppBar from './components/Layout/AppBar';
import SettingsModal from './components/settings/settingsModalComponent';
import { TaskChurn as SnackbarTaskChurn } from './components/Layout/Snackbars';
import 'nprogress/nprogress.css';
import './app.css';
import theme from './theme';
import { useServices } from './hooks';
import { scanServiceEventsForTaskChurn } from './consts';

const App = () => {
  const services = useServices('App');
  const churnEntries = scanServiceEventsForTaskChurn(services);

  return (
    <ThemeProvider theme={theme}>
      <AppBar />
      <Outlet
        context={{
          churnEntries,
          services,
          servicesDisabled: services.length === 0,
        }}
      />
      <SnackbarTaskChurn churnEntries={churnEntries} services={services} />
      <SettingsModal />
    </ThemeProvider>
  );
};

export default App;
