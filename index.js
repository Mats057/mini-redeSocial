const form = document.querySelector("#sendPost");
const submit = document.querySelector("#submit");
const textoPost = document.querySelector("#textPost");
const categorias = document.querySelector("#categorias");
const imagens = [
  document.querySelector("#imagem1"),
  document.querySelector("#imagem2"),
  document.querySelector("#imagem3"),
];

document.addEventListener("DOMContentLoaded", createCarousel);

submit.addEventListener("click", function (event) {
  event.preventDefault();
  if (verifyValue(textoPost) && verifyValue(categorias)) {
    let dateString = new Date().toLocaleString("pt-BR", {
      timeZone: "America/Sao_Paulo",
    });
    let post = {
      texto: textoPost.value,
      categoria: categorias.value,
      imagens: [imagens[0].value, imagens[1].value, imagens[2].value],
      data: dateString,
    };
    salvarPost(post);
  } else {
    alert("Preencha todos os campos obrigatórios");
  }
});

const verifyValue = (item) => {
  if (!item.value || item.value == "") {
    item.classList.add("required");
    return false;
  }
  item.classList.remove("required");
  return true;
};

function salvarPost(post) {
  const posts = JSON.parse(localStorage.getItem("posts")) || [];
  posts.push(post);
  localStorage.setItem("posts", JSON.stringify(posts));
  renderPosts();
}

function renderPosts() {
  const posts = JSON.parse(localStorage.getItem("posts")) || [];
  const postContainer = document.querySelector("#posts");
  postContainer.innerHTML = "";
  posts.forEach((post, id) => {
    postContainer.innerHTML += `
    <div class="post">
        <p class="titulo">${post.texto}</p>
        <div class="carousel">
            <div class="carousel-inner">
                <img class="carousel-item active" src="${
                  post.imagens[0] ? post.imagens[0] : "./assets/empty.jpg"
                }">
                <img class="carousel-item" src="${
                  post.imagens[1] ? post.imagens[1] : "./assets/empty.jpg"
                }">
                <img class="carousel-item" src="${
                  post.imagens[2] ? post.imagens[2] : "./assets/empty.jpg"
                }">
            </div>
            <button class="carousel-control prev" id="prevBtn">Prev</button>
            <button class="carousel-control next" id="nextBtn">Next</button>
        </div>
        <p class="categoria">Categoria: ${post.categoria}</p>
        <div class="dataHora">
          <p>Data e Hora:</p>
          <p class="data">${post.data}</p>
        </div>
        <div class="actions">
          <button onclick="editarPost(${id})"><i class="fa-solid fa-pen-to-square"></i>Editar</button>
          <button onclick="apagarPost(${id})"><i class="fa-solid fa-eraser"></i> Apagar</button>
        </div>
    </div>
    <span class="divider"></span>
        `;
  });
  createCarousel();
}

function apagarPost(id) {
    if(confirm("Deseja realmente apagar este post?")) {
        const posts = JSON.parse(localStorage.getItem("posts")) || [];
        posts.splice(id, 1);
        localStorage.setItem("posts", JSON.stringify(posts));
        renderPosts();
    }
}

function editarPost(id) {
  const posts = JSON.parse(localStorage.getItem("posts")) || [];
  const post = posts[id];
  post.texto = prompt("Digite o novo texto do post", post.texto) || post.texto;
  post.data = new Date().toLocaleString("pt-BR", {
    timeZone: "America/Sao_Paulo",
  });
  localStorage.setItem("posts", JSON.stringify(posts));
  renderPosts();
}

function createCarousel() {
  const carousels = document.querySelectorAll(".carousel");

  carousels.forEach((carousel) => {
    const carouselInner = carousel.querySelector(".carousel-inner");
    const items = carousel.querySelectorAll(".carousel-item");
    const prevBtn = carousel.querySelector(".carousel-control.prev");
    const nextBtn = carousel.querySelector(".carousel-control.next");
    let index = 0;

    function updateCarousel() {
      const width = items[0].clientWidth;
      carouselInner.style.transform = `translateX(${-index * width}px)`;
    }

    nextBtn.addEventListener("click", function () {
      index = (index + 1) % items.length;
      updateCarousel();
    });

    prevBtn.addEventListener("click", function () {
      index = (index - 1 + items.length) % items.length;
      updateCarousel();
    });

    window.addEventListener("resize", updateCarousel);

    updateCarousel();
  });
}

renderPosts();
