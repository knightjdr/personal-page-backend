const Datastore = require('@google-cloud/datastore');

const Config = require('./config');

// Creates a client
const datastore = new Datastore({
  projectId: Config.GCLOUD_PROJECT,
});

const Blog = {
  all: () => (
    new Promise((resolve) => {
      // Create query.
      const query = datastore
        .createQuery('Blog')
        .order('date', {
          descending: true,
        });

      // Run query.
      datastore.runQuery(query).then((results) => {
        const entries = results[0].map(entry => ({
          date: entry.date,
          details: entry.details,
          title: entry.title,
        }));
        resolve({
          body: { entries },
          status: 200,
        });
      });
    })
  ),
  latest: () => (
    new Promise((resolve) => {
      const query = datastore
        .createQuery('Blog')
        .limit(1)
        .order('date', {
          descending: true,
        });

      // Run query.
      datastore.runQuery(query).then((result) => {
        const latest = {
          date: result[0][0].date,
          details: result[0][0].details,
          title: result[0][0].title,
        };
        resolve({
          body: { latest },
          status: 200,
        });
      });
    })
  ),
  title: title => (
    new Promise((resolve) => {
      const query = datastore
        .createQuery('Blog')
        .limit(1)
        .filter('title', title);

      // Run query.
      datastore.runQuery(query).then((results) => {
        if (results[0][0]) {
          const entry = {
            date: results[0][0].date,
            details: results[0][0].details,
            title: results[0][0].title,
          };
          resolve({
            body: { entry },
            status: 200,
          });
        } else {
          resolve({
            status: 404,
          });
        }
      });
    })
  ),
};
module.exports = Blog;
