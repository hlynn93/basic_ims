import moment from 'moment';
import _ from 'lodash';
import { constants as CONST } from '../utils';

const DATE_REGEX = /[0-9]{2}-[0-9]{4}/;

const getMinMax = (dates: []=[]) => {
  const FORMAT = 'MM-YYYY';
  const filtered = dates.sort((a, b) => moment(a, FORMAT).days() - moment(b, FORMAT).days());
  return { min: filtered[0], max: filtered[filtered.length - 1] };
};

const getYearOptions = (range: {}={}) => {
  if (!range.min || !range.max) {
    return [];
  }

  const minYear = parseInt(range.min.split('-')[1], 10);
  const maxYear = parseInt(range.max.split('-')[1], 10);
  return _.range(((maxYear - minYear) + 1)).map(y => maxYear - y);
};

const getMonthOptions = (range: {}={}, currentYear: number='') => {
  if (!range.min || !range.max) {
    return [];
  }

  const min = range.min.split('-');
  const max = range.max.split('-');
  const monthArray = Object.values(CONST.MONTHS);

  if (min[1] === max[1]) {
    return monthArray.slice(parseInt(min[0], 10) - 1, parseInt(max[0], 10));
  }

  switch (currentYear) {
    case min[1]:
      return monthArray.slice(parseInt(min[0], 10) - 1, monthArray.length);
    case max[1]:
      return monthArray.slice(0, parseInt(min[0], 10));
    default: return monthArray;
  }
};

const extractDatesFromTableNames = (tables: []=[]) => {
  const result = [];
  tables.map(t => {
    const date = t.split('_')[0];
    if (date.match(DATE_REGEX)) {
      result.push(date);
    }
    return t;
  });
  return result;
};

module.exports = {
  getMinMax,
  getMonthOptions,
  getYearOptions,
  extractDatesFromTableNames
};
