//會員資料溝通模組檔
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port port!`))

var memberSchem = new express.Schema({
  name: String,
  account: String,
  password: String,
})
memberSchem.set('collection', 'member')
var model = app.model('member', 'memberSchema')

module.exports = model
