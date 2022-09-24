const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const app = express()

mongoose.connect('mongodb://localhost/blog', {
  useUnifiedTopology: true,
})

//设置ejs为模板引擎
app.set('view engine', 'ejs')
//将http请求方法进行覆盖，以匹配delete方法
app.use(methodOverride('_method'))
app.use(express.urlencoded({extended:false}))
app.use('/articles',articleRouter)

app.get("/", async(req, res) => {
  const articles = await Article.find().sort({createAt:'desc'})
  res.render('articles/index',{articles:articles})
});





app.listen(3000)