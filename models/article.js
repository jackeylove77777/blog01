const mongoose = require('mongoose')
// const slugify = require('slugify')   //将文章的标题转化为合法的url字符串
const marked = require("marked");
const createDomPurifier = require('dompurify')
const { JSDOM } = require('jsdom')
//markdown转化为html的净化器，防止恶意的可运行js代码
const dompurify = createDomPurifier(new JSDOM().window)
const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required:true
  },
  description: {
    type: String,
  },
  markdown: {
    type: String,
    required:true
  },
  createAt: {
    type: Date,
    default:Date.now
  },
  // slug: {
  //   type: String, 
  //   required: true,
  //   unique:true
  // },
  pureHtml: {
    type: String,
    required:true
  }
})

articleSchema.pre('validate', function (next) {
  // if (this.title) {
  //   this.slug = slugify(this.title, {
  //     lower: true,
  //     strict:true
  //   })
  // }
  if (this.markdown) {
    this.pureHtml = dompurify.sanitize(marked.marked(this.markdown));
  }
  next();
})

module.exports = mongoose.model('Article',articleSchema)