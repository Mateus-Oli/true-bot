// Rotas
const express = require('express');
const router = express.Router();

// Validador de Login
const loginService = require('../../service/login.service');


// Rotas de Login
router.route('/login')
  .get((req, res) => {

    // Informação do Usuario
    const {username, password} = req.query;

    // Valida login
    loginService
      .validate(username, password)
      .then(loginService.generateToken)
      .then((user) => res.json(user))
      .catch((err) => res.status(401).send(err));
  });

router.route('/reset')
  .put((req, res) => {

    return loginService
      .resetPassword(req.body.username || req.body.email)
      .then(() => res.json('OK'))
      .catch((err) => res.status(500).send(err));
  });

module.exports = router;
