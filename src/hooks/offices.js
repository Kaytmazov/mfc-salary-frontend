import { useQuery } from 'react-query';

import * as OfficesApi from '../api/offices';

// Получение списка филиалов
export const useOfficesQuery = () => {
  return useQuery(['offices'], OfficesApi.get);
};
