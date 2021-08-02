import { v4 as uuid } from 'uuid';

// Получение списка должностей сотрудника
const get = async (id) => {
  const data = [
    {
      id: uuid(),
      officeName: 'ФГАУ РД "МФЦ в РД" по Кумторкалинскому району',
      jobPositionName: 'Специалист по субсидиям',
      rate: 1.0,
      intensity: 0.35,
      dateStart: '2020-07-07 15:01:00.741984',
      dateStop: '',
      dateAdd: '2017-07-07 15:01:00.741984',
      employeeIdAdd: '0a434664-8fd3-4754-8536-75ae3fd33e7b',
      employeeFioAdd: 'Гинзбург Наталья Петровна',
      comment: '',
    },
    {
      id: uuid(),
      officeName: 'ФГАУ РД "МФЦ в РД" по Кумторкалинскому району',
      jobPositionName: 'Администратор',
      rate: 1.0,
      intensity: 0.21,
      dateStart: '2017-10-12 15:01:00.741984',
      dateStop: '2020-07-06 15:01:00.741984',
      dateAdd: '2017-10-12 15:01:00.741984',
      employeeIdAdd: '0a434664-8fd3-4754-8536-75ae3fd33e7b',
      employeeFioAdd: 'Гинзбург Наталья Петровна',
      comment: '',
    },
  ];

  return new Promise((resolve) => {
    setTimeout(resolve(data), 200);
  });
};

export { get };
