const getCurrent = async (req, res, next) => {
    const {authorization} = req.headers;
    if (!authorization) {
        return res.status(401).json({
            Status: "401 Unauthorized",
            ResponseBody: {
            "message": "Email or password is wrong"
            }
        })
    }
    res.json({
        authorization
    })
}

module.exports = getCurrent