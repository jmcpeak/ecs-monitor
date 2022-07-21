import { useMatch } from 'react-router-dom';
import {
  agentsPath,
  clustersPath,
  deploymentsPath,
  servicesPath,
} from '../consts';
import useClusterTitle from './useClusterTitle';
import useDeploymentTitle from './useDeploymentTitle';
import useServiceTitle from './useServiceTitle';

const EMPTY = ['title', 'subtitle'];

const useTitle = () => {
  const cluster = useClusterTitle();
  const deployment = useDeploymentTitle();
  const service = useServiceTitle();
  const isAgent = useMatch(agentsPath);
  const isCluster = useMatch(clustersPath);
  const isDeployment = useMatch(deploymentsPath);
  const isService = useMatch(servicesPath);

  if (isService) {
    return service;
  }

  if (isCluster || isAgent) {
    return cluster;
  }

  if (isDeployment) {
    return deployment;
  }

  return EMPTY;
};

export default useTitle;
