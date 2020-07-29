//1º SERVIDOR DO CURSO SEM DB, QUE FOI ALTERADO COM O BANCO DE DADOS

// console.log(__dirname + "/index.html")

const express = require("express");
const nunjucks = require("nunjucks")
const server = express();
// const db = require("./db");

const ideas = [
    {
        img:"https://www.flaticon.com/premium-icon/icons/svg/3195/3195490.svg",
        title:"Cursos de Programação",
        category:"Estudo",
        description:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Necessitatibus voluptatem ",
        url:"https://rocketseat.com.br/"
    },
    {
        img:"https://www.flaticon.com/premium-icon/icons/svg/3133/3133633.svg",
        title:"Exercícios",
        category:"Saúde",
        description:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Necessitatibus voluptatem ",
        url:"https://rocketseat.com.br/"
    },
    {
        img:"https://image.flaticon.com/icons/svg/3048/3048398.svg",
        title:"Meditação",
        category:"Mentalidade",
        description:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Necessitatibus voluptatem ",
        url:"https://rocketseat.com.br/"
    },
    {
        img:"https://www.flaticon.com/premium-icon/icons/svg/3195/3195490.svg",
        title:"Cursos de Programação",
        category:"Estudo",
        description:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Necessitatibus voluptatem ",
        url:"https://rocketseat.com.br/"
    }

]

// server.get("/", function(req, res) {   RES.SEND() SOMENTE ENVIA TEXTO

//     return  res.send("Boa noite galera")
// })

//CONFIGURAR ARQUIVOS ESTATICOS(CSS, IMGS), 
//PRA O INDEX.HTML CONTINUAR ESTILISADO APESAR DE TER VINDO P SERVER: 
//DICA: SEMPRE COLOCAR UM BARRA NA FRENTE DE ENDEREÇO P/ ARQUIVOS ESTATICOS href="/../../12345.png"
server.use(express.static("public"));

//configuração do nunjucks
nunjucks.configure("views", {
    express: server,
    noCache: true, //cache só é bom quando o sistema já esta finalizado, não quando desenvolvendo...
})


// server.get("/", function(req, res) {

//     return  res.sendFile(__dirname + "/index.html")   //envia um arquivo raiz do servidor pro frontend
// })

//USANDO NUNJUCKS, USAR RES.RENDER, E TIRAR BARRA RAIZ NA FRENTE DO ARQUIVO, POIS FOI PRA PASTA 'VIEWS'
//callback function, que so vai executar depois de fazer o que estiver no codigo abaixo
server.get("/", function(req, res) {
    // const h1 = "OI DO BACKEND - PELO NUNJUCKS"
    // return  res.render("index.html", {title: h1})   
    const reversedIdeas = [...ideas].reverse();

    let lastIdeas = [];
    for (let idea of reversedIdeas) {
        //determinar comprimento maximo da array 'lastIdeas, e permitir adicionar mais um item 'idea' nesta cond.
        //so caaberá no máximo 2 itens
       if(lastIdeas.length < 2) {
           lastIdeas.push(idea)
       }
    }
    // lastIdeas = ideas.reverse(); 
    // console.log(lastIdeas.length == 2)  // duplo == para verificação, unico = para atribuir valor
    return  res.render("index.html", { ideas: lastIdeas })   
})

//CRIAR ROTAS VIABILIZAR NAVEGAÇÃO ONLINE DAS PAGINAS - NÃO ESQUECER DE ALTERAR OS hrefs no ideIas.html
//ONDE ERA HREF="IDEIAS.HTML" VIRA HREF="IDEIAS" . HREF="INDEX.HTML" VIRA APENAS "/"
// server.get("/ideias", function(req, res) {

//     return  res.sendFile(__dirname + "/ideias.html")   
// })

//USANDO NUNJUCKS
server.get("/ideias", function(req, res) {

    const reversedIdeas = [...ideas].reverse();

    return  res.render("ideias.html", { ideas:reversedIdeas })   
})



console.log('Server rodando pelo NPM')
server.listen(xxxx);

//PODE ABRIR PAGINA DIGITANDO 127.0.0.1:3000 OU LOCALHOST:3000