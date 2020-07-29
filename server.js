// console.log(__dirname + "/index.html")

const express = require("express");
const nunjucks = require("nunjucks")
const server = express();
const db = require("./db");

// const ideas = [
//     {
//         img:"https://www.flaticon.com/premium-icon/icons/svg/3195/3195490.svg",
//         title:"Cursos de Programação",
//         category:"Estudo",
//         description:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Necessitatibus voluptatem ",
//         url:"https://rocketseat.com.br/"
//     },
//     {
//         img:"https://www.flaticon.com/premium-icon/icons/svg/3133/3133633.svg",
//         title:"Exercícios",
//         category:"Saúde",
//         description:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Necessitatibus voluptatem ",
//         url:"https://rocketseat.com.br/"
//     },
//     {
//         img:"https://image.flaticon.com/icons/svg/3048/3048398.svg",
//         title:"Meditação",
//         category:"Mentalidade",
//         description:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Necessitatibus voluptatem ",
//         url:"https://rocketseat.com.br/"
//     },
//     {
//         img:"https://www.flaticon.com/premium-icon/icons/svg/3195/3195490.svg",
//         title:"Cursos de Programação",
//         category:"Estudo",
//         description:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Necessitatibus voluptatem ",
//         url:"https://rocketseat.com.br/"
//     }

// ]

// server.get("/", function(req, res) {   RES.SEND() SOMENTE ENVIA TEXTO

//     return  res.send("Boa noite galera")
// })

//CONFIGURAR ARQUIVOS ESTATICOS(CSS, IMGS), 
//PRA O INDEX.HTML CONTINUAR ESTILISADO APESAR DE TER VINDO P SERVER: 
//DICA: SEMPRE COLOCAR UM BARRA NA FRENTE DE ENDEREÇO P/ ARQUIVOS ESTATICOS href="/../../12345.png"
server.use(express.static("public"));

//habilitar uso do req.body
server.use(express.urlencoded({ extended: true }));

//configuração do nunjucks
nunjucks.configure("views", {
    express: server,
    noCache: true, //cache só é bom quando o sistema já esta finalizado, não quando desenvolvendo...
})


// server.get("/", function(req, res) {

//     return  res.sendFile(__dirname + "/index.html")   //envia um arquivo raiz do servidor pro frontend
// })

//USANDO NUNJUCKS, USAR RES.RENDER, E TIRAR BARRA NA FRENTE DO ARQUIVO, POIS FOI PRA PASTA 'VIEWS'
//callback function, que so vai executar depois de fazer o que estiver no codigo abaixo
server.get("/", function(req, res) {
    //bloco abaixo trazido do arquivo DB
     db.all(`SELECT * FROM ideas`, function(err, rows) {
         //comparar com bloco if no proximo 'get'. Aqui o erro apenas aponta no terminal
        if(err) return console.log(err);
        //console é substituido pela logica que estava aqui antes, e ideias por rows
        // console.log(rows);
        const reversedIdeas = [...rows].reverse();
        let lastIdeas = [];
        for (let idea of reversedIdeas) {
           if(lastIdeas.length < 2) {
               lastIdeas.push(idea)
           }
        }
        return  res.render("index.html", { ideas: lastIdeas }) 
       
    }) 
})


//USANDO NUNJUCKS
server.get("/ideias", function(req, res) {

    db.all(`SELECT * FROM ideas`, function(err, rows) {
        //bloco if retorn erro (FRO) no terminal pelo console, e envia na pagina pro usuário pelo return 
        if(err) {
            console.log(err)
            return res.send("Erro no Banco de Dados");
        }      
        const reversedIdeas = [...rows].reverse();
        return  res.render("ideias.html", { ideas:reversedIdeas }) 
        
    })    
})

//POSTAR IDEIAS - habilitado acima o  req.body - recebimento de infos da pag do formulário do user
server.post("/", function(req, res) {
    // console.log(req.body) //para treino

    //configurações da tabela
    db.run(`
        CREATE TABLE IF NOT EXISTS ideas(
            id  INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            title TEXT,
            category TEXT,
            description TEXT,
            link TEXT
        );
    `)

    const query = `
        INSERT INTO ideas(
            image,
            title, 
            category,
            description,
            link
        ) VALUES (?, ?, ?, ?, ?)` //??? = placeholders, a serem substituidos pelos values

    const  values = [
        req.body.image,
        req.body.title,
        req.body.category,
        req.body.description,
        req.body.link
    ]
    
    //Inserir dados
    db.run(query, values, function(err) {

        // if(err) return console.log(err); //bloco de erro mais elaborado abaixo
        if(err) {
            console.log(err)
            return res.send("Erro no banco de dados!")
        }
        // console.log(this); 
        //aqui o bloco continua o trabalho de cadastro no DB, e fazer redirecionamento p page ideas
        return res.redirect("/ideias")
    })
})



console.log('Server rodando pelo NPM')
server.listen(3000);

//PODE ABRIR PAGINA DIGITANDO 127.0.0.1:3000 OU LOCALHOST:3000