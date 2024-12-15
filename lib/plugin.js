const cds = require('@sap/cds')

class SPAPlugin {
  constructor() {
    this.namespace = 'sap.spa'
  }

  init(service) {
    // Register model
    service.model ??= cds.model
    const model = service.model

    // Load SPA model
    const spaModel = cds.load(`${__dirname}/../srv/spa-service.cds`)
    if (model !== cds.model) {
      cds.compile.to.csn(spaModel, model)
    }

    // Extend service with SPA capabilities
    if (service instanceof cds.Service) {
      this.extendService(service)
    }
  }

  extendService(service) {
    const SPAService = require('./spa-service')
    const spaService = new SPAService(service)
    
    // Register handlers
    service.on('startWorkflow', spaService.startWorkflow.bind(spaService))
    service.on('getWorkflowInstance', spaService.getWorkflowInstance.bind(spaService))
    service.on('getWorkflowContext', spaService.getWorkflowContext.bind(spaService))
    service.on('updateWorkflowContext', spaService.updateWorkflowContext.bind(spaService))
    service.on('getWorkflowDefinitions', spaService.getWorkflowDefinitions.bind(spaService))
    service.on('getTasks', spaService.getTasks.bind(spaService))
    service.on('getTask', spaService.getTask.bind(spaService))
    service.on('claimTask', spaService.claimTask.bind(spaService))
    service.on('completeTask', spaService.completeTask.bind(spaService))
    service.on('getTaskContext', spaService.getTaskContext.bind(spaService))
  }
}

module.exports = new SPAPlugin()
