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
Retrieve.getProfileInfo = async username => {
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

Retrieve.dateToString = (date, ago = 0) => {
  function pad(num) {
    return num < 10 ? '0' + num : num;
  }
  date = new Date(date - ago);
  let month = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec'
  ];

  return `${month[date.getMonth()]}, ${pad(
    date.getDate()
  )}, ${date.getFullYear()}`;
};

Retrieve.PREV_LIMIT = 60 * 60 * 1000 * 24 * 16; /* 15 days ago */
Retrieve.NEXT_LIMIT = 60 * 60 * 1000 * 24 * 10; /* 15 days ago */

Retrieve.getHeatmap = async username => {
  const response = await instance.get(
    `leetcode.com/api/user_submission_calendar/${username}`
  );
  let submissions = JSON.parse(response.data);
  let res = [];
  var now = new Date();

  for (let key in submissions) {
    var d = new Date(key * 1000);
    if (now - d >= Retrieve.PREV_LIMIT) {
      continue;
    }
    res.push({
      date: d,
      count: submissions[key]
    });
  }
  return res;
};

export default Retrieve;
