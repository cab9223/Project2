const models = require('../models');

const Domo = models.Domo;

const makerPage = (req, res) => {
  Domo.DomoModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured' });
    }

    return res.render('app', { csrfToken: req.csrfToken(), domos: docs });
  });
};

const scorePage = (req, res) => {
  Domo.DomoModel.findAll((err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured' });
    }

    return res.render('app', { csrfToken: req.csrfToken(), scores: docs });
  });
};

const makeDomo = (req, res) => {
  /* if (!req.body.name || !req.body.taunts || !req.body.hs18 || !req.body.hs17) {
    return res.status(400).json(
    { error: 'RAWR! Name, Age, and Level are required' });
  } */


  Domo.DomoModel.removeByOwner(req.session.account._id, (errr, data) => {
    if (errr || !data) {
      return data;
    }
    return data;
  });

  const domoData = {
    name: req.session.account.username,
    hsTotal: req.body.hsTotal,
    hs18: req.body.hs18,
    hs17: req.body.hs17,
    recentVictory: req.body.recentVictory,
    victories: req.body.victories,
    hsVictory: req.body.hsVictory,
    kills: req.body.kills,
    recentDomination: req.body.recentDomination,
    dominations: req.body.dominations,
    recentPerfect: req.body.recentPerfect,
    perfects: req.body.perfects,
    destroyed: req.body.destroyed,
    taunts: req.body.taunts,
    teleports: req.body.teleports,
    owner: req.session.account._id,
  };

  const newDomo = new Domo.DomoModel(domoData);

  const domoPromise = newDomo.save();

  domoPromise.then(() => res.json({ redirect: '/maker' }));

  domoPromise.catch((err) => {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Data already exists.' });
    }

    return res.status(400).json({ error: 'An error occured' });
  });

  return domoPromise;
};

const getDomos = (request, response) => {
  const req = request;
  const res = response;

  return Domo.DomoModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured' });
    }

    return res.json({ domos: docs });
  });
};

const getScores = (request, response) => {
  const res = response;

  return Domo.DomoModel.findAll((err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured' });
    }

    return res.json({ scores: docs });
  });
};

const getHighScores = (request, response) => {
  const req = request;
  const res = response;

  console.dir(req.body);

  return Domo.DomoModel.findByScore(req.body.search, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured' });
    }

    return res.json({ scores: docs });
  });
};

module.exports.makerPage = makerPage;
module.exports.scorePage = scorePage;
module.exports.getDomos = getDomos;
module.exports.getScores = getScores;
module.exports.getHighScores = getHighScores;
module.exports.make = makeDomo;

