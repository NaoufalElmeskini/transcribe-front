<template>
  <div class="container mt-5">
    <div class="card shadow-sm" :style="{ backgroundColor: 'var(--background)' }">
      <div class="card-body">
        <h2 class="card-title text-center" :style="{ color: 'var(--primary)' }">Transcription</h2>
        <div class="mb-3">
          <input
              v-model="videoUrl"
              type="text"
              class="form-control"
              placeholder="URL"
              :style="{ backgroundColor: 'var(--background)', color: 'var(--text-color)' }"
          />
        </div>
        <div class="actionContainer">
          <div class="lgSelector">
            <select class="form-select form-select-sm" aria-label=".form-select-sm example" v-model="selectedLanguage">
              <option v-for="lg in this.languages" :key="lg">{{ lg }}</option>
            </select>
          </div>

          <div class="translateBtn">
            <button
                @click="transcribe(videoUrl)"
                class="btn"
                :style="{ backgroundColor: 'var(--primary)', borderColor: 'var(--primary)' }"
                :disabled="loading">
              Transcribe
            </button>
          </div>
        </div>
        <div v-if="loading" class="mt-3 text-center">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <p>Transcription en cours...</p>
        </div>
        <div v-if="success" class="mt-3 alert alert-success" :style="{ backgroundColor: 'var(--success)', color: 'var(--background)' }">
          Transcription réussie !
        </div>
        <div v-if="error" class="mt-3 alert alert-danger" :style="{ backgroundColor: 'var(--error)', color: 'var(--background)' }">
          Erreur lors de la transcription.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

function createBlopLink(data) {
  // Création d'une URL blob pour télécharger le fichier
  const url = window.URL.createObjectURL(new Blob([data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'transcription.srt'); // Nom du fichier à télécharger
  return link;
}

export default {
  data() {
    return {
      videoUrl: "",
      loading: false,
      success: false,
      error: false,
      languages : ['EN', 'FR'],
      selectedLanguage : 'EN',
      TRANSCRIBE_API_URL : "http://localhost:5000/transcribe",
    };
  },
  mounted() {
  },
  methods: {
    async transcribe(url) {
      this.loading = true;
      this.success = false;
      this.error = false;

      console.log(this.selected)
      console.log(url)

      try {
        // Appel à l'API POST /transcribe
        const response = await axios.post(this.TRANSCRIBE_API_URL , {
          "videoType": "Y",
          link: this.videoUrl,
          "language": this.selectedLanguage
        }, {
          responseType: 'blob' // On attend un fichier en réponse
        });

        const link = createBlopLink(response.data);
        document.body.appendChild(link);
        link.click();
        // Nettoyage après le téléchargement
        document.body.removeChild(link);
        window.URL.revokeObjectURL(link.href);
        this.success = true;
      } catch (error) {
        this.error = true;
        console.error('Erreur lors de la transcription :', error);
      } finally {
        this.loading = false;
      }
    },
  }
};
</script>

<style scoped>
  .card {
    max-width: 500px;
    margin: auto;
  }

  .actionContainer {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }

  .lgSelector {
    padding: 15px;
  }

  .translateBtn {
    padding: 15px;
  }
</style>