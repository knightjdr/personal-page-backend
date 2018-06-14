const BlogAll = datastore => (
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
);
module.exports = BlogAll;
