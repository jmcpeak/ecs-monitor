import PaperAccordion from '../../PaperAccordion';
import Table from './Table';
import { useWindowHeight } from '../../../../hooks';

const EventCard = () => {
  const style = useWindowHeight(388);

  return (
    <PaperAccordion title="Events">
      <Table style={style} />
    </PaperAccordion>
  );
};

export default EventCard;
