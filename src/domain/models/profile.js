const defaultFields = [
  'id',
  'firstName',
  'lastName',
  'profession:',
  'balance',
  'type',
];

export default {
  read: {
    defaultFields
  },
  create: {
    returnFields: defaultFields
  },
  update: {
    returnFields: defaultFields
  },
}; 