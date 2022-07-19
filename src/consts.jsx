import moment from 'moment';
import config from './config';
import AgentsDashboard from './components/agents';
import ClustersDashboard from './components/clusters';
import DeploymentsDashboard from './components/Dashboards/Deployments';
import LogsDashboard from './components/Dashboards/Logs';
import ServicesDashboard from './components/Dashboards/Services';
import { Link, Navigate } from 'react-router-dom';
import { MOUNTING_PATH } from './globalConfig';

const Agents = 'Agents';
const Clusters = 'Clusters';
const Deployments = 'Deployments';
const Logs = 'Logs';
const Services = 'Services';

export const agents = Agents.toLowerCase();
export const clusters = Clusters.toLowerCase();
export const deployments = Deployments.toLowerCase();
export const logs = Logs.toLowerCase();
export const services = Services.toLowerCase();

export const agentsPath = `${MOUNTING_PATH}${agents}`;
export const clustersPath = `${MOUNTING_PATH}${clusters}`;
export const deploymentsPath = `${MOUNTING_PATH}${deployments}`;
export const logsPath = `${MOUNTING_PATH}${logs}`;
export const servicesPath = `${MOUNTING_PATH}${services}`;

export const routes = [
  {
    key: Agents,
    element: <AgentsDashboard />,
    path: agentsPath,
  },
  {
    key: Clusters,
    element: <ClustersDashboard />,
    path: clustersPath,
  },
  {
    key: Deployments,
    element: <DeploymentsDashboard />,
    path: deploymentsPath,
  },
  {
    key: Logs,
    element: <LogsDashboard />,
    path: logsPath,
  },
  {
    key: Services,
    element: <ServicesDashboard />,
    path: servicesPath,
  },
  {
    key: 'rootToServices',
    element: <Navigate to={servicesPath} replace />,
    path: MOUNTING_PATH,
  },
  {
    key: 'noMatchToServices',
    element: <Navigate to={servicesPath} replace />,
    path: '*',
  },
];
export const tabs = [
  {
    key: Services,
    component: Link,
    label: Services,
    to: servicesPath,
  },
  {
    key: Clusters,
    component: Link,
    label: Clusters,
    to: clustersPath,
  },
  {
    key: Agents,
    component: Link,
    label: Agents,
    to: agentsPath,
  },
  {
    key: Deployments,
    component: Link,
    label: Deployments,
    to: deploymentsPath,
  },
  {
    key: Logs,
    component: Link,
    label: Logs,
    to: logsPath,
  },
];

const threshold = config.TASK_CHURN_DETECTION_TIME_THRESHOLD;
const comparisonDate = moment().subtract(threshold, 'minutes');

export const scanServiceEventsForTaskChurn = (services) => {
  return services.map((service) => {
    const churnEvents = service.events.filter((e) => {
      // if the message includes HAS STARTED, AND the event is within the threshold
      return (
        e.message.indexOf('has started') !== -1 &&
        moment(e.createdAt) >= comparisonDate
      );
    });

    return {
      serviceName: service.serviceName,
      churnEvents,
      isChurnDetected:
        churnEvents.length >= config.TASK_CHURN_DETECTION_BUFFER_COUNT,
    };
  });
};
