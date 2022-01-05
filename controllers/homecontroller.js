
exports.respondWithjson = (req, res) => {
    let json = req.params.data;
    res.render("index", { data: json });
};