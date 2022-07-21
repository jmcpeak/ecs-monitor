import PropTypes from 'prop-types';

const style = {
  color: '#FBE7A1',
  fontFamily: 'monospace',
  marginLeft: 8,
};

const prefix = 'Task churn spotted on';

const TaskChurnMessage = ({ serviceName }) => {
  return (
    <>
      {prefix}
      <span style={style}>{serviceName}</span>
    </>
  );
};

TaskChurnMessage.propTypes = {
  serviceName: PropTypes.string,
};

TaskChurnMessage.defaultProps = {
  serviceName: '',
};

export default TaskChurnMessage;
