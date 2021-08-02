import { gql, graphQLClient } from '../services/apiService';
import getErrorText from '../utils/getErrorText';

const OFFICES_QUERY = gql`
  {
    allOffices {
      id
      name
    }
  }
`;

// Получение списка филиалов
export const get = async () => {
  return graphQLClient
    .request(OFFICES_QUERY)
    .then(({ allOffices }) => allOffices)
    .catch((error) => {
      throw new Error(getErrorText(error));
    });
};
