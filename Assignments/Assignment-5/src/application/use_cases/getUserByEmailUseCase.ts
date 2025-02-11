import { UserRepositoryPort } from "../port/repositories/userRepo.port";

export const getUserByEmailUseCase = async (
  UserRepo: Pick<UserRepositoryPort, "getByEmail">,
  email: string
) => {
  return await UserRepo.getByEmail(email);
};
