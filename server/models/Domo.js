const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const _ = require('underscore');

let DomoModel = {};

// mongoose.Types.ObjectID is a function that
// converts string ID to real mongo ID
const convertId = mongoose.Types.ObjectId;
const setName = (name) => _.escape(name).trim();

const DomoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: 'Test',
    trim: true,
    set: setName,
  },

  hsTotal: {
    type: Number,
    min: 0,
    default: 0,
  },

  hs18: {
    type: Number,
    min: 0,
    default: 0,
  },

  hs17: {
    type: Number,
    min: 0,
    default: 0,
  },

  recentVictory: {
    type: Boolean,
    default: false,
  },

  victories: {
    type: Number,
    min: 0,
    default: 0,
  },

  hsVictory: {
    type: Number,
    min: 0,
    default: 0,
  },

  kills: {
    type: Number,
    min: 0,
    default: 0,
  },

  recentDomination: {
    type: Boolean,
    default: false,
  },

  dominations: {
    type: Number,
    min: 0,
    default: 0,
  },

  recentPerfect: {
    type: Boolean,
    default: false,
  },

  perfects: {
    type: Number,
    min: 0,
    default: 0,
  },

  destroyed: {
    type: Number,
    min: 0,
    default: 0,
  },

  taunts: {
    type: Number,
    min: 0,
    default: 0,
  },

  teleports: {
    type: Number,
    min: 0,
    default: 0,
  },

  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },

  createdData: {
    type: Date,
    default: Date.now,
  },
});

DomoSchema.statics.toAPI = (doc) => ({
  name: doc.name,
  hsTotal: doc.hsTotal,
  hs18: doc.hs18,
  hs17: doc.hs17,
  recentVictory: doc.recentVictory,
  victories: doc.victories,
  hsVictory: doc.hsVictory,
  kills: doc.kills,
  recentDomination: doc.recentDomination,
  dominations: doc.dominations,
  recentPerfect: doc.recentPerfect,
  perfects: doc.perfects,
  destroyed: doc.destroyed,
  taunts: doc.taunts,
  teleports: doc.teleports,
});

DomoSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: convertId(ownerId),
  };

  return DomoModel.find(search).select('').exec(callback);
};

DomoSchema.statics.removeByOwner = (ownerId, callback) => {
  const search = {
    owner: convertId(ownerId),
  };

  return DomoModel.deleteOne(search, callback);
};

DomoSchema.statics.findByScore = (score, callback) => {
  const search = {
    hsTotal: score,
  };

  return DomoModel.find(search).select('').exec(callback);
};

DomoSchema.statics.findAll = (callback) => DomoModel.find().select('').exec(callback);

DomoModel = mongoose.model('Domo', DomoSchema);

module.exports.DomoModel = DomoModel;
module.exports.DomoSchema = DomoSchema;
