
export const getPagesCount = (total, itemPerPage) => {
  const pages = Math.ceil(total / itemPerPage);

  if (!pages) {
    return 1;
  }

  return pages > 125 ? 125 : pages;
};
