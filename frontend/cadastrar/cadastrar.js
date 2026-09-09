const button = document.querySelector("button")

button.addEventListener("click", cadastrarFilme)

async function cadastrarFilme() {
    // pegar as informações do formulário e enviar para o backend
    const name = document.getElementById("name").value
    const genre = document.getElementById("genre").value
    const ageRating = document.getElementById("ageRating").value
    const duration = document.getElementById("duration").value

    if (name === "" || genre === "" || ageRating === "" || duration === "") {
        alert("Preencha todas as informações!")
        return
    }

    const filme = {
        name,
        genre,
        ageRating,
        duration
    }

    const resposta = await fetch("https://crudcompletofilmes-main.vercel.app/create-movies", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(filme)
    })

    const respostaJS = await resposta.json()

    alert(respostaJS.message)

    window.location.href = "../index.html"
}