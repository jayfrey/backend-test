const PER_PAGE = 10;

export function paginate(data: any, page: number, perPage = PER_PAGE) {
  const pageCount = Math.ceil(data.length / perPage);

  if (page < 1) page = 1;
  if (page > pageCount) page = pageCount;

  const from = (page - 1) * perPage;
  let to = page * perPage;
  if (to < 0) to = 0;

  return {
    data: data.slice(from, to),
    page: page,
    page_count: pageCount,
  };
}
