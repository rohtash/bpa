const axios = require('axios')

class InboxAPI {
  constructor(config) {
    this.baseURL = config.apiUrl
    this.apiKey = config.apiKey
  }

  async getTasks(options = {}) {
    const queryParams = new URLSearchParams({
      status: options.status || 'READY',
      taskDefinitionId: options.taskDefinitionId || '',
      ...options
    }).toString()
    
    return this._request('GET', `/inbox/v1/tasks?${queryParams}`)
  }

  async getTask(taskId) {
    return this._request('GET', `/inbox/v1/tasks/${taskId}`)
  }

  async claimTask(taskId) {
    return this._request('POST', `/inbox/v1/tasks/${taskId}/claim`)
  }

  async completeTask(taskId, context) {
    return this._request('POST', `/inbox/v1/tasks/${taskId}/complete`, {
      context,
      status: 'COMPLETED'
    })
  }

  async getTaskContext(taskId) {
    return this._request('GET', `/inbox/v1/tasks/${taskId}/context`)
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
      throw new Error(`Inbox API Error: ${error.message}`)
    }
  }
}

module.exports = InboxAPI
