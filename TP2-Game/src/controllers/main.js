const index = (req,res) => {
    res.render("main/index");
}
const about = (req,res) => {
    res.render("main/about");
}
const game = (req,res) => {
    res.render("main/game");
}
const area = (req,res) => {
    res.render("main/area");
}

module.exports = {index, about, game, area}