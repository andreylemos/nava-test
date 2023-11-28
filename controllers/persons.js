const { personsModel } = require("./../models/persons");
const { returnService } = require('./../utils/return');

const personsController = {
  getPerson(req, res) {
    if(req.params.id){
        personsModel.findOne({ document: req.params.id })  
        .then(data => {
          if(data){
            returnService.sender(res,200,false,null,null,data);
          }else{
            returnService.sendError(res,404,'Pessoa não encontrada',null);
          }
        }).catch(() => {
          returnService.sendError(res,400,'Falha ao buscar pessoa',null);
        });

    }
  },

  getAll(req, res) {
    personsModel.find()  
    .then(data => {
        if(data){
        returnService.sender(res,200,false,null,null,data);
        }else{
        returnService.sendError(res,404,'Pessoas não encontradas',null);
        }
    }).catch(() => {
        returnService.sendError(res,400,'Falha ao buscar pessoas',null);
    });
  },
};

module.exports = {
    personsController,
}