import { UserType } from "../../domain/models/user";
import { UserRepositoryPort } from "../port/repositories/userRepo.port";

export const updateUserUseCase = async (
  userRepo: Pick<UserRepositoryPort, "update" | "getById">,
  id: number,
  data: Partial<UserType>
) => {
  const isExist = await userRepo.getById(id);

  if (isExist) {
    return await userRepo.update(id, data);
  } else {
    return false;
  }
};
