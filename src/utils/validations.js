// Временно
/* eslint-disable no-unused-vars */
import { string, number, object, date, addMethod, setLocale } from 'yup';
import validationSchemaLocale from './validationSchemaLocale';

setLocale(validationSchemaLocale);

// Проверка номера телефона
// const checkPhoneNumber = (msg) => {
//   return string().length(18, msg || 'Невалидный номер телефона');
// };

const checkPhoneNumber = (msg) => {
  return string().test({
    name: 'checkPhoneNumber',
    message: msg || 'Невалидный номер телефона',
    test: (value) => value === '' || value.length === 18,
  });
};

// Проверка документа, удостоверяющего личность
const checkIdentityDocSerial = (msg) => {
  return string().test({
    name: 'checkIdentityDocSerial',
    message: msg || 'Невалидная серия документа',
    test: (value) => value === '' || value.length === 5,
  });
};
const checkIdentityDocNumber = (msg) => {
  return string().test({
    name: 'checkIdentityDocSerial',
    message: msg || 'Невалидный номер документа',
    test: (value) => value === '' || value.length === 6,
  });
};
const checkIdentityDocCode = (msg) => {
  return string().test({
    name: 'checkIdentityDocSerial',
    message: msg || 'Невалидный код подразделения',
    test: (value) => value === '' || value.length === 7,
  });
};

// Проверка контрольной суммы ОРГНИП
const isOGRNIP = (value) => {
  const valueToString = value ? value.toString() : '';
  if (valueToString.length === 15) {
    const num14 = Math.floor((value / 10) % 13);
    const dgt15 = num14 % 10;
    return parseInt(value.toString()[14], 10) === dgt15;
  }
  return false;
};

// Проверка контрольной суммы ОРГН
const isOGTN = (value) => {
  const valueToString = value ? value.toString() : '';
  if (valueToString.length === 13) {
    const num12 = Math.floor((value / 10) % 11);
    const dgt13 = num12 === 10 ? 0 : num12;
    return parseInt(valueToString[12], 10) === dgt13;
  }
  return false;
};

// Проверка контрольной суммы КПП
const isKPP = (value) => {
  const valueToString = value ? value.toString() : '';
  if (valueToString.length !== 9) return false;
  if (!valueToString.match(/\d{4}[\dA-Z][\dA-Z]\d{3}/)) return false;
  return true;
};

// Проверка контрольной суммы ИНН физического лица и ИП
const checkInnIndividual = (msg) => {
  return string().test({
    name: 'checkInnIndividual',
    exclusive: false,
    message: msg || 'Невалидный ИНН',
    test: (value) => {
      const valueToString = value ? value.toString() : '';
      const getN = (index) => parseInt(valueToString[index], 10);

      if (valueToString.length === 0) {
        return true;
      }

      if (valueToString.length === 12) {
        const dgt11 =
          ((7 * getN(0) +
            2 * getN(1) +
            4 * getN(2) +
            10 * getN(3) +
            3 * getN(4) +
            5 * getN(5) +
            9 * getN(6) +
            4 * getN(7) +
            6 * getN(8) +
            8 * getN(9)) %
            11) %
          10;

        const dgt12 =
          ((3 * getN(0) +
            7 * getN(1) +
            2 * getN(2) +
            4 * getN(3) +
            10 * getN(4) +
            3 * getN(5) +
            5 * getN(6) +
            9 * getN(7) +
            4 * getN(8) +
            6 * getN(9) +
            8 * getN(10)) %
            11) %
          10;

        return getN(10) === dgt11 && getN(11) === dgt12;
      }

      return false;
    },
  });
};

// Проверка контрольной суммы ИНН юридического лица
const checkInnLegalEntity = (msg) => {
  return string().test({
    name: 'checkInnIndividual',
    exclusive: false,
    message: msg || 'Невалидный ИНН',
    test: (value) => {
      const valueToString = value ? value.toString() : '';
      const getN = (index) => parseInt(valueToString[index], 10);

      if (valueToString.length === 0) {
        return true;
      }

      if (valueToString.length === 10) {
        const dgt10 =
          ((2 * getN(0) +
            4 * getN(1) +
            10 * getN(2) +
            3 * getN(3) +
            5 * getN(4) +
            9 * getN(5) +
            4 * getN(6) +
            6 * getN(7) +
            8 * getN(8)) %
            11) %
          10;
        return getN(9) === dgt10;
      }

      return false;
    },
  });
};

