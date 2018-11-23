export const removeCaseAndAccents = (str) => str
  .toLowerCase()
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, "");

// Ex: +551130671118
export const formatPhone = (str) => {
  if(str.charAt(0) !== '+' || str.length < 13 || str.length > 14) {
    return str;
  }

  const area = `(${str.substring(3, 5)}) `;
  const prefix = `${str.substring(5, str.length - 4)}-`;
  const suffix = str.substring(str.length - 4);

  return area + prefix + suffix;
}
