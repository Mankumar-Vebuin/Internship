import { PaginationHelper } from "../../infrastructure/helpers/pagination";
import { UserRepositoryPort } from "../port/repositories/userRepo.port";

export const getAllUserUseCase = async (
  userRepo: Pick<UserRepositoryPort, "getAll" | "getCount">,
  page: number,
  limit: number
) => {
  const totalUsers = await userRepo.getCount();

  const { start, totalPages, hasNextPage, error, message } = PaginationHelper(
    totalUsers,
    page,
    limit
  );

  if (error) {
    return { error: true, message };
  }

  // Fetch users from the repository
  const users = await userRepo.getAll(limit, start);

  if (users.length === 0) {
    return { error: true, message: "User not found" };
  }

  return {
    users,
    currentPage: page,
    perPage: limit,
    totalPages,
    hasNextPage,
  };
};
