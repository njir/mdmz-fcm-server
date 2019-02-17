exports.sendCreated = (res, data) => {
    return res.status(201).send(data);
};

exports.sendBadRequest = (res, message) => {
    return res.status(400).send({
        success: false,
        message: message
    });
};

exports.sendUnauthorized = (res, message) => {
    return res.status(401).send({
        success: false,
        message: message
    });
};

exports.sendForbidden = (res) => {
    return res.status(403).send({
        success: false,
        message: 'You do not have rights to access this resource.'
    });
};

exports.sendNotFound = (res) => {
    return res.status(404).send({
        success: false,
        message: 'Resource not found.'
    });
};

exports.setHeadersForCORS = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, X-Access-Token, Content-Type, Accept");
    next();
}
