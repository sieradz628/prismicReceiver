# prismicReceiver

### 1 your prismic access: 
Using v2 of prismic please add to your `.env`:
```
PRISMIC_APIURL=entry point for your API access
PRISMIC_TOKEN=permanent access tokens

```

#### Example:
```
PRISMIC_APIURL=https://REPOSITORY_NAME.cdn.prismic.io/api/v2
PRISMIC_TOKEN=WEDaerg3232tfWfawf32f4g2.SAd22d-44f-fef-_sadr23-433-454-4wq_we43c23-9Wd-_vUU454Cvv73vv73vv73vv70XGe-_ve-_ve-_ve-_ve-_vQ
```

### 2 Add prismic-receiver in your routers.js
```javascript
const prismicReceiver = require('prismic-receiver');
```

### 3 How to use it?
In your routers.js:
```javascript
// get all articles
router.all('/', async (req, res) => { 
  res.render('Index', await prismicReceiver.getAllArticle([API ID], [language], [pageSize], req) ); 
});

// get a specific article
router.all('/blog/:recordUid', async (req, res) => { 
  res.render('Article', await prismicReceiver.getArticle([API ID], req) ); 
});

// get specific page, next or prev page for articles (pagination for articles)
router.all('/page/:pageNumber', async (req, res) => { 
  res.render('Index', await prismicReceiver.getAllArticle([API ID], [language], [pageSize], req) ); 
});

// get all articles for a specific category
router.all('/category/:categoryName', async (req, res) => { 
  res.render('Category', await prismicReceiver.getByArticleCategory([API ID], [language], [pageSize], [API ID for category], [API ID Key Text field for category], req) ); 
});

// get all articles for a specific category using pagination to display specific page, next or prev page (pagination for category)
router.all('/category/:categoryName/page/:pageNumber', async (req, res) => { 
  res.render('Category', await prismicReceiver.getByArticleCategory([API ID], [language], [pageSize], [API ID for category], [API ID Key Text field for category], req) ); 
});

```
* Routes Variable
  * `pageNumber` - variable specifying the number of displayed articles on the page
  * `categoryName` - variable specifying the name of the category
  * `recordUid` - variable specifying the unique ID name for the article (you definitely need to use UID in your articles in prismic)
* Methods:
  * `getAllArticle` - access to all your articles from the given API ID
  * `getArticle` - selected specific article based on UID
  * `getByArticleCategory` - articles from the given API ID for specific category
* Arguments:
  * `API ID` - your custom types name for API ID
  * `language` - the language you want to get data from
  * `pageSize` - how many artice you prefer for page 
  * `API ID for category` - if you want to display categories, you must enter the custom types name for the category
  * `API ID Key Text field for category` - it's a filed name for Key Text of your category

#### Example:
```javascript
// get all articles
router.all('/', async (req, res) => { 
  res.render('Index', await prismicReceiver.getAllArticle('article', 'en', 10, req) ); 
});

// get a specific article
router.all('/blog/:recordUid', async (req, res) => { 
  res.render('Article', await prismicReceiver.getArticle('article', req) ); 
});

// get specific page, next or prev page for articles (pagination for articles)
router.all('/page/:pageNumber', async (req, res) => { 
  res.render('Index', await prismicReceiver.getAllArticle('article', 'en', 10, req) ); 
});

// get all articles for a specific category
router.all('/category/:categoryName', async (req, res) => { 
  res.render('Category', await prismicReceiver.getByArticleCategory('article', 'en', 10, "article_category", "name", req) ); 
});

// get all articles for a specific category using pagination to display specific page, next or prev page (pagination for category)
router.all('/category/:categoryName/page/:pageNumber', async (req, res) => { 
  res.render('Category', await prismicReceiver.getByArticleCategory('article', 'en', 10, "article_category", "name", req) ); 
});
```

### 4 Now in your views you have access to data from prismic:
for example in ReactJS:
```javascript
console.log(props.data);
```

### 5 Additional information: :grey_exclamation:
1. `axios` and `dotenv` are demanding dependencies for the package to work properly,
2. The articles are served according to the time of creation - `DESC`
