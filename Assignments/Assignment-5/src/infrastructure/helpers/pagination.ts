export const PaginationHelper = (
  totalUsers: number,
  page: number,
  limit: number
) => {
  const totalPages = Math.ceil(totalUsers / limit);

  const start: number = (page - 1) * limit;
  
  if (page > totalPages || totalUsers === 0) {
    return {
      error: true,
      message: "User not found",
      totalPages,
      hasNextPage: false,
      start: 0,
    };
  }

  const hasNextPage = page < totalPages;

  return {
    error: false,
    start,
    totalPages,
    hasNextPage,
  };
};
