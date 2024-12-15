const WorkflowAPI = require('./api/workflow-api')
const InboxAPI = require('./api/inbox-api')

class SPAService {
  constructor(service) {
    this.service = service
    this.initAPIs()
  }

  initAPIs() {
    const { credentials } = this.service.context?.destination?.spa || {}
    
    this.workflow = new WorkflowAPI({
      apiUrl: credentials?.workflow?.url,
      apiKey: credentials?.workflow?.apiKey
    })
    
    this.inbox = new InboxAPI({
      apiUrl: credentials?.inbox?.url,
      apiKey: credentials?.inbox?.apiKey
    })
  }

  // Workflow Methods
  async startWorkflow(req) {
    try {
      const { definitionId, context } = req.data
      return await this.workflow.startInstance({ definitionId, context })
    } catch (error) {
      req.error(500, error.message)
    }
  }

  async getWorkflowInstance(req) {
    try {
      const { instanceId } = req.data
      return await this.workflow.getInstance(instanceId)
    } catch (error) {
      req.error(500, error.message)
    }
  }

  // ... [other methods from previous spa-service.js]
}

module.exports = SPAService
