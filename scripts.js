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