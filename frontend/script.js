async function buscarFilmes() {
    // através do acesso a rota GET, trazer os filmes e mostrar na tela
    const resposta = await fetch("https://crudcompletofilmes-main.vercel.app/")
    const filmes = await resposta.json()
    const sectionFilmes = document.querySelector(".filmes")
    
    filmes.forEach((filme) => {
        sectionFilmes.innerHTML += `
            <div>
                <h2>${filme.name}</h2>
                <p><strong>Gênero:</strong> ${filme.genre}</p>
                <p><strong>Duração:</strong> ${filme.duration} minutos</p>
                <p><strong>Classificação indicativa:</strong> ${filme.ageRating > 0 ? filme.ageRating + ' anos' : 'Livre'}</p>

                <button onclick="apagarFilme(${filme.id})">Apagar</button>
            </div>
        `
    })
}

async function apagarFilme(id) {
    const resposta = await fetch(`https://crudcompletofilmes-main.vercel.app/delete-movies/${id}`, { method: "DELETE" })
    const respostaJS = await resposta.json()

    alert(respostaJS.message)

    window.location.reload()
}

buscarFilmes()