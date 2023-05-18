const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.authorization

    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({message: "unauthorized"})
    }

    const token = authHeader.split(' ')[1]

    jwt.verify(
        // verify the toke
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.status(403).json({ message: 'forbidden'})
            req.user = decoded.userInformation.username;
            req.roles = decoded.userInformation.roles;
            next();
        }
    )

}

module.exports = verifyJWT