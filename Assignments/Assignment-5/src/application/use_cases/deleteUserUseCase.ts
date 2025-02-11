import { UserRepositoryPort } from "../port/repositories/userRepo.port";

export const deleteUserUseCase = async (
  UserRepo: Pick<UserRepositoryPort, "delete" | "getById">,
  id: number
) => {
  const isExist = await UserRepo.getById(id);
  if (isExist) {
    return await UserRepo.delete(id);
  } else {
    return false;
  }
};
