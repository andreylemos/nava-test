const { personsModel } = require("./../models/persons");
const { returnService } = require('./../utils/return');
const { returnFields } = require('./../utils/returnFields');

const personsController = {
  getPerson(req, res) {
    if(req.params.id){
        personsModel.findOne({ document: req.params.id })  
        .then(data => {
          if(data){
            returnService.sender(res, 200, false, null, null, returnFields.selectFields(data, ["name", "document", "birthdate"]));
          }else{
            returnService.sendError(res, 404, 'Pessoa não encontrada', null);
          }
        }).catch((e) => {
          returnService.sendError(res, 500, 'Falha ao buscar pessoa', null);
        });

    }
  },

  getAll(req, res) {
    personsModel.find()  
    .then(data => {
        if(data && data.length > 0){
          returnService.sender(res, 200, false, null, null, returnFields.selectFields(data, ["name", "document", "birthdate"]));
        }else{
          returnService.sendError(res, 404, 'Pessoas não encontradas', null);
        }
    }).catch((e) => {
        returnService.sendError(res, 500, 'Falha ao buscar pessoas', null);
    });
  },
};

module.exports = {
    personsController,
}