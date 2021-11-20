const express = require('express');
const router = express.Router();
const Voxqube = require('../models/voxqube');

/* GET All docs from DB. */
router.post('/',async function(req, res, next) {
  const {langs} = req.body;
  const voxqubes = await Voxqube.find({ language: langs } );
  res.json({ voxqubes });
});

/* GET unique langs from DB. */
router.get('/langs',async function(req, res, next) {
  const voxqubes = await Voxqube.find();
  if (voxqubes?.length > 0) {
    const langs = Array.from(new Set(voxqubes.map(el => el.language)));
    res.json({ langs });
  } else {
    res.json({ langs: [] });
  }
});

module.exports = router;
