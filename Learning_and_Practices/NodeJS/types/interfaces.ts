import { Request } from "express";

export interface Pagination {
  page: number;
  limit: number;
  start: number;
}

export interface User {
  id?: number;
  email?: string;
  iat?: number;
  exp?: number;
  password?: string;
  createdAt?: Date;
}

export interface CustomRequest extends Request {
  pagination?: Pagination;
}

export interface TokenRequest extends Request {
  user?: User;
}

export interface CustomError extends Error {
  status?: string;
  statusCode?: number;
}