// Проверка контрольной суммы СНИЛС
const checkSnils = (msg) => {
  return string().test({
    name: 'checkSnils',
    exclusive: false,
    message: msg || 'Невалидный СНИЛС',
    test: (value) => {
      if (!value) return true;

      if (value.length === 14) {
        const expectedValue = value.replace(/\D/g, '');
        let sum = 0;

        for (let i = 0; i < 9; i += 1) {
          sum += parseInt(expectedValue[i], 10) * (9 - i);
        }

        let checkDigit = 0;
        if (sum < 100) {
          checkDigit = sum;
        } else if (sum > 101) {
          checkDigit = sum % 101;
          if (checkDigit === 100) {
            checkDigit = 0;
          }
        }

        return checkDigit === parseInt(expectedValue.slice(-2), 10);
      }

      return false;
    },
  });
};

// Проверка валидности БИК
const checkBIK = (value) => {
  if (!/^\d{9}$/.test(value)) return false;
  const thirdPart = value.slice(-3);
  if (+thirdPart === 0 || +thirdPart === 1 || +thirdPart === 2) return true;
  return +thirdPart >= 50 && +thirdPart < 1000;
};

// Проверка валидности расчётного счёта
const checkPaymentAccount = (value, bik) => {
  const valueToString = value ? value.toString() : '';
  if (checkBIK(bik)) {
    if (!/[^0-9]/.test(valueToString) && valueToString.length === 20) {
      const bikRs = bik.toString().slice(-3) + valueToString;
      const coefficients = [7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1];
      let checkSum = 0;

      coefficients.forEach((it, idx) => {
        checkSum += it * (Number(bikRs[idx]) % 10);
      });

      return checkSum % 10 === 0;
    }
  }
  return false;
};

const checkCorrespondentAccount = (value, bik) => {
  const valueToString = value ? value.toString() : '';
  if (checkBIK(bik)) {
    if (!/[^0-9]/.test(valueToString) && valueToString.length === 20) {
      const bikKs = `0${bik.slice(4, 6)}${valueToString}`;
      const coefficients = [7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1];
      let checkSum = 0;

      coefficients.forEach((it, idx) => {
        checkSum += it * (Number(bikKs[idx]) % 10);
      });

      return checkSum % 10 === 0;
    }
  }
  return false;
};

// Проверка контрольной суммы ОКАТО
const checkOKATO = (value) => {
  if (!value) return false;
  const { length } = value;
  if (length < 3) return false;

  const getWeight = (index) => {
    if (index < 10) return index + 1;
    return (index % 10) + 1;
  };

  const getExpectedValue = () => {
    if (length < 4) return value.slice(-1);
    if (length >= 4 && length < 6) return value.substr(0, 3).slice(-1);
    if (length >= 6 && length < 9) return value.substr(0, 6).slice(-1);
    return value.substr(0, 9).slice(-1);
  };

  const expectedValue = Number(getExpectedValue());

  const getTestingString = () => {
    if (length < 3) return value;
    if (length >= 3 && length < 5) return value.substr(0, 2);
    if (length >= 5 && length < 8) return value.substr(0, 5);
    return value.substr(0, 8);
  };

  const valueStr = getTestingString();

  let summ = 0;

  valueStr.split('').forEach((it, idx) => {
    summ += Number(valueStr[idx]) * getWeight(Number(idx));
  });

  const del11 = summ % 11;
  const check = del11 === 10 ? 0 : del11;
  if (length > 9 && check === del11) return true;
  if (check === expectedValue) return true;
  return false;
};

// Проверка контрольной суммы ОКПО
const checkOKPO = (value) => {
  if (!value) return false;
  const expectedValue = Number(value.slice(-1));

  const getWeight = (index) => {
    if (index < 10) return index + 1;
    return (index % 10) + 1;
  };

  const testingValue = value.slice(0, -1);
  let summ = 0;

  testingValue.split('').forEach((it, idx) => {
    summ += Number(testingValue[idx]) * getWeight(Number(idx));
  });

  let del11 = summ % 11;
  if (del11 === 10) {
    summ = 0;

    testingValue.split('').forEach((it, idx) => {
      summ += Number(testingValue[idx]) * (getWeight(Number(idx)) + 2);
    });

    del11 = del11 === 10 ? 0 : del11;
  }
  return del11 === expectedValue;
};

function checkPayment(ref, msg) {
  return this.test({
    name: 'checkPaymentMethod',
    exclusive: false,
    message: msg || 'accountNumber not valid', // Сообщение об ошибке
    params: { reference: ref ? ref.path : undefined },
    test(value) {
      return checkPaymentAccount(value, this.resolve(ref)); // Функция валидации
    },
  });
}

addMethod(string, 'checkPaymentMethod', checkPayment);

addMethod(string, 'phone', checkPhoneNumber);
addMethod(string, 'identityDocSerial', checkIdentityDocSerial);
addMethod(string, 'identityDocNumber', checkIdentityDocNumber);
addMethod(string, 'identityDocCode', checkIdentityDocCode);
addMethod(string, 'innIndividual', checkInnIndividual);
addMethod(string, 'innLegalEntity', checkInnLegalEntity);
addMethod(string, 'snils', checkSnils);
