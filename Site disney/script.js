function verifierReponse(num, bonneReponse) {
    let reponse = document.getElementById('reponse' + num).value.trim();
    if (reponse.toLowerCase() === bonneReponse.toLowerCase()) {
        console.log(`✅ Bonne réponse pour l'énigme ${num}`);

        setTimeout(() => {
            document.getElementById('enigme' + num).classList.remove('active');
            let next = document.getElementById('enigme' + (num + 1));
            if (next) {
                next.classList.add('active');
                console.log(`🔄 Passage à l'énigme ${num + 1}`);

                // 🔥 Lancer la musique Disney correspondante
                playSpotifyPreview(num + 1);
            } else {
                console.log("🎉 Toutes les énigmes sont terminées !");
            }
        }, 3000);
    } else {
        alert('Oups ! Essaie encore.');
    }
}
