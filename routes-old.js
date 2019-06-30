module.exports = function(app) {

  // Old routes from Wix
  app.get('/#!about/c1wk9', function(req, res) { res.redirect(301, '/about') });
  app.get('/#!meet-the-owners/c1nww', function(req, res) { res.redirect(301, '/about') });
  app.get('/#!daycare/c1sxb', function(req, res) { res.redirect(301, '/daycare') });
  app.get('/#!enrollment-requirements/c1y8v', function(req, res) { res.redirect(301, '/health') });
  app.get('/#!info/c1f7c', function(req, res) { res.redirect(301, '/terms') });
  app.get('/#!daycare-webcams/c88j', function(req, res) { res.redirect(301, '/webcams') });
  app.get('/#!vaccination-requirements/c4cc', function(req, res) { res.redirect(301, '/health') });
  app.get('/#!policies-and-hours/cpp7', function(req, res) { res.redirect(301, '/terms') });
  app.get('/#!grooming/citr', function(req, res) { res.redirect(301, '/spa') });
  app.get('/#!gallery/cv41', function(req, res) { res.redirect(301, '/') });
  app.get('/#!price-menu/cbon', function(req, res) { res.redirect(301, '/') });
  app.get('/#!blank/c20vl', function(req, res) { res.redirect(301, '/reservation') });
  app.get('/#!new-guest/c24yx', function(req, res) { res.redirect(301, '/reservation') });
  app.get('/#!returning-guests/c1va1', function(req, res) { res.redirect(301, '/reservation') });
  app.get('/#!contact/c2q4', function(req, res) { res.redirect(301, '/contact') });
};