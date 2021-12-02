const { Router } = require('express');
const Link = require('../models/Link');
const router = Router();
const config = require('config');
const shortid = require('shortid');
const auth = require('../middleware/auth.middleware');

router.get('/', auth, async (req, res) => {
  try {
    const links = await Link.find({ owner: req.user.userId });

    res.json(links);
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong'})
  }
})

router.get('/:id', auth, async (req, res) => {
  try {
    const link = await Link.findById(req.params.id);

    res.json(link);
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong'})
  }
})

router.post('/generate', auth, async (req, res) => {
  try {
    const baseUrl = config.get('baseUrl');

    const { from } = req.body;

    const code = shortid.generate();

    const isLinkExists = await Link.findOne({ from });

    if (isLinkExists) {
      return res.json({ link: isLinkExists });
    }

    const to = `${baseUrl}/t/${code}`;

    const link = new Link({ from, to, code, owner: req.user.userId});

    await link.save();

    res.status(201).json(link);

  } catch (err) {
    console.log(err.message)
    res.status(500).json({ message: 'Something went wrong'})
  }
})


module.exports = router;