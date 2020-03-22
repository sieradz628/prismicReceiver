const prismic = require('../config').query;
const { getProps } = require('../helpers/objectHelper');

const getAllArticle = (typeName="article", lang='en', pageSize=10, page=1, category=null) => new Promise ((resolve) => {
  let query = [
    `q=[[at(document.type, "${typeName}")]]`,
    `orderings=[document.first_publication_date desc]`,
    `pageSize=${pageSize}`,
    `lang=${lang}`,
    `page=${page}`,
  ];
  if (category != null) {
    query.push(`q=[[at(my.${typeName}.categories.category,"${category}")]]`);
  }
  prismic(query).then(results => {
    getProps( () => results.data.results[0]) ? resolve(results) : console.log(Error('The articles don\'t exist. Make sure you entered the correct parameters in routes.js')) & console.log(Error(error));
  });
});

const getArticle = (typeName="article", uid) => new Promise ((resolve) => {
  let query = [
    `q=[[at(my.${typeName}.uid,"${uid}")]]`,
  ];
  prismic(query).then(results => {
    getProps( () => results.data.results[0]) ? resolve(results) : console.log(Error('The article doesn\'t exist. Make sure you entered the correct parameters in routes.js')) & console.log(Error(error));
  });
});

const getArticleCategoryId = (categoryTypeName, categoryTypeIdName, categoryName) => new Promise ((resolve, reject) => {
  let query = [`q=[[at(document.type,"${categoryTypeName}")]]`, `q=[[at(my.${categoryTypeName}.${categoryTypeIdName},"${categoryName}")]]`];
  prismic(query).then(results => {
    getProps( () => results.data.results[0].id) ? resolve(results.data.results[0].id) : console.log(Error('Category doesn\'t exist. Make sure you entered the correct parameters in routes.js')) & console.log(Error(error));
  });
});

module.exports = {
  getAllArticle,
  getArticle,
  getArticleCategoryId
};
