import { UserRepositoryPort } from "../../application/port/repositories/userRepo.port";
import { User } from "../orm/typeorm/entities/User";
import { AppDataSource } from "../orm/typeorm/config/ormconfig";
import { UserType } from "../../domain/models/user";

export const userReposetory: UserRepositoryPort = {
  getCount: async function (): Promise<number> {
    const totalUsers = await AppDataSource.getRepository(User)
      .createQueryBuilder()
      .where("true")
      .getCount();
      
    return totalUsers;
  },

  getAll: async function (limit: number, start: number): Promise<UserType[]> {
    const users = await AppDataSource.getRepository(User)
      .createQueryBuilder()
      .select("id, name, email, filepath")
      .where("true")
      .skip(start)
      .take(limit)
      .getRawMany();

    return users;
  },

  getById: async function (id: number): Promise<UserType> {
    const user = (await AppDataSource.getRepository(User)
      .createQueryBuilder()
      .select(["id", "name", "email", "filepath"])
      .where("id = :id", { id })
      .getRawOne()) as UserType;
    return user;
  },

  create: async function (data: UserType): Promise<boolean> {
    const result = await AppDataSource.getRepository(User)
      .createQueryBuilder()
      .insert()
      .into(User)
      .values({
        name: data.name,
        email: data.email,
        filepath: data.filepath,
      })
      .execute();

    return result.identifiers.length > 0;
  },
  
  update: async function (
    id: number,
    data: Partial<UserType>
  ): Promise<boolean> {
    const query = AppDataSource.getRepository(User)
      .createQueryBuilder()
      .update(User)
      .set(data)
      .where("id = :id", { id })
      .execute();

    return (await query).affected !== 0;
  },

  delete: async function (id: number): Promise<boolean> {
    const query = AppDataSource.getRepository(User)
      .createQueryBuilder()
      .delete()
      .where("id = :id", { id })
      .execute();

    return (await query).affected !== 0;
  },

  getByEmail: async function (email: string): Promise<UserType> {
    const user = (await AppDataSource.getRepository(User)
      .createQueryBuilder()
      .select(["id", "name", "email", "filepath"])
      .where("email = :email", { email })
      .getRawOne()) as UserType;
    return user;
  },
};
