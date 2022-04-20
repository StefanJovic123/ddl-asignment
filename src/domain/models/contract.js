const defaultFields = [
  'id',
  'terms',
  'status',
  'client'
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