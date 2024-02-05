const nome = prompt('Qual seu nome?');

let usuario = [];
let conteudo;

function entradaNaSala() {
    const novoUsuario = {name: nome};
    usuario.push(novoUsuario);
    cadastrarUsuario();
}

entradaNaSala();
setInterval(statusOnline, 5000);

function cadastrarUsuario() {
    const cadastro = axios.post('https://api-bate-papo-caiusidt.onrender.com/participants', usuario[0]);
    cadastro.then(envioComSucesso);
    cadastro.catch(envioComFalha);

    const primeiroStatus = axios.post('https://api-bate-papo-caiusidt.onrender.com/status', usuario[0]);
}

function envioComSucesso(sucesso) {
    chamarGet();
}

function envioComFalha(falha) {
    console.log("Cadastro com Erro: " + falha.response.status);
}

function statusOnline() {
    const online = axios.post('https://api-bate-papo-caiusidt.onrender.com/status', usuario[0]);
    chamarGet();
}

function chamarGet() {
    const mensagens = axios.get('https://api-bate-papo-caiusidt.onrender.com/messages');
    mensagens.then(recebeuComSucesso);
    mensagens.catch(recebeuComFalha);
}

function recebeuComSucesso(sucesso) {
    console.log(sucesso.data);
    conteudo = sucesso.data;
    renderizarConteudo();
}

function recebeuComFalha(erro) {
    console.log('Falha ao receber mensagem: ' + erro.response.status);
}

function renderizarConteudo() {
    const ul = document.querySelector('.campo-de-mensagens');
    ul.innerHTML = '';

    /* for (let i = 0; i < conteudo.length; i++) {
        ul.innerHTML = ul.innerHTML + `
        <li>
        ${conteudo[i].time}
        ${conteudo[i].from}
        ${conteudo[i].text};
        </li>    
        `
    }*/

    for (let i = 0; i < conteudo.length; i++) {

        if (conteudo[i].type === "status") {
            ul.innerHTML = ul.innerHTML + `
            <li class='status'>
            (${conteudo[i].to_char})
            ${conteudo[i].from}
            ${conteudo[i].text}
            </li>    
            `
        } else if (conteudo[i].type === "message") {
            ul.innerHTML = ul.innerHTML + `
            <li class='normal'>
            (${conteudo[i].to_char})
            ${conteudo[i].from}:
            ${conteudo[i].text}
            </li>    
            `
        }
    }
}

function enviarMsg() {
    const textoDigitado = document.querySelector('.escreva-aqui');
    const estrutura = {

        from: nome,
        to: 'Todos',
        text: textoDigitado.value,
        type: "message", 
    }
    console.log(estrutura);
    const enviando = axios.post('https://api-bate-papo-caiusidt.onrender.com/messages', estrutura);
    enviando.then(msgEnviada);
    enviando.catch(msgNaoEnviada);

}

function msgEnviada(sucesso) {
    console.log(sucesso);
    chamarGet();
}

function msgNaoEnviada(erro) {
    console.log(erro.response.status);
}