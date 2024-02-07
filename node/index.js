const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
}

const names = [
    "Miguel","Lucas","Guilherme","Gabriel","Arthur",
    "João","Pedro","Rafael","Enzo","Gustavo","Bernardo","Davi",
    "Noah","Matheus","Benjamim","Laura","Beatriz","Maria","Júlia",
    "Alice","Ana","Helena","Mariana","Lara","Larissa","Sofia",
    "Maria Eduarda","Letícia","Isabela","Camila"
]

const mysql = require('mysql')

const randName = () => {
    return names[Math.floor(Math.random()*names.length)]
}

app.get('/', (req, res) => {
    let response = '<h1>Full Cycle Rocks!</h1>'
    response = response + '<ul>'
    const connection = mysql.createConnection(config)
    connection.connect((err1) => {
        if (err1) throw err1
        connection.query(`INSERT INTO people(name) values('${randName()}')`, (err2, result) => {
            if (err2) throw err2;
            connection.query(`SELECT * FROM people`, (err3, rows) => {
                if (err3) throw err3;
                rows.forEach(element => {
                    response = response + '<li>' + element.name + '</li>'
                });

                response = response + '</ul>'
                res.send(response)
                connection.end()
            })
        })
    })


})


app.listen(port, () => {
    console.log("Rodando na porta " + port)
})