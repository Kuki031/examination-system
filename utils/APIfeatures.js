'use strict';

class APIfeatures {
    constructor(model, queryString) {
        this.model = model;
        this.queryString = queryString;
    }
    filter() {
        const queryObj = { ...this.queryString };
        const restrictedFields = ['page', 'sort', 'limit', 'fields'];
        restrictedFields.forEach(field => delete queryObj[field]);
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte|ne)\b/g, el => `$${el}`);
        let query = JSON.parse(queryStr);
        this.model = this.model.find(query);
        return this;
    }
    sort() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(" ").join(" ");
            this.model = this.model.sort(sortBy);
        } else this.model = this.model.sort("-points");
        return this;
    }
    project() {
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(" ").join(" ");
            this.model = this.model.select(fields);
        } else this.model = this.model.select("-__v");
        return this;
    }
    paginate() {
        const page = parseInt(this.queryString.page) || 1;
        const limit = parseInt(this.queryString.limit) || 6;
        const skip = (page - 1) * limit;
        this.model = this.model.skip(skip).limit(limit);
        return this;
    }
}
module.exports = APIfeatures;