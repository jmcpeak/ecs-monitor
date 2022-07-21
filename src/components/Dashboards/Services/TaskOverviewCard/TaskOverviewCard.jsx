import PaperAccordion from '../../PaperAccordion';
import Table from './Table';
import { useWindowHeight } from '../../../../hooks';

const TaskOverviewCard = () => {
  const style = useWindowHeight(205);

  return (
    <PaperAccordion title="Task Overview">
      <Table style={style} />
    </PaperAccordion>
  );
};

export default TaskOverviewCard;
