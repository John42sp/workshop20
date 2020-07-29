const sqlite3 = require('sqlite3').verbose();  //verbose para trazer menssagens sobre o banco
const db = new sqlite3.Database('./WorkshopDevEspecial_July20.db'); //criando um  arquivo db na raiz do proj.

db.serialize(function() {
    //Criar a tabel
    // db.run(`
    //     CREATE TABLE IF NOT EXISTS ideas(
    //         id  INTEGER PRIMARY KEY AUTOINCREMENT,
    //         image TEXT,
    //         title TEXT,
    //         category TEXT,
    //         description TEXT,
    //         link TEXT
    //     );
    // `)
    //Instruções globais
    // const query = `
    // INSERT INTO ideas(
    //     image,
    //     title, 
    //     category,
    //     description,
    //     link
    // ) VALUES (?, ?, ?, ?, ?)`

    // const  values = [
    //     "https://www.flaticon.com/premium-icon/icons/svg/3195/3195490.svg",
    //     "Cursos de Programação",
    //     "Estudo",
    //     "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Necessitatibus voluptatem ",
    //     "https://rocketseat.com.br/"
    // ]
    //Inserir dados
    // db.run(query, values, function(err) {
    //     if(err) return console.log(err);

    //     console.log(this);
    // })

    // Deletar dados
    db.run(`DELETE FROM ideas WHERE id = ?`, [8], function(err) {
        if(err) return console.log(err);
        console.log("ITEM DELETADO", this);
    })

    // Consultar dados
    db.all(`SELECT * FROM ideas`, function(err, rows) {
        if(err) return console.log(err);
        console.log(rows);
    })

    
})

//exportar banco de dados
module.exports = db;