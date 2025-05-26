import { nanoid } from 'nanoid';
import { v4 as uuidv4 } from 'uuid';
import validator from 'validator';
import Url from '../models/Url.js';

export const shortenUrl = async (req, res) => {
  const { originalUrl } = req.body;
  const base = process.env.BASE_URL;

  if (!validator.isURL(originalUrl)) {
    return res.status(400).json({ error: 'Invalid URL' });
  }

  const shortCode = nanoid(6);
  const newUrl = new Url({
    uuid: uuidv4(),
    originalUrl,
    shortCode,
  });

  try {
    await newUrl.save();
    res.status(201).json({
      shortUrl: `${base}/${shortCode}`,
      uuid: newUrl.uuid,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error' });
  }
};

export const redirectUrl = async (req, res) => {
  const { shortCode } = req.params;

  try {
    const url = await Url.findOne({ shortCode });

    if (!url) return res.status(404).json({ error: 'URL not found' });

    url.clicks += 1;
    await url.save();

    return res.redirect(url.originalUrl);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error' });
  }
};
