import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }
  search(searchableField: string[]) {
    const searchTerm = this?.query?.searchTerm;
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableField.map(
          (field) =>
            ({
              [field]: { $regex: searchTerm, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      });
    }
    return this;
  }

  filter() {
    const queryObject = { ...this.query };

    const excludeField = ['searchTerm', 'sort', 'limit', 'page', 'field'];

    //   delete serch tarm
    excludeField.forEach((el) => delete queryObject[el]);
    this.modelQuery = this.modelQuery.find(queryObject as FilterQuery<T>);

    return this;
  }

  sort() {
    const sort =
      (this.query.sort as string)?.split(',')?.join(' ') || '-createdAt'; // Potential issue  //
    this.modelQuery = this.modelQuery.sort(sort as string);
    return this;
  }

  paginate() {
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;
    const skip = (page - 1) * limit;
    this.modelQuery = this.modelQuery.skip(skip).limit(limit);

    return this;
  }
  // priceRange(minPrice?: number, maxPrice?: number) {
  //   console.log(minPrice, maxPrice);
  //   const priceFilter: Record<string, unknown> = {};
  //   if (minPrice != null) priceFilter.$gte = minPrice;
  //   if (maxPrice != null) priceFilter.$lte = maxPrice;

  //   if (Object.keys(priceFilter).length) {
  //     this.modelQuery = this.modelQuery.find({
  //       price: priceFilter,
  //     } as FilterQuery<T>);
  //   }

  //   return this;
  // }
  fields() {
    const field = (this.query.field as string)?.split(',')?.join(' ') || '-__v';
    this.modelQuery = this.modelQuery.select(field);
    return this;
  }
  // async countTotal() {
  //   const totalQueries = this.modelQuery.getFilter();
  //   const limit = Number(this?.query?.limit) || 10;
  //   const total = await this.modelQuery.model.countDocuments(totalQueries);
  //   const page = Number(this?.query?.page) || 1;
  //   const totalPage = Math.ceil(total / limit);

  //   return {
  //     page,
  //     limit,
  //     total,
  //     totalPage,
  //   };
  // }
  async countTotal() {
    const totalQueries = this.modelQuery.getFilter();
    const total = await this.modelQuery.model.countDocuments(totalQueries);
    const page = Number(this.query.page) || 1;
    const limit = Number(this.query.limit) || 10;
    const totalPage = Math.ceil(total / limit);

    return {
      page,
      limit,
      total,
      totalPage,
    };
  }
}

export default QueryBuilder;
