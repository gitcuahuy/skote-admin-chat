export interface AuditableModel {
  createdBy?: string;
  createdAt?: Date;
  lastModifyBy?: string;
  lastModifyAt?: Date;
  deleted?: boolean;
}
