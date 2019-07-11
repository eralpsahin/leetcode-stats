import axios from 'axios';
import cheerio from 'cheerio';

const instance = axios.create({
  headers: { 'Access-Control-Allow-Origin': '*' }
});

const Retrieve = {};

/**
 * This function retrieves all the data from users profile.
 * @param {string} username - Users profile
 * @returns {Number} Error code of the response
 */
Retrieve.get = async username => {
  const response = await instance.get(
    `https://cors-anywhere.herokuapp.com/https://leetcode.com/${username}`
  );
  const $ = cheerio.load(response.data);

  return {
    avatar: $('.img-rounded').attr('src'),
    realname:
      $('.realname').attr('title').length <= 1
        ? 'LeetCode Stats'
        : $('.realname').attr('title')
  };
};

export default Retrieve;
