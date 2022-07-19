import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';
import { busySX } from './consts';

const GridBusy = () => {
  return (
    <Grid item xs={12}>
      <LinearProgress variant="indeterminate" sx={busySX} />
    </Grid>
  );
};

export default GridBusy;
