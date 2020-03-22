const prismicService = require('../services/prismicService');

const getAllArticle = (typeName='article', lang='en', pageSize=10, req) => {
  try {
    return prismicService.getAllArticle(typeName, lang, pageSize, (req.params.pageNumber || 1), null);
  }
  catch (err) {
      console.log(err);
  }
};

const getArticle = (typeName='article', req) => {
  try {
    return prismicService.getArticle(typeName, req.params.recordUid);
  }
  catch (err) {
      console.log(err);
  }
};

const getByArticleCategory = async (typeName='article', lang='en', pageSize=10, categoryTypeName="category", categoryTypeIdName="name", req) => {
  try {
    return prismicService.getAllArticle(typeName, lang, pageSize, (req.params.pageNumber || 1), await prismicService.getArticleCategoryId(categoryTypeName, categoryTypeIdName, req.params.categoryName));
  }
  catch (err) {
      console.log(err);
  }
};


module.exports = {
  getAllArticle,
  getArticle,
  getByArticleCategory
};
