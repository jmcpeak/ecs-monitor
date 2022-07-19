import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Table from './Table';
import { cardSX, cardContentSX, titleTypographyProps } from '../../consts';

const DeploymentCard = () => {
  return (
    <Card sx={cardSX}>
      <CardHeader
        title="Deployments"
        titleTypographyProps={titleTypographyProps}
      />
      <CardContent sx={cardContentSX}>
        <Table />
      </CardContent>
    </Card>
  );
};

export default DeploymentCard;
