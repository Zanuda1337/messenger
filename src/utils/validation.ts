export const required = (label: string): string => `${label} is required`;
export const userNameRule = (value: string): boolean | string =>
  /^[a-zA-Z0-9_]+/.exec(value) === null ||
  /^[a-zA-Z0-9_]+/.exec(value)?.at(0)?.length === value.length ||
  'This username is invalid';
