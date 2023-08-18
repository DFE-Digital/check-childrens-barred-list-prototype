const govukPrototypeKit = require('govuk-prototype-kit')
const addFilter = govukPrototypeKit.views.addFilter
const { DateTime } = require("luxon")

// const nunjucks = require('nunjucks');
// const markdownIt = require('markdown-it')();
// markdownIt.use(require('markdown-it-govuk'))

// Custom filter for Markdown rendering
// addFilter('markdown', (content) => {
//   return new nunjucks.runtime.SafeString(markdownIt.render(content));
// });

const { marked } = require('marked');
const GovukHTMLRenderer = require('govuk-markdown')

addFilter('govukMarkdown', function(string, kwargs) {
  if(typeof string !== 'string') {
    return
  }

  const options = {
    headingsStartWith: 'xl',
    ...kwargs
  }

  marked.setOptions({
    ...options,
    headerIds: false, // Quieten deprecation warning in marked.js 5.x
    mangle: false, // Quieten deprecation warning in marked.js 5.x
    renderer: new GovukHTMLRenderer()
  })

  return marked(string)
}, {renderAsHtml: true})



addFilter('isoDateFromDateInput', function(object) {
  try {
    const year = parseInt(object.year) || new Date().getFullYear()
    const month = parseInt(object.month)

    if (!object.day) {
      return DateTime.local(year, month).toFormat('yyyy-LL')
    } else {
      const day = parseInt(object.day)

      return DateTime.local(year, month, day).toISODate()
    }
  } catch (error) {
    return error.message.split(':')[0]
  }
})

function govukDate(date) {
  return DateTime.fromISO(date).toFormat('d MMMM yyyy')
}
addFilter('date', govukDate)