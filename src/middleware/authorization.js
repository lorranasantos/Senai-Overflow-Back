const jwt = require("jsonwebtoken");
const auth = require("../config/auth.json");

module.exports = (req, res, next) => {
    // pegando o campo autorização do cabeçalho da requisição
    const { authorization } = req.headers;

    // Verifica se o campo foi informado, se não retorna erro
    if (!authorization)
        return res.status(401).send({ error: "Token não informado" });

    // Separa o prefixo do token
    const [ Bearer, token ] = authorization.split(" ");

    // Verifica se o token está presente, se não retorna erro
    if (!token)
        return res.status(401).send({ error: "Token mal formulado" });

    try {

        // Verifica se o token é válido , se não cai no catch
        const payload = jwt.verify(token, auth.secret);

        // coloca o id do aluno na requisição
        req.studentId = payload.studentId;

        // envia a requisição para frente (controller)
        return next();


    } catch (error) {
        // Retorna o errode token inválido
        res.status(401).send({ error: "Token inválido" })
    }
}