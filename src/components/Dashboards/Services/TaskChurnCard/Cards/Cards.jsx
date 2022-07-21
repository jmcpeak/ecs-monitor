import Autorenew from '@mui/icons-material/Autorenew';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';
import GridBusy from '../../../GridBusy';
import { scanServiceEventsForTaskChurn } from '../../../../../consts';
import { useServices } from '../../../../../hooks';

const avatar = <Autorenew color="warning" />;
const titleTypographyProps = { variant: 'subtitle1' };

const cardSX = {
  width: (theme) => `calc(100% + ${theme.spacing(12)})`,
};
const cardHeaderSX = {
  '&.MuiCardHeader-root': {
    whiteSpace: 'nowrap',
  },
};

const TableRows = () => {
  const [churnEntries, setChurnEntries] = useState([]);
  const services = useServices('TableRows');

  useEffect(() => {
    setChurnEntries(scanServiceEventsForTaskChurn(services));
  }, [services]);

  return (
    <Grid container spacing={2}>
      {churnEntries.length !== 0 ? (
        churnEntries.map(
          ({ churnEvents, isChurnDetected, serviceArn, serviceName }, index) =>
            isChurnDetected && (
              // eslint-disable-next-line react/no-array-index-key
              <Grid key={`${serviceArn}-${index}`} item xs={4}>
                <Card sx={cardSX}>
                  <CardHeader
                    avatar={avatar}
                    subheader={`Churn Events: ${churnEvents.length}`}
                    sx={cardHeaderSX}
                    title={serviceName}
                    titleTypographyProps={titleTypographyProps}
                  />
                </Card>
              </Grid>
            )
        )
      ) : (
        <GridBusy />
      )}
    </Grid>
  );
};

export default TableRows;
