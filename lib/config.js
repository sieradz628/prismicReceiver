require('dotenv').config();
const axios = require('axios');
const { getProps } = require('../lib/helpers/objectHelper');

!getProps( () => process.env.PRISMIC_APIURL) ? console.log(Error("Missing PRISMIC_APIURL in .env")) : null;
!getProps( () => process.env.PRISMIC_TOKEN) ? console.log(Error("Missing PRISMIC_TOKEN in .env")) : null;

const apiUrl = process.env.PRISMIC_APIURL;
const token = process.env.PRISMIC_TOKEN;

const fixQuery = (query) => {
  return query
    .replace(/\[/g, '%5B')
    .replace(/\]/g, '%5D')
    .replace(/\,/g, '%2C')
    .replace(/\"/g, '%22')
    .replace(/\s/g, '+');
};

const prepareQuery = (queries) => {
  return queries.map(query => {
    return `&${fixQuery(query)}`;
  });
};

const query = (queries) => new Promise(resolve => {
  axios.get(`${apiUrl}?access_token=${token}`)
    .then(responseToken => {
      const preparedQuery = prepareQuery(queries);
      const requestUrl = `${apiUrl}/documents/search?ref=${responseToken.data.refs[0].ref}&access_token=${token}&format=json${preparedQuery.join('')}`;
        axios.get(requestUrl)
          .then(result => {
            resolve(result);
          }).catch(err => {
            console.log('No data is available. Make sure you entered the correct parameters in routes.js');
            console.log(Error(err));
          });
    }).catch(err => {
      console.log('Error receiving access token. Make sure you provided the correct access data in .env (PRISMIC_APIURL and PRISMIC_TOKEN)');
      console.log(Error(err));
    });
});

module.exports = {
  query
};
