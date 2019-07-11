import axios from 'axios';
import cheerio from 'cheerio';
import isDev from 'electron-is-dev';

const Retrieve = {};
const instance = axios.create();
// Enable Cors Anywhere for development
if (isDev) {
  instance.defaults.baseURL = 'https://cors-anywhere.herokuapp.com/';
} else {
  instance.defaults.baseURL = 'https://';
}

/**
 * This function retrieves all the data from users profile.
 * @param {string} username - Users profile
 * @returns {Number} Error code of the response
 */
Retrieve.get = async username => {
  const response = await instance.get(`leetcode.com/${username}`);
  const $ = cheerio.load(response.data);
  return {
    avatar: $('.img-rounded').attr('src'),
    realname: $('.realname').attr('title')
  };
};

export default Retrieve;
