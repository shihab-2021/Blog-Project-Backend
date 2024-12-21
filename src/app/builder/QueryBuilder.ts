import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  // search by fields
  search(searchableFields: string[]) {
    const search = this?.query?.search as string;
    if (search) {
      const searchCondition = searchableFields.map(
        (field) =>
          ({
            [field]: { $regex: search, $options: 'i' },
          }) as FilterQuery<T>,
      );
      this.modelQuery = this.modelQuery.find({
        $or: searchCondition,
      });
    }

    return this;
  }

  // sort by field
  sort() {
    const sortBy = this?.query?.sortBy as string;
    const sortOrder = this?.query?.sortOrder as string;

    if (sortBy) {
      const order = sortOrder === 'asc' ? 1 : -1;
      this.modelQuery = this.modelQuery.sort({ [sortBy]: order });
    } else {
      this.modelQuery = this.modelQuery.sort({ createdAt: -1 });
    }

    return this;
  }

  // filter blogs by author
  filter() {
    const filter = this?.query?.filter as string;
    if (filter) {
      this.modelQuery = this.modelQuery.find({ author: filter });
    }

    return this;
  }
}

export default QueryBuilder;
