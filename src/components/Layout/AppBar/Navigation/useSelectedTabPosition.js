import { useLocation } from 'react-router-dom';
import { tabs } from '../../../../consts.jsx';

const useSelectedTabPosition = () => {
  const location = useLocation();
  const index = tabs.findIndex(({ to }) => to === location.pathname);

  return index === -1 ? 0 : index;
};

export default useSelectedTabPosition;
