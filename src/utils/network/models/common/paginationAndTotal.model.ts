export class PaginationAndTotalModel {
  page: number;
  limit: number;
  total: number;

  constructor(page: number = 1, limit: number = 10, total: number = 0) {
    this.page = page;
    this.limit = limit;
    this.total = total;
  }
}
