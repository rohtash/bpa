const axios = require('axios')

class WorkflowAPI {
  constructor(config) {
    this.baseURL = config.apiUrl
    this.apiKey = config.apiKey
  }

  async startInstance(payload) {
    return this._request('POST', '/workflow/v1/workflow-instances', payload)
  }

  async getInstance(instanceId) {
    return this._request('GET', `/workflow/v1/workflow-instances/${instanceId}`)
  }

  async getInstanceContext(instanceId) {
    return this._request('GET', `/workflow/v1/workflow-instances/${instanceId}/context`)
  }

  async updateInstanceContext(instanceId, context) {
    return this._request('PATCH', `/workflow/v1/workflow-instances/${instanceId}/context`, context)
  }

  async getDefinitions() {
    return this._request('GET', '/workflow/v1/workflow-definitions')
  }

  async _request(method, path, data = null) {
    try {
      const response = await axios({
        method,
        url: `${this.baseURL}${path}`,
        data,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'APIKey': this.apiKey
        }
      })
      return response.data
    } catch (error) {
      throw new Error(`Workflow API Error: ${error.message}`)
    }
  }
}

module.exports = WorkflowAPI
