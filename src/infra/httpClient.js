/**
 * HTTP CLIENT ABSTRACTION
 * This implementation is using axios but could be changed to anything else. Want to swap for Fetch API? We would just need to apply the changes in this file.
 */
import axios from "axios";

const get = (url, payload) => {
  return axios.get(url, {
    params: payload,
  });
};

const post = (url, payload) => {
  return axios.post(url, payload);
};

export default { get, post };
