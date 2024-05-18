const form = document.querySelector('#sendPost');
const submit = document.querySelector('#submit')
const textoPost = document.querySelector('#textPost');
const categorias = document.querySelector('#categorias');
const imagens = [
    document.querySelector('#imagem1'), 
    document.querySelector('#imagem2'),
    document.querySelector('#imagem3')
]
submit.addEventListener("click", function(event){
    event.preventDefault();
    if(verifyValue(textoPost) && verifyValue(categorias)){
        let dateString = new Date().toLocaleString("pt-BR", {timeZone: "America/Sao_Paulo"});
        let post = {
            texto: textoPost.value,
            categoria: categorias.value,
            imagens: [imagens[0].value, imagens[1].value, imagens[2].value],
            data: dateString
        }
        console.log(post)
    }else{
        alert('Preencha todos os campos obrigatórios')
    }
});


const verifyValue = item => {
    if(!item.value || item.value == ''){
        item.classList.add('required')
        return false
    }
    item.classList.remove('required')
    return true

}