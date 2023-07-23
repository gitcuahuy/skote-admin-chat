export interface IBaseRequestModel {
  keyword?: string;
  pageIndex?: number;
  pageSize?: number;
  sortBy?: string;
  hasPageable?: boolean;
}

export interface IPagination {
  pageIndex?: number;
  pageSize?: number;
  total?: number;
}

export interface ISearch {
  keyword?: string;
  sortBy?: string;
}

export interface ISearchWithPagination extends ISearch, IPagination {
}

export interface ISearchWithPaginationOptionally extends ISearch, IPagination, IBaseRequestModel, IFindByIdsRequest {
}
export interface IFindByIdsRequest{
  ids?: string[];
}
export enum DATE_TYPE {
  LOCAL_DATE = 'LOCAL_DATE',
  MILLISECOND = 'MILLISECOND',
}
export interface IOptionalRequestModel {
  ignoreError?: boolean;
  loading?: boolean;
  dateType?: DATE_TYPE;
  useCount?: boolean;
  // optimalResponse?: boolean;
}
