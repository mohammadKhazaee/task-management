/* eslint-disable */
export default async () => {
    const t = {
        ["./task/task-priority.enum"]: await import("./task/task-priority.enum"),
        ["./auth/entities/user.entity"]: await import("./auth/entities/user.entity"),
        ["./auth/user-role.enum"]: await import("./auth/user-role.enum"),
        ["./task/entities/task.entity"]: await import("./task/entities/task.entity"),
        ["./admin/user-sort-type.enum"]: await import("./admin/user-sort-type.enum"),
        ["./task/sort-type.enum"]: await import("./task/sort-type.enum")
    };
    return { "@nestjs/swagger": { "models": [[import("./task/entities/task.entity"), { "Task": { id: { required: true, type: () => String }, name: { required: true, type: () => String }, priority: { required: true, enum: t["./task/task-priority.enum"].TaskPriority }, fileUrl: { required: true, type: () => String }, imageUrl: { required: true, type: () => String }, createdDate: { required: true, type: () => Date }, updatedDate: { required: true, type: () => Date }, user: { required: true, type: () => t["./auth/entities/user.entity"].User } } }], [import("./auth/entities/user.entity"), { "User": { id: { required: true, type: () => String }, username: { required: true, type: () => String }, password: { required: true, type: () => String }, role: { required: true, enum: t["./auth/user-role.enum"].UserRole }, imageUrl: { required: true, type: () => String }, createdDate: { required: true, type: () => Date }, tasks: { required: true, type: () => [t["./task/entities/task.entity"].Task] } } }], [import("./auth/dto/create-account.dto"), { "CreateAccountDto": { username: { required: true, type: () => String, minLength: 4, maxLength: 20 }, password: { required: true, type: () => String, maxLength: 32 }, confirmPass: { required: true, type: () => String }, isAdmin: { required: true, type: () => String } } }], [import("./admin/dto/user-query.dto"), { "UserQueryDto": { search: { required: false, type: () => String }, sortType: { required: false, enum: t["./admin/user-sort-type.enum"].UserSortType }, page: { required: false, type: () => String } } }], [import("./auth/dto/signin.dto"), { "SigninDto": {} }], [import("./task/dto/create-task.dto"), { "CreateTaskDto": { name: { required: true, type: () => String, minLength: 4 }, priority: { required: true, enum: t["./task/task-priority.enum"].TaskPriority } } }], [import("./task/dto/update-task.dto"), { "UpdateTaskDto": {} }], [import("./task/dto/task-query.dto"), { "TaskQueryDto": { search: { required: false, type: () => String }, sortType: { required: false, enum: t["./task/sort-type.enum"].SortType }, page: { required: false, type: () => String } } }], [import("./admin/dto/update-account.dto"), { "UpdateAccountDto": {} }]], "controllers": [[import("./app.controller"), { "AppController": { "getUserPhoto": { type: Object } } }], [import("./auth/auth.controller"), { "AuthController": { "signup": {}, "signin": {} } }], [import("./task/task.controller"), { "TaskController": { "createTask": { type: t["./task/entities/task.entity"].Task }, "getTasks": { type: [t["./task/entities/task.entity"].Task] }, "getTask": { type: t["./task/entities/task.entity"].Task }, "updateTask": { type: t["./task/entities/task.entity"].Task }, "deleteTask": {} } }], [import("./admin/admin.controller"), { "AdminController": { "getTasks": { type: [t["./task/entities/task.entity"].Task] }, "getUsers": { type: [t["./auth/entities/user.entity"].User] }, "createUser": {}, "updateUser": {}, "deleteUser": {} } }]] } };
};