//jshint esversion: 6
module.exports = app => {
    const tutorials = require("../controllers/tutorial.controller.js");  
    let router = require("express").Router();

    router.post("/", tutorials.create); //creates a new tutorial
    router.get("/", tutorials.findAll); //retrieves all tutorials
    router.get("/published", tutorials.findAllPublished); //retrieves all published tutorials
    router.get("/:id", tutorials.findOne); //retrieves a single tutorial with  particular id
    router.put("/:id", tutorials.update); //updates a autorial with a particular id
    router.delete("/:id", tutorials.delete); //deletes a tutorial with a particular id
    router.delete("/", tutorials.deleteAll); //creates a new tutorial
  
    app.use('/api/tutorials', router);
};    