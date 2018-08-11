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
          html: results[0][0].html,
          imgAlt: results[0][0].imgAlt,
          imgCredit: results[0][0].imgCredit,
          sizes: results[0][0].sizes,
          src: results[0][0].srcset,
          srcset: results[0][0].srcset,
          title: results[0][0].title,
        };
        resolve({
          body: entry,
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
