const users = require('../data/users.json')
module.exports = router => {

  router.post('/account/sign-in', (req, res) => {
    res.locals.user = req.session.data.user = users[0]

    if(req.body.returnUrl) {
      res.redirect(req.body.returnUrl)
    } else {
      res.redirect('/')
    }
  })

  router.get('/account/sign-out', (req, res) => {
    res.locals.user = req.session.data.user = null
    res.redirect('/')
  })

}