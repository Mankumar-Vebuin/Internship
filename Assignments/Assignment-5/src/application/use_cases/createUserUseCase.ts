import { UserType } from "../../domain/models/user";
import { UserRepositoryPort } from "../port/repositories/userRepo.port";

export const CreateUserUseCase = async (
  UserRepo: Pick<UserRepositoryPort, "create" | "getByEmail">,
  data: Partial<UserType>
): Promise<boolean> => {
  const isExist = await UserRepo.getByEmail(data.email as string);
  if (isExist) {
    return false;
  } else {
    return await UserRepo.create(data as UserType);
  }
};
