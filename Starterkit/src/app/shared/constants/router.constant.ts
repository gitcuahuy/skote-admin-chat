export const ROUTER_MODULE = {
  ticket: 'ticket'
}
export const ROUTER_PATH = {
  ticket: {
    root: '',
    list: 'list',
    configApproval: 'config-approval',
    ticketType: 'ticket-type',
    ticketReason: 'ticket-reason',
  }
}
export const ROUTER_CONSTANT = {

  ticket: {
    root: ROUTER_MODULE.ticket,
    list: `${ROUTER_MODULE.ticket}/${ROUTER_PATH.ticket.list}`,
    configApproval: `${ROUTER_MODULE.ticket}/${ROUTER_PATH.ticket.configApproval}`,
    ticketType: `${ROUTER_MODULE.ticket}/${ROUTER_PATH.ticket.ticketType}`,
    ticketReason: `${ROUTER_MODULE.ticket}/${ROUTER_PATH.ticket.ticketReason}`,
  }
}
