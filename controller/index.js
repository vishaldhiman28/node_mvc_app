const index = (req, res) => {
	res.render ("index", { title : "Home" });
}

module.exports = {
	index
}
