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
  let problemSet = $(
    '.fa-question'
  )[0].parent.children[1].childNodes[0].data.split('/');
  let solved = +problemSet[0];
  let total = +problemSet[1];

  let solutionStats = $(
    '.fa-cog'
  )[0].parent.children[1].childNodes[0].data.split('/');
  let correct = +solutionStats[0];
  let wrong = +solutionStats[1] - correct;
  return {
    avatar: $('.img-rounded').attr('src'),
    realname: $('.realname').attr('title'),
    solved,
    total,
    correct,
    wrong
  };
};

export default Retrieve;
