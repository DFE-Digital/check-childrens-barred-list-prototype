const users = require('../data/users.json')
module.exports = router => {

  router.get('/account/sign-in', (req, res) => {
    if(req.session.data.user) {
      res.redirect('/')
    } else {
      res.render('account/sign-in')
    }
  })

  router.post('/account/sign-in', (req, res) => {
    res.locals.user = req.session.data.user = users[0]

    if(req.body.returnUrl) {
      res.redirect(req.body.returnUrl)
    } else {
      res.redirect('/')
    }
  })

  router.get('/account/sign-out', (req, res) => {
    req.session.data = {}
    res.redirect('/')
  })

}
