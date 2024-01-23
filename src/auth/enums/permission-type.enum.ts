export const permissionType = {
  READ_USERS: 'read_users',
  ADD_USER: 'add_user',
  EDIT_USER: 'edit_user',
  DELETE_USER: 'delete_user',
  ACCESS_TASKS: 'full_access_tasks',
  CREATE_TASK: 'create_task',
  READ_TASK: 'limited_read_task',
  DELETE_TASK: 'limited_delete_task',
} as const;
