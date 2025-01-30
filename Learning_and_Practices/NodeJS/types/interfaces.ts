import { Request } from "express";

export interface Pagination {
  page: number;
  limit: number;
  start: number;
}

export interface CustomRequest extends Request {
  pagination?: Pagination;
}
