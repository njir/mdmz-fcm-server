import pagination from './pagination';
import sorting from './sorting';

exports.getRequestOptions = (req) => {
    const paginationOptions = pagination.getPaginationOptions(req);
    const sortOptions = sorting.getSortingOptions(req);

    return Object.assign({}, paginationOptions, sortOptions);
};

exports.getFilteringOptions = (req, parameters) => {
    let options = {};

    parameters.forEach((param) => {
        if (req.query[param] !== undefined) {
            options[param] = req.query[param];
        }
    });

    return options;
};
