import { UserRepositoryPort } from "../port/repositories/userRepo.port";

export const getUserByIdUseCase = async (
  userRepo: Pick<UserRepositoryPort, "getById">,
  id: number
) => {
  const user = await userRepo.getById(id);
  return user;
};
