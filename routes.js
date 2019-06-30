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
      title: 'Dog Hotel and Daycare - New Guest Reservation',
      description: 'Complete your dog daycare or boarding reservation online.',
      nav: setNav(null, 'reservation'),
      disableReservationMenu: true,
      reservation: reservation,
      partials: {
        roomsPartial: 'rooms-partial',
        stateListPartial: 'state-list-partial'
      }
    });
  }

  function returningReservation(res, reservation) {
    console.log('returning');
    res.render('returning-reservation.html', {
      title: 'Dog Hotel and Daycare - Returning Guest Reservation',
      description: 'Returning guests of Dog Hotel and Daycare in Chicago, IL can quickly and easily complete their reservations online.',
      nav: setNav(null, 'reservation'),
      disableReservationMenu: true,
      reservation: reservation,
      partials: {
        roomsPartial: 'rooms-partial'
      }
    });
  }

  app.get('/', function(req, res) {
    res.render('home.html', {
      title: 'Dog Hotel and Daycare - Dog Daycare Chicago, Dog Boarding Chicago',
      description: 'Dog hotel and daycare, offering boarding and daycare services on 1030 N Halsted Chicago, IL 60642 ' +
      '24 hours a day.'
    });
  });

  app.get('/about', function(req, res) {
    res.render('about.html', {
      title: 'Dog Hotel and Daycare - Our Story',
      description: 'Learn more about Dog Hotel and Daycare in Chicago, IL.',
      nav: setNav(null, 'about')
    });
  });

  app.get('/boarding', function(req, res) {
    res.render('boarding.html', {
      title: 'Dog Hotel and Daycare - Dog Boarding',
      description: 'Find out all about our dog boarding amenities and services in Chicago, IL.',
      nav: setNav(null, 'boarding'),
      partials: {
        boardingCamsPartial: 'boarding-cams-partial',
        healthPartial: 'health-partial'
      }
    });
  });

  app.get('/contact', function(req, res) {
    res.render('contact.html', {
      title: 'Dog Hotel and Daycare - Contact Us',
      description: 'Contact us for more information or to answer any questions you may have.  We\'re here to help you with your dog daycare and boarding needs.',
      nav: setNav(null, 'contact')
    });
  });

  app.post('/contact', function(req, res) {
    var contactMessage = req.body;
    var message = '<p>Phone Number: ' + contactMessage.phone + '</p>';
    message += '<p>Email Address: ' + contactMessage.email + '</p>';
    message += contactMessage.message;

    var email = new emailProvider.Email();
    email.addTo(process.env.CONTACT_EMAIL);
    // email.setFrom(contactMessage.email);
    email.setFrom(process.env.CONTACT_EMAIL);
    email.setSubject('Message from dogchicago.com (' + contactMessage.name + ')');
    email.setHtml(message);

    // add logic to not send information if the email address is from russia
    // this is due to a lot of spam from russia that Bridget reported
    console.log(contactMessage.email.indexOf('.ru'));
    if (contactMessage.email.indexOf('.ru') === -1) {
      emailProvider.send(email);
      console.log('Contact form email was sent from ' + contactMessage.email + '.');
    }
    else {
      console.log('Contact form email was NOT sent because we assumed it was SPAM: ' + contactMessage.email);
    }
    
    res.redirect('/contact-sent');
  });

  app.get('/contact-sent', function(req, res) {
    res.render('contact-sent', {
      title: 'Dog Hotel and Daycare - Contact Sent',
      description: 'Thank you for contacting us, we will get back to you as soon as possible.'
    });
  });

  app.get('/daycare', function(req, res) {
    res.render('daycare.html', {
      title: 'Dog Hotel and Daycare - Dog Daycare',
      description: 'Chicago is a busy city, while you\'re away at work, have your dog stay with us.',
      nav: setNav(null, 'daycare'),
      partials: {
        daycareCamsPartial: 'daycare-cams-partial',
        healthPartial: 'health-partial'
      }
    });
  });

  app.get('/faq', function(req, res) {
    res.render('faq.html', {
      title: 'Dog Hotel and Daycare - FAQ',
      description: 'Get answers to your frequently asked questions from Dog Chicago.',
      nav: setNav(null, 'faq')
    });
  });

  app.get('/health', function(req, res) {
    res.render('health.html', {
      title: 'Dog Hotel and Daycare - Health Information',
      description: 'Health and safety are incredibly important at Dog Hotel and Daycare Chicago.  Find out more.',
      nav: setNav(null, 'boarding')
    })
  });

  app.get('/pricing', function(req, res) {
    res.render('pricing.html', {
      title: 'Dog Hotel and Daycare - Price Menu',
      description: 'Up-front pricing with no hidden fees for exception dog boarding and daycare.'
    });
  });

  app.get('/privacy', function(req, res) {
    res.render('privacy-policy.html', {
      title: 'Dog Hotel and Daycare Privacy Policy',
      description: 'Our privacy policy.'
    });
  });

  app.get('/reservation', function(req, res) {
    res.render('reservation.html', {
      title: 'Dog Hotel and Daycare Reservation',
      description: 'Complete your dog daycare or boarding reservation online.',
    })
  });

  app.get('/reservation/confirmed', function(req, res) {
    res.render('reservation-confirmed.html', {
      title: 'Dog Hotel and Daycare - Reservation Confirmed',
      description: 'Congratulations your dog hotel or daycare reservation has been confirmed.',
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

  app.get('/t/:id', function(req, res) {
    res.render('redirect.html');
  });

  app.get('/spa', function(req, res) {
    res.render('spa.html', {
      title: 'Dog Hotel and Daycare - Dog Spa Services',
      description: 'At Dog Hotel and Daycare in Chicago, we pamper your pup with wonderful spa services that even their owners would be jealous of.',
      nav: setNav(null, 'spa')
    });
  });

  app.get('/terms', function(req, res) {
    res.render('terms.html', {
      title: 'Dog Hotel and Daycare - Terms and Conditions',
      description: 'The terms and conditions as well as some policies for daycare and boarding.'
    });
  });

  app.get('/view-webcam', function(req, res) {
    res.render('view-webcam.html', {
      title: 'Dog Hotel and Daycare - View Webcam',
      description: 'View live feed from our doggie webcams.'
    });
  });

  app.get('/webcams', function(req, res) {
    res.render('webcams.html', {
      title: 'Dog Hotel and Daycare - Webcams',
      description: 'Available webcams at Dog Hotel and Daycare to view your pup while away.',
      partials: {
        boardingCamsPartial: 'boarding-cams-partial',
        daycareCamsPartial: 'daycare-cams-partial'
      }
    });
  });
};