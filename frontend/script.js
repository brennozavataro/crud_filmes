async function buscarFilmes() {
    const resposta = await fetch("https://crud-filmes-iota.vercel.app/");
    const filmes = await resposta.json();
    const sectionFilmes = document.querySelector(".filmes");
    
    sectionFilmes.innerHTML = ""; 

    filmes.forEach((filme) => {
        const nameEscaped = (filme.name || '').replace(/'/g, "\\'");
        const genreEscaped = (filme.genre || '').replace(/'/g, "\\'");

        sectionFilmes.innerHTML += `
            <div>
                <h2>${filme.name}</h2>
                <p><strong>Gênero:</strong> ${filme.genre}</p>
                <p><strong>Duração:</strong> ${filme.duration} minutos</p>
                <p><strong>Classificação indicativa:</strong> ${filme.ageRating > 0 ? filme.ageRating + ' anos' : 'Livre'}</p>

                <button onclick="apagarFilme(${filme.id})">Apagar</button>
                <button onclick="atualizarFilme(${filme.id}, '${nameEscaped}', '${genreEscaped}', '${filme.duration}', ${filme.ageRating})">Editar</button>
            </div>
        `;
    });
}

async function apagarFilme(id) {
    const resposta = await fetch(`https://crud-filmes-iota.vercel.app/delete-movies/${id}`, { method: "DELETE" });
    const respostaJS = await resposta.json();

    alert(respostaJS.message);
    window.location.reload();
}

async function atualizarFilme(id, nameAtual, genreAtual, durationAtual, ageRatingAtual) {
    const name = prompt("Nome do filme:", nameAtual);
    if (name === null) return;

    const genre = prompt("Gênero:", genreAtual);
    if (genre === null) return;

    const duration = prompt("Duração em minutos:", durationAtual);
    if (duration === null) return;

    const ageRating = prompt("Classificação indicativa:", ageRatingAtual);
    if (ageRating === null) return;

    const resposta = await fetch(
        `https://crud-filmes-iota.vercel.app/update-movies/${id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                genre,
                duration: Number(duration),
                ageRating: Number(ageRating)
            })
        }
    );

    const respostaJS = await resposta.json();

    if (!resposta.ok) {
        alert(respostaJS.message || "Não foi possível atualizar o filme.");
        return;
    }

    alert(respostaJS.message);
    await buscarFilmes();
}

buscarFilmes();