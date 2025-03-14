const playlistId = "37i9dQZF1DWYa24lU2SeaC"; // ID de la playlist Disney
const accessToken = "BQBwgReIal_ivREds4Kx_rG_icrUljjU7VAHTdxgk5es9-ruXh-bELVa5PFaVvPF4xoHdj0cEttiVK9SDU3fdFpZTi0JIehffdQL1jduDaSoJ6b2y21n..."; // Remplace par ton token Spotify

async function getPlaylistTracks() {
    try {
        const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            }
        });

        const data = await response.json();
        console.log("📜 Liste des morceaux :");

        data.items.forEach((item, index) => {
            console.log(`${index + 1}. ${item.track.name} - ${item.track.artists[0].name}`);
            console.log(`Track ID: ${item.track.id}`);
        });

    } catch (error) {
        console.error("❌ Erreur lors de la récupération des morceaux :", error);
    }
}

// Exécuter la récupération des morceaux
getPlaylistTracks();
