function gerarSenha() {
    const comprimento = document.getElementById("comprimento").value;
    const incluirNumeros = document.getElementById("numeros").checked;
    const incluirLetras = document.getElementById("letras").checked;
    const incluirEspeciais = document.getElementById("especiais").checked;
    let descricao = document.getElementById("descricao").value;
    const caracteresRemover = document.getElementById("caracteres-remover").value.split(" ").join("");

    if (!descricao.trim()) {
        descricao = "Sem descrição";
    }

    let caracteres = "";

    if (incluirNumeros) {
        caracteres += "0123456789";
    }

    if (incluirLetras) {
        caracteres += "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }

    if (incluirEspeciais) {
        caracteres += "!@#$%^&*()-_=+[]{}|;:,.<>?/~";
    }

    let senha = "";
    for (let i = 0; i < comprimento; i++) {
        const randomIndex = Math.floor(Math.random() * caracteres.length);
        senha += caracteres[randomIndex];
    }

    for (let char of caracteresRemover) {
        senha = senha.replace(char, "");
    }
    document.getElementById("senha-gerada").textContent = senha;

    salvarConfiguracoes(descricao, comprimento, caracteresRemover, incluirNumeros, incluirLetras, incluirEspeciais);
    salvarSenha(descricao, senha);
}

function salvarSenha(descricao, senha) {
    let senhas = JSON.parse(localStorage.getItem("senhas")) || [];
    senhas.push({ descricao, senha });
    localStorage.setItem("senhas", JSON.stringify(senhas));
    atualizarListaSenhas();
}

function salvarConfiguracoes(descricao, comprimento, caracteresRemover, incluirNumeros, incluirLetras, incluirEspeciais) {
    const configuracoes = {
        descricao,
        comprimento,
        caracteresRemover,
        incluirNumeros,
        incluirLetras,
        incluirEspeciais
    };
    localStorage.setItem("configuracoes", JSON.stringify(configuracoes));
}

function carregarConfiguracoes() {
    const configuracoes = JSON.parse(localStorage.getItem("configuracoes"));
    if (configuracoes) {
        document.getElementById("descricao").value = configuracoes.descricao;
        document.getElementById("comprimento").value = configuracoes.comprimento;
        document.getElementById("numeros").checked = configuracoes.incluirNumeros;
        document.getElementById("letras").checked = configuracoes.incluirLetras;
        document.getElementById("especiais").checked = configuracoes.incluirEspeciais;
        document.getElementById("caracteres-remover").value = configuracoes.caracteresRemover;
    }
}

function atualizarListaSenhas() {
    const listaSenhas = JSON.parse(localStorage.getItem("senhas")) || [];
    const listaElement = document.getElementById("lista-senhas");
    listaElement.innerHTML = "";
    listaSenhas.forEach((senhaItem, index) => {
        const li = document.createElement("li");
        li.classList.add("list-group-item");
        li.textContent = `${senhaItem.descricao}: ${senhaItem.senha}`;
        listaElement.appendChild(li);
    });
}

function limparConfiguracoes() {
    localStorage.removeItem("configuracoes");
    localStorage.removeItem("senhas");
    document.getElementById("descricao").value = "";
    document.getElementById("comprimento").value = 12;
    document.getElementById("numeros").checked = true;
    document.getElementById("letras").checked = true;
    document.getElementById("especiais").checked = false;
    document.getElementById("caracteres-remover").value = "";
    atualizarListaSenhas();
}

function limparSenhas() {
    localStorage.removeItem("senhas");
    atualizarListaSenhas();
}

window.onload = function () {
    carregarConfiguracoes();

    document.getElementById("limpar-configuracoes").onclick = limparConfiguracoes;
    document.getElementById("limpar-senhas").onclick = limparSenhas;

    atualizarListaSenhas();
};
