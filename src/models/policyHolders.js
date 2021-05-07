const mongoose = require('mongoose');

// Schema defination for Policy Holders
const policyHoldersSchema = new mongoose.Schema({
  PolicyNumber: {
    type: Number,
    unique: true,
    required: true,
    index: true
  },
  Name: {
    type: String,
    required: true
  },
  DOC: {
    type: String,
    required: true
  },
  Prem: {
    type: String,
    required: true
  },
  Mode: {
    type: String,
    required: true
  },
  FUP: {
    type: String,
    required: true
  },
  plan: {
    type: Number,
    required: true
  },
  term: {
    type: Number,
    required: true
  },
  SumAssured: {
    type: String,
    required: true
  },
  status: {
    type: Number,
    required: true
  },
  CreatedAt: {
    type: Date,
    required: true
  },
  DueMonth: {
    type: [Number]
  }
});

mongoose.model('PolicyHolder', policyHoldersSchema);
