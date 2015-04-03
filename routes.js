module.exports = function(app) {
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
      '24 hours a day',
      nav: setNav(null, 'reservation')
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

  app.get('/reservation/returning', function(req, res) {
    returningReservation(res);
  });

  app.get('/spa', function(req, res) {
    res.render('spa.html', {
      title: '',
      description: '',
      nav: setNav(null, 'spa')
    });
  });
};