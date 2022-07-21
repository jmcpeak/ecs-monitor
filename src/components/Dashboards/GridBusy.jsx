import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';
import { busySX } from './consts';

const GridBusy = () => {
  return (
    <Grid item xs={12}>
      <LinearProgress sx={busySX} variant="indeterminate" />
    </Grid>
  );
};

export default GridBusy;
