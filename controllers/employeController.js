const { response } = require("../app")
var defaultModel = require("../models/employe")

var employeController = {}

employeController.createData = async (req, res, next) => {
    let data = new defaultModel(req.body);
    await data.save((error, data) => {
        if (error) {

            console.log(error)
            res.json({
                "code": "01", "message": "error"
            })
        }
        else {
            res.json({
                "code": "00", "message": "succes", "data": data
            })
        }
    })
    // res.json({ "code": "yes", "data": req.body })
}


employeController.getData = async (req, res, next) => {
    let data = await defaultModel.find({})
    res.json({
        "code": "00", "message": "succes", "data": data
    })
}

employeController.getId = async (req, res, next) => {
    let data = await defaultModel.findOne({ _id: req.params.id })
    res.json({ "code": "00", "message": "success", "data": data })
}

employeController.update = async (req, res, next) => {
    defaultModel.findByIdAndUpdate( req.params.id, req.body, (error, data) => {
        if (error) {
            console.log(error)
            res.json({
                "code": "01", "message": "error"
            })
        } else if (!data) {
            res.json({
                "code": "01", "message": "DATA NOT FOUND"
            })
        } else {
            res.json({
                "code": "00", "message": "succes", "data": data._id
            })
        }
    })
}

employeController.delete = async (req, res, next) => {
    console.log(req.params.id)
    defaultModel.findByIdAndDelete({ _id: req.params.id }, (error, writeOpResult) => {
        if (error) {
            console.log(error)
            res.json({
                "code": "01", "message": "error"
            })
        } else if (!writeOpResult) {
            res.json({
                "code": "01", "message": "DATA NOT FOUND"
            })
        } else {
            res.json({
                "code": "00", "message": "succes Deleted",
            })
        }
    })
}

module.exports = employeController