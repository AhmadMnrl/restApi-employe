var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const swaggerJsdoc = require('swagger-jsdoc');
const bodyParser = require('body-parser');

var employeController = require('./controllers/employeController')

const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger.json');

const dotenv = require('dotenv');
dotenv.config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
// var employeRouter = require('./routes/employe');

var app = express();

require('./config/db')


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const swaggerOptions = {
    swaggerDefinition : {
      title : "API",
      description : "API Information",
      servers : ["http://localhost:3000"]
    },

    apis : ["app.js"]
}
const swaggerDocs = swaggerJsdoc(swaggerOptions)

// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))

// app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/employe',swaggerUi.serve, swaggerUi.setup(swaggerDocs))
// app.use('/employe');

/**
   * @swagger
   * /:
   *   get:
   *     description: Returns the homepage
   *     responses:
   *       200:
   *         description: test get data all employe
   */
  app.get('/', employeController.getData )
/**
 * @swagger
 * /getId/{id}:
 *  get:
 *    summary: Get By Id
 *    parameters:
 *    - in: path
 *      name: id
 *      schema:
 *        type: string
 *      required: true
 *    description: Get Id with Params
 *    responses:
 *      '200':
 *        description: A successful response
 */
  app.get('/getId/:id', employeController.getId)
 /**
 * @swagger
 * /post:
 *  post:
 *    summary: Created employe
 *    parameters:
 *    - in: body
 *      name: employe
 *      schema:
 *        type: object
 *        required: true
 *        properties : 
 *          nama : 
 *            type: String
 *          jabatan:
 *            type : String
 *    description: Get Id with Params
 *    responses:
 *      '200':
 *        description: A successful response
 */

 
  app.post('/post', employeController.createData)
/**
 * @swagger
 * /update/{id}:
 *  put:
 *    summary: Update Data
 *    parameters:
 *    - in: path
 *      name: id
 *      schema:
 *        type: string
 *      required: true
 *    - in : body
 *      name : employe
 *      schema : 
 *         type: object
 *         required : true
 *         properties:
 *            nama : 
 *              type: String
 *            jabatan :
 *              type : String 
 *    description: Update employe
 *    responses:
 *      '204':
 *        description: Update Data Successfull
 *      '404':
 *        description : Data Not Found
 */
  app.put('/update/:id', employeController.update)


 /**
 * @swagger
 * /{id}:
 *  delete:
 *    summary: Delete Data
 *    parameters:
 *    - in: path
 *      name: id
 *      schema:
 *        type: string
 *      required: true
 *    description: Delete employe
 *    responses:
 *      '204':
 *        description: Delete Data Successfull
 *      '404':
 *        description : Data Not Found
 */
  app.delete('/:id',employeController.delete)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
