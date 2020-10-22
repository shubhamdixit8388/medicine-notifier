const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try{
        // console.log('sdfsd: ', req.headers.authorization.split(' ')[1]);
        const decoded = jwt.verify(req.query.token , 'secret-key');
        req.userData = decoded;
        next();
    }
    catch (err) {
        return res.status(401).json({
            message: 'Authentication Failed',
            error: err
        });
    }
};