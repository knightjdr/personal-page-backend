const BlogTitle = (datastore, title) => (
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
);
module.exports = BlogTitle;
