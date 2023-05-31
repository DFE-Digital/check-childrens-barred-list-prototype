const _ = require('lodash');
const { DateTime } = require('luxon')
const allRecords = require('../data/records.json')

module.exports = router => {
  router.get('/results', (req, res) => {
    let records = allRecords
    let searchLastName = _.get(req.session.data, 'lastName')

    if(!searchLastName) {
      res.redirect('/')
      return
    }

    searchLastName = searchLastName.toLowerCase()
    let searchDay = parseInt(_.get(req.session.data.dob, 'day'), 10)
    let searchMonth = parseInt(_.get(req.session.data.dob, 'month'), 10)
    let searchYear = parseInt(_.get(req.session.data.dob, 'year'), 10)
    let searchDate = DateTime.fromObject({
      day: searchDay,
      month: searchMonth,
      year: searchYear
    })

    records = records.filter(record => {
      let name = record.lastName.toLowerCase()
      return (name).indexOf(searchLastName) > -1
    })
    records = records.filter(record => {
      let date1 = DateTime.fromISO(record.dob)
      let date2 = searchDate
      return date1.hasSame(date2, "day") && date1.hasSame(date2, "month") && date1.hasSame(date2, "year")
    })
    records = records.filter(record => record.isMatched == 'Yes')

    res.render('results/index', {
      isPossibleMatch: records.length > 0
    })
  })

}
