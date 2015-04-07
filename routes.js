module.exports = function(app, emailProvider) {
  function setNav(nav, active) {
    if(nav == null) {
      nav = {};
    }
    nav[active] = true;
    return nav;
  }

  function notFound(res) {
    res.status(404).render('not-found.html', {
      title: 'The page you are looking for was not found',
      description: 'Oops, it looks like one of us made a mistake.  The page could not be found to be displayed.'
    });
  }

  function newReservation(res, reservation) {
    res.render('new-reservation.html', {
      title: '',
      description: '',
      nav: setNav(null, 'reservation'),
      disableReservationMenu: true,
      reservation: reservation
    });
  }

  function returningReservation(res, reservation) {
    res.render('returning-reservation.html', {
      title: '',
      description: '',
      nav: setNav(null, 'reservation'),
      disableReservationMenu: true,
      reservation: reservation
    });
  }

  app.get('/', function(req, res) {
    res.render('home.html', {
      title: 'Dog Hotel and Daycare - Dog Daycare Chicago, Dog Boarding Chicago',
      description: 'Dog hotel and daycare offering boarding and daycare services on 1030 N Halsted Chicago, IL 60642 ' +
      '24 hours a day'
    });
  });

  app.get('/about', function(req, res) {
    res.render('about.html', {
      title: '',
      description: '',
      nav: setNav(null, 'about')
    });
  });

  app.get('/boarding', function(req, res) {
    res.render('boarding.html', {
      title: '',
      description: '',
      nav: setNav(null, 'boarding')
    });
  });

  app.get('/contact', function(req, res) {
    res.render('contact.html', {
      title: '',
      description: '',
      nav: setNav(null, 'contact')
    });
  });

  app.post('/contact', function(req, res) {
    var contactMessage = req.body;
    var email = new emailProvider.Email();
    var message = '<p>Phone Number: ' + contactMessage.phone + '</p>';
    message += contactMessage.message;

    email.addTo(process.env.CONTACT_EMAIL);
    email.setFrom(contactMessage.email);
    email.setSubject('Message from dogchicago.com (' + contactMessage.name + ')');
    email.setHtml(message);

    emailProvider.send(email);

    res.redirect('/contact-sent');
  });

  app.get('/contact-sent', function(req, res) {
    res.render('contact-sent', {
      title: '',
      description: ''
    });
  });

  app.get('/daycare', function(req, res) {
    res.render('daycare.html', {
      title: '',
      description: '',
      nav: setNav(null, 'daycare')
    });
  });

  app.post('/claim-reservation', function(req, res) {
    var reservation = req.body;
    if(reservation.newGuest) {
      newReservation(res, reservation);
    }
    else {
      returningReservation(res, reservation);
    }
  });

  app.get('/privacy', function(req, res) {
    res.render('privacy-policy.html', {
      title: 'Dog Hotel and Daycare Privacy Policy',
      description: ''
    });
  });

  app.get('/reservation/confirmed', function(req, res) {
    res.render('reservation-confirmed.html', {
      title: '',
      description: '',
      nav: setNav(null, 'reservation'),
      disableReservationMenu: true
    });
  });

  app.get('/reservation/new', function(req, res) {
    newReservation(res);
  });

  app.post('/reservation/new', function(req, res) {
    throw new Error('Not implemented yet.');
  });

  app.get('/reservation/returning', function(req, res) {
    returningReservation(res);
  });

  app.post('/reservation/returning', function(req, res) {
    throw new Error('Not implemented yet.');
  });

  app.get('/spa', function(req, res) {
    res.render('spa.html', {
      title: '',
      description: '',
      nav: setNav(null, 'spa')
    });
  });

  app.get('/stylesheet', function(req, res) {
    res.render('stylesheet.html', {
      title: 'Stylesheet for Dog Hotel and Daycare',
      description: 'This is just used for development and viewing changes to the styles.'
    })
  });

  app.get('/terms', function(req, res) {
    res.render('terms.html', {
      title: 'Dog Hotel and Daycare Terms and Conditions',
      description: ''
    });
  });
};