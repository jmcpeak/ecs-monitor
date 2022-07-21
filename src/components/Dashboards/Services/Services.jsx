import Grid from '@mui/material/Grid';
import EventCard from './EventCard';
import TaskOverviewCard from './TaskOverviewCard';
import TaskChurnCard from './TaskChurnCard';

const sx = { paddingLeft: 1, paddingRight: 1 };

const Services = () => {
  return (
    <Grid container spacing={2} sx={sx}>
      <Grid item xs={5}>
        <TaskOverviewCard />
      </Grid>
      <Grid item xs={7}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <TaskChurnCard />
          </Grid>
          <Grid item>
            <EventCard />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Services;
