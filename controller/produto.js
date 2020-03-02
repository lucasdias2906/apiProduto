const mysql = require("mysql")

const db = mysql.createConnection({
    multipleStatements: true,
    host: 'mysql.cristoematos.com.br',
    user: 'cristoematos',
    password: 'Lucas2906',
    database: 'cristoematos'
})

db.connect(function (err) {
    if (err) throw err
    console.log("Conectado com Sucesso ao banco")
})

exports.get = ((req, res) => {
    db.query("SELECT c.id_user,c.name,p.titulo,p.preco_produto FROM produto as p INNER JOIN cadastro as c ON p.id_user = c.id_user",
        function (err, rows, fields) {
            if (!err) {
                res.status(200).send({ data: rows })
            } else {
                res.status(400).send({
                    message: "erro ao realizar a Consulta",
                    data: rows
                })
            }
        }
    )
})

exports.post = (function (req, res) {

    const id_user = req.body.id_user
    const titulo = req.body.titulo
    const preco_produto = req.body.preco_produto

    if (id_user == "" || titulo == "" || preco_produto == "") {
        return res.send("Todos os campos sao Obrigatorios")
    }

    const values = [id_user, titulo, preco_produto]
    const query = `INSERT INTO produto (id_user,titulo,preco_produto)
    VALUES(
        '${id_user}',
        '${titulo}',
        '${preco_produto}')`

    db.query(query, values, function (err, rows, result) {
        if (!err) {
            return res.status(200).send({
                message: " Produto Cadastrado com Sucesso"
            })
        }
        console.log(err)
        return res.status(400).send({
            message: "erro ao cadastrar"
        })
    })
})

exports.put = (function (req, res) {
    const { id_user, titulo, preco_produto, id } = req.body

    if (id_user == "" || titulo == "" || preco_produto == "") {
        return res.send("Todos os campos são Obrigatorios")
    }

    const query = `UPDATE produto SET
    id_user = '${id_user}',
    titulo = '${titulo}',
    preco_produto = '${preco_produto}'
    WHERE id = ${id}`

    db.query(query, function (err, rows, result) {
        if (!err) {
            return res.status(200).send({
                message: "Produto Atualizado com Sucesso"
            })
        }
        console.log(err)

        return res.status(400).send({
            message: "erro ao atualizar o cadastro"
        })
    })
})

exports.delete = ((req, res) => {

    const { id } = req.body

    if (!id) return res.status(400).send({
        message: "Verifique o ID informado" + id
    });

    const query = `DELETE FROM produto WHERE id = ${id}`
    db.query(query, function (err, rows, result) {
        console.log("RES", result)
        console.log("ERR", err)
        console.log(" ROW", rows)

        if (err) {
            return res.status(400).send({
                message: "Erro ao deletar Produto" + err,
                erro: err
            })
        }


        if (rows.affectedRows) return res.status(200).send({
            message: "Produto Deletado com sucesso"
        });

        return res.status(400).send({ message: "Não houve alteração na base de dados." })

    })
})