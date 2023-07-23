export const ROUTER_MODULE = {
  ticket: 'ticket',
  employees: 'employees',
}
export const ROUTER_PATH = {
  ticket: {
    root: '',
    list: 'list/index',
    configApproval: 'config-approval',
    ticketType: 'ticket-type',
    ticketReason: 'ticket-reason',
    leavePolicy: 'leavePolicy',
  },
  employees: {
    listEmployee: 'list/index',
    leaveManager: 'leave-management',
    permissionSetting: 'permission-setting',
    notificationSetting: 'notification-setting',
  }
}
export const ROUTER_CONSTANT = {

  ticket: {
    list: `${ROUTER_MODULE.ticket}/${ROUTER_PATH.ticket.list}`,
    configApproval: `${ROUTER_MODULE.ticket}/${ROUTER_PATH.ticket.configApproval}`,
    ticketType: `${ROUTER_MODULE.ticket}/${ROUTER_PATH.ticket.ticketType}`,
    ticketReason: `${ROUTER_MODULE.ticket}/${ROUTER_PATH.ticket.ticketReason}`,
    leavePolicy: `${ROUTER_MODULE.ticket}/${ROUTER_PATH.ticket.leavePolicy}`,
  },
  employees: {
    listEmployee: `${ROUTER_MODULE.employees}/${ROUTER_PATH.employees.listEmployee}`,
    leaveManager: `${ROUTER_MODULE.employees}/${ROUTER_PATH.employees.leaveManager}`,
    permissionSetting: `${ROUTER_MODULE.employees}/${ROUTER_PATH.employees.permissionSetting}`,
    notificationSetting: `${ROUTER_MODULE.employees}/${ROUTER_PATH.employees.notificationSetting}`,
  }
}
