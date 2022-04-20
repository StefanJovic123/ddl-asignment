import _ from 'lodash';
import { format as formatDate } from 'date-fns';

/**
 * Strip Starting Slash
 * @param str
 * @returns {*|string}
 */
export const stripStartingSlash = (str) => {
  return str.startsWith('/') ? str.substring(1) : str;
};

export const dateFormat = (date, format = 'yyyy-MM-dd') => formatDate(date, format);

export const map = (data, fn = (e) => e) => _.map(data, fn);

export const reduce = (data, fn, initialValue) => _.reduce(data, fn, initialValue);

export const filter = (data, fn) => _.filter(data, fn);

export const find = (data, fn) => _.find(data, fn);

export const substring = (data, start, end) => _.join(_.slice(data, start, end), '');

/**
 * Checks if passed param is array.
 * @param data
 * @return {value is any[]}
 */
export const isArray = (data) => _.isArray(data);

/**
 * Checks if passed param is object.
 * @param data
 * @return {value is object}
 */
export const isObject = (data) => _.isObject(data);

export const isString = (fn) => _.isString(fn);

export const isFunction = (fn) => _.isFunction(fn);
