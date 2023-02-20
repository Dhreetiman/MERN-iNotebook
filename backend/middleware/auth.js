let jwt = require('jsonwebtoken')

const fetchuser = (req, res, next) => {
    try {

        let token = req.header('x-auth-token')
        if (!token) return res.status(401).send("Authorization denied")

        jwt.verify(token, 'shhh', (error, decode) => {
            if (error) return res.status(401).json({error: "token is not valid"})
            req.user = decode.user
            next()
        })
        
    } catch (error) {
        console.log(error);
        res.status(401).send("server error")
    }
}

module.exports = fetchuser