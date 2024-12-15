const cds = require('@sap/cds')
const WorkflowAPI = require('./api/workflow-api')
const InboxAPI = require('./api/inbox-api')

class SPAService extends cds.Service {
  async init() {
    const { credentials } = cds.env.requires.SPA_API
    
    this.workflow = new WorkflowAPI({
      apiUrl: credentials.workflow.url,
      apiKey: credentials.workflow.apiKey
    })
    
    this.inbox = new InboxAPI({
      apiUrl: credentials.inbox.url,
      apiKey: credentials.inbox.apiKey
    })

    // Workflow Actions
    this.on('startWorkflow', this.startWorkflow)
    this.on('getWorkflowInstance', this.getWorkflowInstance)
    this.on('getWorkflowContext', this.getWorkflowContext)
    this.on('updateWorkflowContext', this.updateWorkflowContext)
    this.on('getWorkflowDefinitions', this.getWorkflowDefinitions)

    // Task Actions
    this.on('getTasks', this.getTasks)
    this.on('getTask', this.getTask)
    this.on('claimTask', this.claimTask)
    this.on('completeTask', this.completeTask)
    this.on('getTaskContext', this.getTaskContext)

    await super.init()
  }

  // Workflow Handlers
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

  async getWorkflowContext(req) {
    try {
      const { instanceId } = req.data
      return await this.workflow.getInstanceContext(instanceId)
    } catch (error) {
      req.error(500, error.message)
    }
  }

  async updateWorkflowContext(req) {
    try {
      const { instanceId, context } = req.data
      return await this.workflow.updateInstanceContext(instanceId, context)
    } catch (error) {
      req.error(500, error.message)
    }
  }

  async getWorkflowDefinitions(req) {
    try {
      return await this.workflow.getDefinitions()
    } catch (error) {
      req.error(500, error.message)
    }
  }

  // Task Handlers
  async getTasks(req) {
    try {
      const options = req.data || {}
      return await this.inbox.getTasks(options)
    } catch (error) {
      req.error(500, error.message)
    }
  }

  async getTask(req) {
    try {
      const { taskId } = req.data
      return await this.inbox.getTask(taskId)
    } catch (error) {
      req.error(500, error.message)
    }
  }

  async claimTask(req) {
    try {
      const { taskId } = req.data
      return await this.inbox.claimTask(taskId)
    } catch (error) {
      req.error(500, error.message)
    }
  }

  async completeTask(req) {
    try {
      const { taskId, context } = req.data
      return await this.inbox.completeTask(taskId, context)
    } catch (error) {
      req.error(500, error.message)
    }
  }

  async getTaskContext(req) {
    try {
      const { taskId } = req.data
      return await this.inbox.getTaskContext(taskId)
    } catch (error) {
      req.error(500, error.message)
    }
  }
}

module.exports = SPAService
