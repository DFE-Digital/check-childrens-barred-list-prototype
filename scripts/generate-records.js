const fs = require('fs')
const path = require('path')
const faker =  require('@faker-js/faker').faker
const _ = require('lodash');
const { DateTime } = require('luxon');

const generateRecord = (params = {}) => {
  let record = {}
  record.lastName = _.get(params, 'lastName') || faker.person.lastName()

  let refDate = DateTime.fromObject({ day: 1, month: 1, year: 2000 }).toISO()
  record.dob = _.get(params, 'dob') || faker.date.past({ refDate: refDate })

  record.isMatched = _.get(params, 'isMatched') || faker.helpers.arrayElement([
    'Yes',
    'No'
  ])

  return record
}

const generateRecords = () => {
  const records = []

  records.push(generateRecord({
    lastName: 'Culpan',
    dob: DateTime.fromObject({day: 1, month: 1, year: 1999 }),
    isMatched: 'Yes'
  }))

  records.push(generateRecord({
    lastName: 'Silver',
    dob: DateTime.fromObject({day: 1, month: 1, year: 1999 }),
    isMatched: 'No'
  }))

  for(let i = 0; i < 11; i++) {
    records.push(generateRecord())
  }
  return records
}

const generateRecordsFile = (filePath) => {
  const records = generateRecords()
  const filedata = JSON.stringify(records, null, 2)
  fs.writeFile(
    filePath,
    filedata,
    (error) => {
      if (error) {
        console.error(error)
      }
      console.log(`Records generated: ${filePath}`)
    }
  )
}

generateRecordsFile(path.join(__dirname, '../app/data/records.json'))
