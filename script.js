const nome = prompt('Qual seu nome?');

let usuario = [];
let conteudo = [];

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
    console.log('Cadastro deu certo: ' + sucesso.data);
}

function envioComFalha(falha) {
    console.log("Cadastro com Erro: " + falha.response.status);
}

const mensagens = axios.get('https://api-bate-papo-caiusidt.onrender.com/messages');
mensagens.then(recebeuComSucesso);
mensagens.catch(recebeuComFalha);

function recebeuComSucesso(sucesso) {
    console.log('Recebeu mensagens com sucesso: ' + sucesso.data);
    conteudo = sucesso.data;
    renderizarConteudo();
}

function recebeuComFalha(erro) {
    console.log('Falha ao receber mensagem: ' + erro.response.status);
}

renderizarConteudo(); {
    const ul = document.querySelector('campo-de-mensagens');
    ul.innerHTML = '';

    for (let i = 0; i < conteudo.length; i++) {
        ul.innerHTML = ul.innerHTML + `
        <li>
            ${conteudo[i].from}
        </li>    
        `
    }
}


/* function buscarMensagens() {
    const mensagens = axios.get('https://api-bate-papo-caiusidt.onrender.com/messages');
    console.log(mensagens);
    mensagens.then(recebeuComSucesso);
    mensagens.catch(recebeuComFalha);
}

function recebeuComSucesso(sucesso) {
    console.log('Recebeu mensagens com sucesso: ' + sucesso.data);
}

function recebeuComFalha(erro) {
    console.log('Falha ao receber mensagem: ' + erro.response.status);
}

buscarMensagens();*/