// eslint-disable-next-line filenames/match-regex
const Sentry = require('@sentry/node')

Sentry.init({
  dsn: process.env.SENTRY_KEY_LOCAL,
  maxBreadcrumbs: 1000,
  beforeBreadcrumb(breadcrumb) {
    return breadcrumb
  }
})

class SentryService {
  sendEvent(err) {
    // eslint-disable-next-line no-console
    console.log(process.env.SENTRY_KEY)
    // eslint-disable-next-line no-console
    console.log(err)
    // Sentry.captureMessage(err)
  }

  setUserContext(users) {
    // eslint-disable-next-line no-console
    console.log(users)
    // const user = {}
    // user.id = users._id
    // user.email = users.email

    // Sentry.addBreadcrumb({
    //   category: 'auth',
    //   message: `Authenticated user ${user.email}`,
    //   level: 'info'
    // })

    // Sentry.setUserContext(user)
  }

  sendException(err) {
    // eslint-disable-next-line no-console
    console.log(err)
    //Sentry.captureException(err)
  }
}

module.exports = SentryService