const express = require("express");
const logger = require("morgan");
const router = require("./router/router");
const handlebars = require("express-handlebars");
const sass = require("node-sass-middleware");
//^ nao consegui usar esse pacote na minha maquina, npm nao conseguiu instalar por erros
// entao me baseei no que consegui fazer no lab do icomp
const app = express();
const PORT = 3334;

app.use(logger("combined"));

app.use(sass({
    src:`${__dirname}/../public/scss`,
    dest: `${__dirname}/../public/css`,
    outputStyle: "compressed",
    prefix: "/css"
}));

app.use("/css", express.static(`${__dirname}/../public/css`));
app.use("/img", express.static(`${__dirname}/../public/img`));
app.use("/js", [
    express.static(`${__dirname}/../public/js`),
    express.static(`${__dirname}/../node_modules/bootstrap/dist/js`),
]);
app.use("/webfonts", express.static(`${__dirname}/../node_modules/@fortawesome/fontawesome-free/webfonts`));

app.use(router);

app.engine("handlebars", handlebars.engine({
    helpers: require(`${__dirname}/views/helpers/helpers`)
}));
app.set("view engine", "handlebars");

app.set("views", `${__dirname}/views`);

app.listen(PORT, ()=>{
    console.log(`servidor ouvindo na porta ${PORT}`);
})

//nao consegui colocar o jogo, entao deixei a parte do trabalho de express em outra pasta