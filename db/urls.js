import db from './connection.js';
import yup from 'yup';
import { nanoid } from 'nanoid';

const urls = db.get('urls');

const schema = yup.object().shape({
  slug: yup.string().trim().matches(/[\w\-]/i),
  url: yup.string().trim().url().required(),
});

async function create(req) {
  let slug = req.slug;
  let url = req.url;
  try {
    if(slug){
      await schema.validate({
        slug,
        url,
      });
    }else{
      await schema.validate({
        url,
      });
    }
    
    if(!slug){
      slug = nanoid(5);
    }else{
      const inUse = await urls.findOne({slug});
      if(inUse){
        throw new Error('Slug in use.');
      }
    }
    slug = slug.toLowerCase();

    const newUrl = {
      url,
      slug,
    };
    const created = await urls.insert(newUrl);
    return created;
  } catch (error) {
    return null;
  }
}

async function getURL(req) {
  req = req.toLowerCase();
  try {
    const site = await urls.find({slug: req});
    if(!site){
      throw new Error();
    }else {
      return site[0].url;
    }
  }catch (error) {
    return null;
  }
}

export default {
  create, getURL,
}