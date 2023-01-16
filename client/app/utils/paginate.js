const paginate = (totalData) => {
  const itemsPerPage = 10;
  const pages = Math.ceil(totalData.length / itemsPerPage);

  const newData = Array.from({ length: pages }, (_, index) => {
    const start = index * itemsPerPage;
    return totalData.slice(start, start + itemsPerPage);
  });

  return newData;
};

export default paginate;
