export enum authScope {
  WORKSPACE = 'workspace', //Truy cập dữ liệu toàn Workspace
  DEPARTMENT = 'department', //  Truy cập dữ liệu của mình và cấp dưới
  USER = 'user', // Chỉ truy cập dữ liệu của mình

}

export enum functionScope {
  VIEW  = 'view',
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  APPROVE = 'approve',
  REJECT = 'reject',
  CANCEL = 'cancel',
  CLOSE = 'close',
  REOPEN = 'reopen',
  EXPORT = 'export',
  IMPORT = 'import',

}

export const SYSTEM_RULES = {
  TICKET: {
    LIST: 'ticket:list',
  }
}
