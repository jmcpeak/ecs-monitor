import PaperAccordion from '../../PaperAccordion';
import Table from './Table';
import { useWindowHeight } from '../../../../hooks';

const TaskCard = () => {
  const style = useWindowHeight(185);

  return (
    <PaperAccordion title="Task Overview">
      <Table style={style} />
    </PaperAccordion>
  );
};

export default TaskCard;
