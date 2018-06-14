const Blog = require('./blog/blog');

const Routes = {
  configure: (app) => {
    // Get all blot entries.
    app.get('/blog', (req, res) => {
      Blog.all()
        .then((content) => {
          Routes.response(res, content);
        });
    });

    // Get latest blog entry.
    app.get('/blog/latest', (req, res) => {
      Blog.latest()
        .then((content) => {
          Routes.response(res, content);
        });
    });

    // Get entry by title.
    app.get('/blog/:title', (req, res) => {
      Blog.title(decodeURI(req.params.title))
        .then((content) => {
          Routes.response(res, content);
        });
    });

    // Invalid get route.
    app.get('/*', (req, res) => {
      res.status(404).send();
    });

    // Invalid methods.
    app.use((req, res) => {
      res.status(405).send();
    });
  },
  response: (res, content) => {
    // security headers
    res.setHeader('X-XSS-Protection', '1;mode=block');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.status(content.status).send(content.body);
  },
};
module.exports = Routes;
