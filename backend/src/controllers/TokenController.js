const jwt = require('jsonwebtoken');

class SessionController {
  async create(req, res) {
    const {login, password} = req.body;

    //Usuário Genérico
    // Apenas para criar Token

    if(login && login === "admin" && password && password === "admin"){
        return res.json({
            success: true,
            token: jwt.sign({}, 'generictSecret', {
              expiresIn: '1h',
            }),
        });
    }else{
        return res.status(400).json({
            success: false,
            error: "usuário invalido"
        });
    }

  }
}

module.exports = new SessionController();
