const Datastore = require('@google-cloud/datastore');

const BlogAll = require('./blog-all');
const BlogLatest = require('./blog-latest');
const BlogTitle = require('./blog-title');
const Config = require('../config');

// Creates a client
const datastore = new Datastore({
  projectId: Config.GCLOUD_PROJECT,
});

const Blog = {
  all: () => (
    new Promise((resolve) => {
      BlogAll(datastore)
        .then((result) => {
          resolve(result);
        });
    })
  ),
  latest: () => (
    new Promise((resolve) => {
      BlogLatest(datastore)
        .then((result) => {
          resolve(result);
        });
    })
  ),
  title: title => (
    new Promise((resolve) => {
      BlogTitle(datastore, title)
        .then((result) => {
          resolve(result);
        });
    })
  ),
};
module.exports = Blog;
