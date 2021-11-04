//jshint esversion: 6

const db = require("../models");
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    //validating the request
    if(!req.body.title){
        res.status(400).send({
            message: "Content can't be empty boss"
        });
    return;
    }
    const tutorial = {//Creating a tutorial  
       title: req.body.title,
       description: req.body.description,
       published: req.body.published ? req.body.published : false 
    };

    Tutorial.create(tutorial).then(data =>{
       res.send(data);
    }).catch(err => {
       res.status(500).send({
           messsage:
           err.message || "An Error has occurred while making a new Tutotrial :/"
           });
    });
};    

exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;
  
    Tutorial.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || `Some error occurred while retrieving tutorials.`
        });
      });
  };

exports.findOne = (req, res) =>{
    const id = req.params.id;

    Tutorial.findByPk(id).then(data =>{
        if(data){
            res.send(data);
        }else{
            res.status(404).send({
                message: `Tutorial with id ${id}`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: `Sorry! there has been an error getting Tutorial ${id}`
        });
    });
};

exports.update = (req, res) => {
    const id = req.params.id;
  
    Tutorial.update(req.body, {
      where: { id: id }
    }).then(num => {
        if (num == 1) {
          res.send({
            message: `Tutorial has been successfully updated!`
          });
        } else {
          res.send({
            message: `Tutorial ${id} couldn't be updated.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: `Error updating Tutorial ${id}`
        });
      });
  };

  exports.delete = (req, res) => {
    const id = req.params.id;
  
    Tutorial.destroy({
      where: { id: id }
    }).then(num => {
        if (num == 1) {
          res.send({
            message: `Tutorial has been successfully deleted!`
          });
        } else {
          res.send({
            message: `Tutorial ${id} couldn't be deleted.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: `Error deleting Tutorial ${id}`
        });
      });
  };

  exports.deleteAll = (req, res) =>{
      Tutorial.destroy({
          where: {},
          truncate: false
      }).then(nums =>{
          res.send({
              message: `These ${nums} were sucesfully deleted`
          }).catch(err => {
              res.status(500).send({
                  message: err.message || `An error has occurred while attemoting to remove all tutorials`
              });
          });
      });      
  };

  exports.findAllPublished = (req, res) => {
    Tutorial.findAll({ where: { published: true } }).then(data => 
        {
        res.send(data);
      }).catch(err => 
        {res.status(500).send({
          message: err.message || `An error occurred while  attempting to retrieve tutorials`
        });
      });
  };
