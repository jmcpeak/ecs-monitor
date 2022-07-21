import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { tabs } from '../../../../consts';
import useOnChange from './useOnChange';

const Navigation = () => {
  const [value, handleChange] = useOnChange();

  return (
    <Tabs
      aria-label="navigation tabs"
      indicatorColor="secondary"
      onChange={handleChange}
      textColor="inherit"
      value={value}
      variant="scrollable"
    >
      {tabs.map(({ key, ...props }) => (
        <Tab key={key} {...props} />
      ))}
    </Tabs>
  );
};

export default Navigation;
