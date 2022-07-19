import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Button from '@mui/material/Button';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import { accordionSX } from './consts';

const PaperAccordion = ({ children, title }) => {
  return (
    <Paper>
      <Accordion defaultExpanded sx={accordionSX}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Grid container>
            <Grid item xs>
              <Typography variant="h6">{title}</Typography>
            </Grid>
            <Grid item>
              <AccordionActions disableSpacing>
                <Button>bob</Button>
              </AccordionActions>
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>{children}</AccordionDetails>
      </Accordion>
    </Paper>
  );
};

PaperAccordion.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

export default PaperAccordion;
