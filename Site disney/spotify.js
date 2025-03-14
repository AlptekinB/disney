// ✅ Liste des musiques Disney AVEC extrait disponible sur Spotify
const disneyTracks = {
    1: "0qJeyJXC54Bs2ox1Ufxnrs", // Ce Rêve Bleu (Aladdin)
    2: "6xGruZOHLs39ZbVccQTuPZ", // L'Histoire de la Vie (Instrumental) (Le Roi Lion)
    3: "1q9E0vF6mF4SzR1Wi3VwRF", // Libérée, Délivrée (La Reine des Neiges)
    4: "1VHYQyeNg3RKBjMz4MyKyg"  // Comme un Homme (Mulan)
};
// ✅ Fonction pour obtenir un Token Spotify
async function getSpotifyToken() {
    const clientId = "0f8b033154d34746bd345e36d983adf5"; // Remplace avec ton Client ID
    const clientSecret = "de79abb7c80e4e95bb5134db99359557"; // Remplace avec ton Client Secret

    try {
        const response = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: {
                "Authorization": "Basic " + btoa(clientId + ":" + clientSecret),
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: "grant_type=client_credentials"
        });

        const data = await response.json();
        if (!data.access_token) throw new Error("Échec de l'obtention du Token Spotify.");
        
        console.log("✅ Token Spotify récupéré !");
        return data.access_token;
    } catch (error) {
        console.error("❌ Erreur lors de la récupération du Token Spotify :", error);
        return null;
    }
}

// ✅ Fonction pour récupérer l'URL de l'extrait MP3 depuis l'API Spotify
async function getSpotifyPreviewUrl(trackId) {
    const token = await getSpotifyToken();
    if (!token) {
        console.error("❌ Aucun token disponible, impossible de récupérer l'extrait.");
        return null;
    }

    try {
        const response = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        const data = await response.json();
        return data.preview_url ? data.preview_url : null;
    } catch (error) {
        console.error("❌ Erreur lors de la récupération de l'extrait :", error);
        return null;
    }
}

// ✅ Fonction pour jouer la musique Disney avec un extrait ou une musique de secours
async function playSpotifyPreview(enigmeNum) {
    const previewUrl = await getSpotifyPreviewUrl(disneyTracks[enigmeNum]);

    if (!previewUrl) {
        console.warn(`⚠️ Aucun extrait Spotify disponible pour l'énigme ${enigmeNum}. Utilisation d'une musique de secours.`);
        
        // 🎵 Musique de secours si l'extrait est indisponible
        const backupTracks = {
            1: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
            2: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
            3: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
            4: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
        };

        const backupUrl = backupTracks[enigmeNum] || backupTracks[1]; // Musique de secours
        console.log(`🔄 Lecture de la musique de secours pour l'énigme ${enigmeNum}`);

        const audioPlayer = document.getElementById("audioPlayer");
        audioPlayer.src = backupUrl;
        audioPlayer.play();
        return;
    }

    console.log(`🎵 Lecture de l'extrait Spotify pour l'énigme ${enigmeNum}`);
    
    const audioPlayer = document.getElementById("audioPlayer");
    audioPlayer.src = previewUrl;
    audioPlayer.play();
}
