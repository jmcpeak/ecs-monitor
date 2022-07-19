import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useTitle } from '../../../../hooks';

const Title = () => {
  const [title, subtitle] = useTitle();

  return (
    <Grid alignItems="center" container spacing={4}>
      <Grid item>
        <Typography variant="h5">{title}</Typography>
      </Grid>
      <Grid item>
        <Typography variant="body1">Last Update: {subtitle}</Typography>
      </Grid>
    </Grid>
  );
};

export default Title;
