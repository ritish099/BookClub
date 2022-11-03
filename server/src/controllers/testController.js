const testController = async (req, res, next) => {
    try {
        return res.status(200).json({
            status: true,
            message: "hello from test server",
            data: ""
        });
    } catch (err) {
        next(err)
    };
};

export default testController;