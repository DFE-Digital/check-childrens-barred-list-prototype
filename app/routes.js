const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()
const flash = require('connect-flash')

router.use(flash())

require('./routes/account')(router)
require('./routes/results')(router)

router.all('*', (req, res, next) => {
  res.locals.user = req.session.data.user
  res.locals.query = req.query
  res.locals.flash = req.flash('success')
  next()
})

router.get('/', (req, res) => {
  if(!req.session.data.user) {
    res.redirect('/account/sign-in')
  } else {
    res.redirect('/search')
  }
})