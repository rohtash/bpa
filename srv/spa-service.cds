namespace sap.spa;

service SPAService {
  // Workflow Types
  type WorkflowContext {
    definitionId: String;
    context: {};
  }

  type WorkflowInstanceContext {
    instanceId: String;
    context: {};
  }

  // Task Types
  type TaskContext {
    taskId: String;
    context: {};
  }

  type TaskFilter {
    status: String;
    taskDefinitionId: String;
    assignee: String;
    createdFrom: DateTime;
    createdTo: DateTime;
  }

  // Workflow Actions
  action startWorkflow(context: WorkflowContext) returns {};
  action getWorkflowInstance(instanceId: String) returns {};
  action getWorkflowContext(instanceId: String) returns {};
  action updateWorkflowContext(context: WorkflowInstanceContext) returns {};
  action getWorkflowDefinitions() returns array of {};

  // Task Actions
  action getTasks(filter: TaskFilter) returns array of {};
  action getTask(taskId: String) returns {};
  action claimTask(taskId: String) returns {};
  action completeTask(context: TaskContext) returns {};
  action getTaskContext(taskId: String) returns {};
}
