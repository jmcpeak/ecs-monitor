import ClusterAgentBreakdown from './agentBreakdown/clusterAgentBreakdown';
import { useTaskDefinitions, useClusters } from '../../hooks';

const sortByHighestTaskCountDesc = (clusterA, clusterB) => {
  return clusterA?.runningTasksCount < clusterB?.runningTasksCount;
};

const AgentSummary = () => {
  const clusters = useClusters(sortByHighestTaskCountDesc);
  const taskDefinitionColours = useTaskDefinitions();

  return (
    <div className={`ec2-summary count-${clusters.length}`}>
      {clusters.map((cluster) => (
        <ClusterAgentBreakdown
          key={`breakdown::${cluster.clusterName}`}
          agentCount={cluster.registeredContainerInstancesCount}
          clusterName={cluster.clusterName}
          runningTasksCount={
            cluster.runningTasksCount + cluster.pendingTasksCount
          }
          taskDefinitionColours={taskDefinitionColours}
        />
      ))}
    </div>
  );
};

export default AgentSummary;
