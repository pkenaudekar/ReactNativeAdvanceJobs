import axios from 'axios';
import geo2zip from 'geo2zip';
import qs from 'qs';

import {
  FETCH_JOBS,
  LIKE_JOB,
  CLEAR_LIKED_JOBS,
  CLEAR_FETCHED_JOBS,
} from './types';

import JOB_DATA from '../reducers/IndeedJobData.json';

const JOB_ROOT_URL = 'https://api.indeed.com/ads/apisearch?';
const JOB_QUERY_PARAMS = {
  publisher: '4201738803816157',
  format: 'json',
  v: '2',
  latlong: 1,
  radius: 10,
  q: 'javascript',
};

const buildJobsUrl = (zip) => {
  const query = qs.stringify({ ...JOB_QUERY_PARAMS, l: zip });
  return `${JOB_ROOT_URL}${query}`;
};

export const fetchJobs = (region, callback) => async (dispatch) => {
  try {
    //let zip = await reverseGeocode(region);
    let zip = await geo2zip(region);
    const url = buildJobsUrl(zip);
    //console.log(url);
    //let { data } = await axios.get(url);
    //dispatch({ type: FETCH_JOBS, paylod: data });
    dispatch({ type: FETCH_JOBS, payload: JOB_DATA });
    //console.log(JOB_DATA);
    callback();
  } catch (e) {
    console.error(e);
  }
};

export const clearFetchedJobs = () => {
  return {
    type: CLEAR_FETCHED_JOBS,
  };
};

export const likeJob = (job) => {
  return {
    payload: job,
    type: LIKE_JOB,
  };
};

export const clearLikedJobs = () => {
  return { type: CLEAR_LIKED_JOBS };
};
