import jwt from "jsonwebtoken";
import config from "../../config/config.js";

const jwtAuth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        if (token) {
            const decodedData = jwt.verify(token, config.JWT_ACTIVATE);
            req.userId = decodedData?.id;
        }
        next();
    } catch (err) {
        next();
    };
};

export default jwtAuth;