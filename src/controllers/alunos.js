const Student = require("../models/Student");
const { findCreateFind } = require("../models/Student");

module.exports = {

    //função que vai ser executada pela rota
     async listarAlunos (req, res){

        try{
            const alunos = await Student.findAll();
            res.send(alunos);
        }
        catch(error){
            console.log(error);
            res.status(500).send({error})
        }  
    },

    async adicionarAlunos(req, res){  
        //receber os dados do body
        const {ra, nome, email, senha} = req.body;

        try{

            //SELECT * FROM tblalunos WHERE  ra ? AND email - ?
            let aluno = Student.findOne({
                where: {ra}
            })    
            if(!aluno)
                res.status(400).send({erro: "Aluno já cadastrado"});

            aluno = await Student.create({ra, nome, email, senha});
            /*implementar o último id
            const nextID = alunos.length > 0 ? alunos[alunos.length -1].id + 1: 1;*/    
            /*adicionar o aluno na lista
            alunos.push({id: nextID, ra, nome, email, senha });*/
        
            //retornando uma resposta de sucesso
            res.status(201).send({id: aluno.id});
        }
        catch(error){
            // console.log("erro");
            res.status(400).send("");
        }
    
    },
    
    async buscarAluno(req, res){
        //recuperar o id do aluno
        const alunoID = req.params.id;
    
        /*buscar o aluno na lista
        const aluno = alunos.find(a => a.id.toString() === alunoID);*/
        let aluno = await Student.findByPk(alunoID, {
            attributes:["id", "nome", "ra", "email"]
        });
    
        //se o aluno não for encontrado, retornar o not found
        if(!aluno)
            return res.status(404).send({erro: "Aluno não encontrado"});
    
        //Se o aluno encontrado retornar o aluno
        delete aluno.senha;
    
        res.send(aluno);
    },
    
    async deletarAluno(req, res){
        //recuperar o id do aluno a ser deletado
        const alunoID = req.params.id;
    
    
        /*retirar o aluno da lista
        alunos = alunos.filter(a => a.id.toString() !== alunoID);*/
        try{
            let aluno = await Student.findByPk(alunoID);
            if(!aluno)
                return res.status(404).send({erro:"Aluno não encontrado"});
            await aluno.destroy();
            
            res.status(200).send();
        }
        catch(error){
            console.log(error);
            res.status(500).send(error);
        }
    
        //devolver resposta de sucesso
        res.status(204).send();
    },
    
    async editarAluno(req, res){
        //recuperar o id do aluno a ser editado
        const alunoID = req.params.id;
        
        const {nome, email} = req.body;
        /*recuperar os dados do corpo
        fazer a alteração
        alunos = alunos.map(
            a => a.id.toString() === alunoID ? {...a, nome, email} : a
            );*/
        try{
                console.log(1)
                let aluno = await Student.findByPk(alunoID);
                
                


            if(!aluno)
                res.status(404).send({erro:"Aluno não encontrado"});

            aluno.nome = nome;
            aluno.email = email;

            aluno.save();

                //devolver a resposta de sucesso
            res.status(204).send(alunos);
            
        }
        catch(error){
            console.log(error);
            res.status(500).send(error);
        }  
    }
}