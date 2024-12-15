const cds = require('@sap/cds')

// Export main plugin functionality
module.exports = require('./lib/plugin')

// Export API classes for direct usage
module.exports.WorkflowAPI = require('./lib/api/workflow-api')
module.exports.InboxAPI = require('./lib/api/inbox-api')

// Export service implementation
module.exports.SPAService = require('./lib/spa-service')
