const trackIds = [
    "6TLtIElohuqTQfcwfVz4HR", 
    "1v5cqJEwR8Nfvrst0qDVjd", 
    "5ZYc1Zwqzvs53l8qrQQLHs"
]; // Remplace par tes `track_id` récupérés

const accessToken = "BQBwgReIal_ivREds4Kx_rG_icrUljjU7VAHTdxgk5es9-ruXh-bELVa5PFaVvPF4xoHdj0cEttiVK9SDU3fdFpZTi0JIehffdQL1jduDaSoJ6b2y21n..."; // Remplace avec le token temporaire

async function checkPreviewUrls() {
    for (let trackId of trackIds) {
        try {
            const response = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                }
            });

            const data = await response.json();
            console.log(`🎵 ${data.name} - ${data.artists[0].name}`);
            console.log(`Preview URL: ${data.preview_url ? data.preview_url : "❌ Pas d'extrait disponible"}`);
            console.log("-----------------------------------");

        } catch (error) {
            console.error(`❌ Erreur lors de la vérification du track ${trackId}:`, error);
        }
    }
}

// Exécuter la vérification des extraits
checkPreviewUrls();
