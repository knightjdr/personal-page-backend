const BlogLatest = datastore => (
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
);
module.exports = BlogLatest;
