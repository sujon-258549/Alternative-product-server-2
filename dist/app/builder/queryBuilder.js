"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class QueryBuilder {
    constructor(modelQuery, query) {
        this.modelQuery = modelQuery;
        this.query = query;
    }
    search(searchableField) {
        var _a;
        const searchTerm = (_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.searchTerm;
        if (searchTerm) {
            this.modelQuery = this.modelQuery.find({
                $or: searchableField.map((field) => ({
                    [field]: { $regex: searchTerm, $options: 'i' },
                })),
            });
        }
        return this;
    }
    filter() {
        const queryObject = Object.assign({}, this.query);
        const excludeField = ['searchTerm', 'sort', 'limit', 'page', 'field'];
        //   delete serch tarm
        excludeField.forEach((el) => delete queryObject[el]);
        this.modelQuery = this.modelQuery.find(queryObject);
        return this;
    }
    sort() {
        var _a, _b;
        const sort = ((_b = (_a = this.query.sort) === null || _a === void 0 ? void 0 : _a.split(',')) === null || _b === void 0 ? void 0 : _b.join(' ')) || '-createdAt'; // Potential issue  //
        this.modelQuery = this.modelQuery.sort(sort);
        return this;
    }
    paginate() {
        var _a, _b;
        const page = Number((_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.page) || 1;
        const limit = Number((_b = this === null || this === void 0 ? void 0 : this.query) === null || _b === void 0 ? void 0 : _b.limit) || 10;
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
        var _a, _b;
        const field = ((_b = (_a = this.query.field) === null || _a === void 0 ? void 0 : _a.split(',')) === null || _b === void 0 ? void 0 : _b.join(' ')) || '-__v';
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
    countTotal() {
        return __awaiter(this, void 0, void 0, function* () {
            const totalQueries = this.modelQuery.getFilter();
            const total = yield this.modelQuery.model.countDocuments(totalQueries);
            const page = Number(this.query.page) || 1;
            const limit = Number(this.query.limit) || 10;
            const totalPage = Math.ceil(total / limit);
            return {
                page,
                limit,
                total,
                totalPage,
            };
        });
    }
}
exports.default = QueryBuilder;
