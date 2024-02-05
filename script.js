const nome = prompt('Qual seu nome?');

const usuario = [];

function entradaNaSala() {
    const novoUsuario = {name: nome};
    usuario.push(novoUsuario);
    cadastrarUsuario();
}

entradaNaSala();

function cadastrarUsuario() {
    const cadastro = axios.post('https://api-bate-papo-caiusidt.onrender.com/participants', usuario[0]);
    console.log(cadastro);
    cadastro.then(envioComSucesso);
    cadastro.catch(envioComFalha);
}

function envioComSucesso(sucesso) {
    console.log('deu certo');
}

function envioComFalha(falha) {
    console.log("Status code: " + falha.response.status);
}
