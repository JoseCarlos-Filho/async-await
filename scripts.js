const uploadBtn = document.getElementById("upload-btn");
const inputUpload = document.getElementById("image-upload");

uploadBtn.addEventListener("click", () => {
  inputUpload.click();
});

// função que devolve uma Promisse ao carregar um arquivo
function lerConteudoDoArquivo(arquivo) {
    return new Promise((resolve, reject) => {
        const leitor = new FileReader();
        leitor.onload = () => {
            resolve({url: leitor.result, nome: arquivo.name});
        }
        
        leitor.onerror = () => {
            reject(`Erro na leitura do arquivo ${arquivo.name}`);
        }

        leitor.readAsDataURL(arquivo);
    })
}

const imagemPrincipal = document.querySelector(".main-imagem");
const nomeDaImagem = document.querySelector(".container-imagem-nome p");

// elemento html com evento de mudança "change" chama uma função assincrona
// com o parâmetro do arquivo selecionado e espera a promisse(await) resolver
// se encontrou o arquivo selecionado ou não.
// se encontrou atualiza source("src") do elemento e o nome do arquivo.
inputUpload.addEventListener("change", async (evento) => {
    const arquivos = evento.target.files[0];

    if (arquivos) {
        try {
            const conteudoDoArquivo = await lerConteudoDoArquivo(arquivos); 
            imagemPrincipal.src = conteudoDoArquivo.url;
            nomeDaImagem.textContent = conteudoDoArquivo.nome;
        } catch (error) {
            console.error("Erro ao ler o arquivo:", error);
        }
    }
});

const inputTags = document.getElementById("input-tags");
const listaTags = document.getElementById("lista-tags");

listaTags.addEventListener("click", (evento) => {
    if (evento.target.classList.contains("remove-tag")) {
        const tagASerRemovida = evento.target.parentElement;
        listaTags.removeChild(tagASerRemovida);
    }
})

const tagsDisponiveis = ["Front-end", "Programação", "Data Science", "Full-stack", "Mobile", "Machine Learning", "DevOps", "HTML", "CSS", "JavaScript", "React", "Vue", "Angular"];

async function verificaTagsDisponiveis(tagTexto) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(tagsDisponiveis.includes(tagTexto));
        }, 1000);
    })
}

inputTags.addEventListener("keypress", async (evento) => {
    if (evento.key === "Enter") {
        evento.preventDefault();
        const tagTexto = inputTags.value.trim();
        if (tagTexto !== "") {
            try {
                const tagExiste = await verificaTagsDisponiveis(tagTexto);
                if (tagExiste) {
                    const tagNova = document.createElement("li");
                    tagNova.innerHTML = `<p>${tagTexto}</p> <img src="./img/close-black.svg" class="remove-tag">`
                    listaTags.appendChild(tagNova);
                    inputTags.value = "";
                } else {
                    alert("Tag não disponível");
                }
            } catch(error) {
                console.error("Erro ao verificar a disponibilidade da tag:", error);
                alert("Erro ao verificar a disponibilidade da tag");
            }
        }
    }
});

async function publicarProjeto(nomeDoProjeto, descricaoDoProjeto, tagsProjeto) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const deuCerto = Math.random() > 0.5;
            if (deuCerto) {
                resolve("Projeto publicado com sucesso!");
            } else {
                reject("Erro ao publicar o projeto");
            }
        }, 2000);
    })
}

const botaoPublicar = document.querySelector(".botao-publicar");
botaoPublicar.addEventListener("click", async (evento) => {
    evento.preventDefault();

    const nomeDoProjeto = document.getElementById("nome").value;
    const descricaoDoProjeto = document.getElementById("descricao").value;
    const tagsProjeto = Array.from(listaTags.querySelectorAll("p")).map((tag) => tag.textContent);

    try {
        const resultado = await publicarProjeto(nomeDoProjeto, descricaoDoProjeto, tagsProjeto);
        console.log(resultado);
        alert("Ok, dados enviados com sucesso!");
    } catch (error) {
        console.log(error);
        alert("Erro ao publicar o projeto");
    }

});

const botaoDesacartar = document.querySelector("botao-descartar");
botaoDesacartar.addEventListener("click", (evento) => {
    evento.preventDefault();

    const formulario = document.querySelector("form");
    formulario.reset();

    imagemPrincipal.src = "./img/imagem1.png";
    nomeDaImagem.textContent = "imagem_projeto.png";
    listaTags.innerHTML = "";
});