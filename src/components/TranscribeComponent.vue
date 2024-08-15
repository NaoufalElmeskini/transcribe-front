<template>
  <div>
    <h2>Transcription</h2>
    <input v-model="text" type="text" placeholder="Entrez le texte à transcrire" />
    <button @click="transcribe">Transcribe</button>
  </div>
</template>

<script>
import axios from 'axios';

function createBlopLink(data) {
  // Création d'une URL blob pour télécharger le fichier
  const url = window.URL.createObjectURL(new Blob([data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'transcription.txt'); // Nom du fichier à télécharger
  document.body.appendChild(link);
  link.click();
  return link;
}

export default {
  data() {
    return {

    };
  },
  mounted() {
  },
  methods: {
    async transcribe() {
      try {
        // Appel à l'API POST /transcribe
        const response = await axios.post('http://localhost:5000/transcribe', {
          "videoType": "Y",
          "link": "https://www.youtube.com/shorts/o4EHb3TkMsw",
          "language": "EN"
        }, {
          responseType: 'blob' // On attend un fichier en réponse
        });

        const link = createBlopLink(response.data);

        // Nettoyage après le téléchargement
        document.body.removeChild(link);
        window.URL.revokeObjectURL(link.href);
      } catch (error) {
        console.error('Erreur lors de la transcription :', error);
      }
    },
  }
};
</script>

<style scoped>
h2 {
  color: #42b983;
}
</style>