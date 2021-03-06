// Modelo da Request
const Request = require('../model/Request');

/**
 * @desc Agrega informações da request
 * @param {object} request
 * @return {Request}
 */
const info = (request) => ({
  ip: request.headers['x-forwarded-for'] || request.connection.remoteAddress,
  protocol: request.header.upgrade || request.protocol,
  method: request.method,
  agent: request.headers['user-agent'],
  host: request.headers.host,
  url: request.url.replace(/&password=.*/g, ''),
  body: JSON.stringify(request.body).replace(/\\"password\\":.*",/g, '')
});

/**
 * @desc Inseri uma requisição no banco
 * @param {object} request requisição a ser inserida
 * @return {Promise}
 */
const create = (request) => Request.query().insert(info(request));

/**
 * @desc Lista requests
 * @return {Promise}
 */
const list = () => Request.query();

/**
 * @desc Seleciona request no banco
 * @param {object} id requisição a ser inserida
 * @return {Promise}
 */
const find = (id) => Request.query().findById(id);

/**
 * @desc Deleta registro da requisição
 * @param {number} id
 * @return {Promise}
 */
const remove = (id) => Request.query().deleteById(id);

module.exports = {
  create,
  list,
  find,
  remove
};
