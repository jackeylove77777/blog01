const express = require('express')
const Article = require('./../models/article')
const router = express.Router()

router.get('/new', (req, res) => {
  res.render('articles/new',{article:new Article()})
})

router.get('/:id',async (req, res) => {
  const article = await Article.findById(req.params.id)
  if(article===null)res.redirect('/')
  res.render('articles/show',{article:article})
})
router.get('/edit/:id', async(req, res) => {
  const article = await Article.findById(req.params.id)
  res.render('articles/edit',{article:article})
})

router.post('/', async (req, res) => {
  let article = new Article({
    title: req.body.title,
    description: req.body.description,
    markdown:req.body.markdown
  })
  try {
    await article.save()
    res.redirect(`/articles/${article.id}`)
  } catch (e) {
    console.log(e);
    res.render('articles/new',{article:article})
  }
})

router.delete('/:id', async (req, res) => {
  await Article.findByIdAndDelete(req.params.id)
  res.redirect('/')
})

router.put("/:id", async (req, res) => {
  console.log(req.params.id);
  let article = await Article.findById(req.params.id);
  article.title= req.body.title
  article.description=req.body.description
  article.markdown= req.body.markdown
  try {
    await article.save()
    res.redirect(`/articles/${article.id}`);
  } catch (e) {
    res.redirect(`/articles/edit/${req.params.id}`)
  }

});

module.exports = router