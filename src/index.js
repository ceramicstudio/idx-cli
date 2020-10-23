const { run } = require('@oclif/command')
const updateNotifier = require('update-notifier')

const pkg = require('../package.json')
updateNotifier({ pkg }).notify()

exports.run = run
