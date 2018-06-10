const Datastore = require('@google-cloud/datastore');

const Config = require('./config');

// Creates a client
const datastore = new Datastore({
  projectId: Config.GCLOUD_PROJECT,
});

const BlogAll = (res) => {
  // Create query.
  const query = datastore
    .createQuery('Blog')
    .order('date', {
      descending: true,
    });

  // Run query.
  datastore.runQuery(query).then((results) => {
    const blogEntries = results[0];
    res.status(200).json({ entries: blogEntries }).end();
  });
};
module.exports = BlogAll;
