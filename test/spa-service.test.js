const cds = require('@sap/cds')
const { expect } = require('chai')

describe('SPA Service', () => {
  let spa

  before(async () => {
    spa = await cds.connect.to('SPAService')
  })

  describe('Workflow Operations', () => {
    it('should start workflow instance', async () => {
      const result = await spa.startWorkflow({
        definitionId: 'approval-workflow',
        context: { requestId: '123' }
      })
      expect(result).to.have.property('id')
    })

    it('should get workflow instance', async () => {
      const result = await spa.getWorkflowInstance('instance-123')
      expect(result).to.have.property('status')
    })

    it('should get workflow definitions', async () => {
      const result = await spa.getWorkflowDefinitions()
      expect(result).to.be.an('array')
    })
  })

  describe('Task Operations', () => {
    it('should get tasks list', async () => {
      const result = await spa.getTasks({
        status: 'READY',
        taskDefinitionId: 'approval-task'
      })
      expect(result).to.be.an('array')
    })

    it('should claim task', async () => {
      const result = await spa.claimTask('task-123')
      expect(result).to.have.property('status', 'RESERVED')
    })

    it('should complete task', async () => {
      const result = await spa.completeTask({
        taskId: 'task-123',
        context: { approved: true }
      })
      expect(result).to.have.property('status', 'COMPLETED')
    })
  })
})
