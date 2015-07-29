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
    message += contactMessage.message;

    var email = new emailProvider.Email();
    email.addTo(process.env.CONTACT_EMAIL);
    email.setFrom(contactMessage.email);
    email.setSubject('Message from dogchicago.com (' + contactMessage.name + ')');
    email.setHtml(message);

    emailProvider.send(email);
    console.log('Contact form email was sent from' + contactMessage.email + '.');

    res.redirect('/contact-sent');
  });

  app.get('/contact-sent', function(req, res) {
    res.render('contact-sent', {
      title: 'Dog Hotel and Daycare - Contact Sent',
      description: 'Thank you for contacting us, we will get back to you as soon as possible.'
    });
  });

  app.post('/claim-reservation', function(req, res) {
    var reservation = req.body;
    var isNewGuest = (reservation.newGuest == 'true');
    if(isNewGuest) {
      newReservation(res, reservation);
    }
    else {
      returningReservation(res, reservation);
    }
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

  app.get('/privacy', function(req, res) {
    res.render('privacy-policy.html', {
      title: 'Dog Hotel and Daycare Privacy Policy',
      description: ''
    });
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

  app.post('/reservation/new', function(req, res) {
    var reservation = req.body;
    console.log('New reservation requested');
    console.log(reservation);

    var message = '<h1>New Reservation</h1><h2>Customer Info</h2>' +
    '<p><label style="font-weight: bold;">Drop Off</label><br>' + reservation.dropOff + '</p>' +
    '<p><label style=\'font-weight: bold;\'>Pick Up</label><br>' + reservation.pickUp + '</p>' +
    '<p><label style=\'font-weight: bold;\'>Owner\'s Name</label><br>' + reservation.ownerFirstName + ' ' + reservation.ownerLastName + '</p>' +
    '<p><label style=\'font-weight: bold;\'>Address</label><br>' + reservation.street1 + '<br>' + reservation.street2 + '<br>' + reservation.city + '<br>' + reservation.state + '<br>' + reservation.zipcode + '</p>' +
    '<p><label style=\'font-weight: bold;\'>Email Address</label><br>' + reservation.email + '</p>' +
    '<p><label style=\'font-weight: bold;\'>Phone Number</label><br>' + reservation.phone + '</p>' +
    '<p><label style=\'font-weight: bold;\'>Alt. Phone Number</label><br>' + reservation.altPhone + '</p>' +
    '<p><label style=\'font-weight: bold;\'>Vet / Clinic</label><br>' + reservation.vetName + '</p>' +
    '<p><label style=\'font-weight: bold;\'>Vet Phone Number</label><br>' + reservation.vetPhone + '</p>' +
    '<p><label style=\'font-weight: bold;\'>Emergency Contact</label><br>' + reservation.emergencyContactName + '</p>' +
    '<p><label style=\'font-weight: bold;\'>Emergency Phone Number</label><br>' + reservation.emergencyPhone + '</p>' +
    '<p><label style=\'font-weight: bold;\'>Notes / Comments</label><br>' + reservation.notes + '</p>' +
    '<p><label style=\'font-weight: bold;\'>Hear about us?</label><br>' + reservation.marketing + '</p><hr><h3>Guest Info</h3>';

    if(reservation.numberOfGuests > 1) {
      for(var i = 0; i < reservation.numberOfGuests; i++) {
        var traitsMultiple = '';
        if(reservation.isShy && reservation.isShy[i]) { traitsMultiple += 'Shy '; }
        if(reservation.isNervous && reservation.isNervous[i]) { traitsMultiple += 'Nervous '; }
        if(reservation.isSocial && reservation.isSocial[i]) { traitsMultiple += 'Social '; }
        if(reservation.isDogAggressive && reservation.isDogAggressive[i]) { traitsMultiple += 'Dog Aggressive '; }
        if(reservation.isPeopleAggressive && reservation.isPeopleAggressive[i]) { traitsMultiple += 'People Aggressive '; }
        if(reservation.isOther && reservation.isOther[i]) { traitsMultiple += 'Other'; }

        message += '<p><label style=\'font-weight: bold;\'>Pet\'s Name</label><br>' + reservation.petName[i] + '</p>' +
        '<p><label style=\'font-weight: bold;\'>Room</label><br>' + reservation.suite[i] + '</p>' +
        '<p><label style=\'font-weight: bold;\'>Dog Breed</label><br>' + reservation.breed[i] + '</p>' +
        '<p><label style=\'font-weight: bold;\'>Dog Age</label><br>' + reservation.petBirthdate[i] + '</p>' +
        '<p><label style=\'font-weight: bold;\'>Spay / Neuter Status</label><br>' + reservation.spayedStatus[i] + '</p>' +
        '<p><label style=\'font-weight: bold;\'>Weight</label><br>' + reservation.weight[i] + '</p>' +
        '<p><label style=\'font-weight: bold;\'>Color</label><br>' + reservation.color[i] + '</p>' +
        '<p><label style=\'font-weight: bold;\'>Room</label><br>' + reservation.suite[i] + '</p>' +
        '<p><label style=\'font-weight: bold;\'>Personality</label><br>' + traitsMultiple + '</p>' +
        '<p><label style=\'font-weight: bold;\'>Medical Notes</label><br>' + reservation.medicalNotes[i] + '</p><hr>';
      }
    }
    else {
      var traitsSingle = '';
      if(reservation.isShy) { traitsSingle += 'Shy '; }
      if(reservation.isNervous) { traitsSingle += 'Nervous '; }
      if(reservation.isSocial) { traitsSingle += 'Social '; }
      if(reservation.isDogAggressive) { traitsSingle += 'Dog Aggressive '; }
      if(reservation.isPeopleAggressive) { traitsSingle += 'People Aggressive '; }
      if(reservation.isOther) { traitsSingle += 'Other'; }

      message += '<p><label style=\'font-weight: bold;\'>Pet\'s Name</label><br>' + reservation.petName + '</p>' +
      '<p><label style=\'font-weight: bold;\'>Room</label><br>' + reservation.suite + '</p>' +
      '<p><label style=\'font-weight: bold;\'>Dog Breed</label><br>' + reservation.breed + '</p>' +
      '<p><label style=\'font-weight: bold;\'>Dog Age</label><br>' + reservation.petBirthdate + '</p>' +
      '<p><label style=\'font-weight: bold;\'>Spay / Neuter Status</label><br>' + reservation.spayedStatus + '</p>' +
      '<p><label style=\'font-weight: bold;\'>Weight</label><br>' + reservation.weight + '</p>' +
      '<p><label style=\'font-weight: bold;\'>Color</label><br>' + reservation.color + '</p>' +
      '<p><label style=\'font-weight: bold;\'>Room</label><br>' + reservation.suite + '</p>' +
      '<p><label style=\'font-weight: bold;\'>Personality</label><br>' + traitsSingle + '</p>' +
      '<p><label style=\'font-weight: bold;\'>Medical Notes</label><br>' + reservation.medicalNotes + '</p>';
    }

    var email = new emailProvider.Email();
    email.addTo(process.env.CONTACT_EMAIL);
    email.setFrom(reservation.email);
    email.setSubject('New reservation from dogchicago.com (' + reservation.ownerName + ')');
    email.setHtml(message);

    emailProvider.send(email);
    console.log('Email notification sent');

    res.redirect('/reservation/confirmed');
  });

  app.get('/reservation/returning', function(req, res) {
    returningReservation(res);
  });

  app.post('/reservation/returning', function(req, res) {
    var reservation = req.body;
    console.log('Returning reservation requested');
    console.log(reservation);

    var message = '<h1>Customer Info</h1>' +
      '<p><label style="font-weight: bold;">Drop Off</label><br>' + reservation.dropOff + '</p>' +
      '<p><label style=\'font-weight: bold;\'>Pick Up</label><br>' + reservation.pickUp + '</p>' +
      '<p><label style=\'font-weight: bold;\'>Owner\'s Name</label><br>' + reservation.ownerFirstName + ' ' + reservation.ownerLastName + '</p>' +
      '<p><label style=\'font-weight: bold;\'>Phone Number</label><br>' + reservation.phone + '</p>' +
      '<p><label style=\'font-weight: bold;\'>Email Address</label><br>' + reservation.email + '</p>' +
      '<p><label style=\'font-weight: bold;\'>Notes / Comments</label><br>' + reservation.notes + '</p><hr><h2>Guest Info</h2>';

    if(reservation.numberOfGuests > 1) {
      for(var i = 0; i < reservation.numberOfGuests; i++) {
        message += '<p><label style=\'font-weight: bold;\'>Pet\'s Name</label><br>' + reservation.petName[i] + '</p>' +
        '<p><label style=\'font-weight: bold;\'>Room</label><br>' + reservation.suite[i] + '</p><hr>';
      }
    }
    else {
      message += '<p><label style=\'font-weight: bold;\'>Pet\'s Name</label><br>' + reservation.petName + '</p>' +
      '<p><label style=\'font-weight: bold;\'>Room</label><br>' + reservation.suite + '</p>';
    }


    var email = new emailProvider.Email();
    email.addTo(process.env.CONTACT_EMAIL);
    email.setFrom(reservation.email);
    email.setSubject('Returning reservation from dogchicago.com (' + reservation.ownerName + ')');
    email.setHtml(message);

    emailProvider.send(email);
    console.log('Email notification sent');

    res.redirect('/reservation/confirmed');
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

  app.get('/stylesheet', function(req, res) {
    res.render('stylesheet.html', {
      title: 'Dog Hotel and Daycare - Stylesheet',
      description: 'This is just used for development and viewing changes to the styles.'
    })
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
    })
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