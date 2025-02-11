import { UserType } from "../../../domain/models/user";

export type UserRepositoryPort = {
  getCount(): Promise<number>;
  getAll(limit: number, start: number): Promise<UserType[]>;
  getById(id: number): Promise<UserType>;
  getByEmail(email: string): Promise<UserType>;
  create(user: UserType): Promise<boolean>;
  update(id: number, data: Partial<UserType>): Promise<boolean>;
  delete(id: number): Promise<boolean>;
};
