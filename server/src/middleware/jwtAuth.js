import jwt from "jsonwebtoken";

const jwtAuth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        if (token) {
            const decodedData = jwt.verify(token, process.env.JWT_ACTIVATE);
            req.userId = decodedData?.id;
        }
    } catch (err) {
        next();
    };
};

module.exports = jwtAuth;