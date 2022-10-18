import { ThemeProvider } from '@mui/material/styles';
import { Outlet } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useState } from 'react';
import AppBar from './components/Layout/AppBar';
import SettingsModal from './components/settings/settingsModalComponent';
import { TaskChurn as SnackbarTaskChurn } from './components/Layout/Snackbars';
import 'nprogress/nprogress.css';
import './app.css';
import theme from './theme';
import { useServices } from './hooks';
import { scanServiceEventsForTaskChurn } from './consts';
import useEventListener from './hooks/useEventListener';

const url = 'wss://ep5uuuo2b5.execute-api.us-west-2.amazonaws.com/production';

const App = () => {
  const [disabled, setDisabled] = useState(true);
  const [text, setText] = useState('');
  const services = useServices('App');
  const churnEntries = scanServiceEventsForTaskChurn(services);

  const context = {
    churnEntries,
    services,
    servicesDisabled: services.length === 0,
  };

  const socket = new WebSocket(url);

  useEventListener('open', () => setDisabled(false), socket);
  useEventListener('close', () => console.log('WebSocket: closed'), socket);
  useEventListener('error', () => console.log('WebSocket: error'), socket);
  useEventListener(
    'message',
    (e: MessageEvent) => setText(JSON.parse(e.data).message),
    socket
  );

  const handleClick = () => {
    if (socket.readyState === 1) {
      socket.send(JSON.stringify({ action: 'message' }));
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar />
      <Button disabled={disabled} onClick={handleClick}>
        WebSocket {text}
      </Button>
      <Outlet context={context} />
      <SnackbarTaskChurn churnEntries={churnEntries} services={services} />
      <SettingsModal />
    </ThemeProvider>
  );
};

export default App;
