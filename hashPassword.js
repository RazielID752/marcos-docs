const bcrypt = require('bcryptjs');

const senhaSimples = 'teste@1234';  // A senha que você quer hash
const saltRounds = 10;  // O número de "salt rounds" (quanto mais alto, mais seguro, mas mais lento)

bcrypt.hash(senhaSimples, saltRounds)
  .then((senhaHash) => {
    console.log('Senha Hashada:', senhaHash);
  })
  .catch((erro) => {
    console.log('Erro ao gerar o hash:', erro);
  });
