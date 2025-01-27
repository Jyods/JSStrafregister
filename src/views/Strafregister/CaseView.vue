<script setup>
    import { onMounted, ref, computed } from 'vue'
    import { getCase, publishCase, deletePublishedCase } from '../../api/requests.js';
    import { useRouter, RouterLink } from 'vue-router';

  
    const searchParams = new URLSearchParams(window.location.search);
    const caseID = searchParams.get('CaseID');

    const isLoading = ref(true)

    const entries = ref([])

    const activeCase = ref('');

    const router = useRouter()


    onMounted(async() => {
        isLoading.value = true
        let files = await getCase(caseID) 
        entries.value = files.data
        console.log(entries.value)
        /*const usedID = parseInt(caseID)
        activeCase.value = entries.value.find(entry => entry.files.some(c => c.id === usedID)).files.find(c => c.id === usedID)*/
        console.log(activeCase.value);
        isLoading.value = false
    })

    async function createPublicCopy() {
        //erstelle eine neue route die öffentlich zugänglich ist mit dem selben inhalt

        const response = await publishCase(caseID)

        console.log(response.route)

        router.push({ name: 'Public', params: { id: response.route }})

    }

    async function deletePublicCopy(publish_id) {
        //lösche die öffentliche kopie
        if (await askIfSure("Sind Sie sicher, dass Sie diese öffentliche Kopie löschen wollen?")) {
            console.log("Lösche öffentliche Kopie")
            console.log(publish_id)
            const response = await deletePublishedCase(publish_id)
            console.log(response)
            router.go()
        }
    }

    async function askIfSure(message) {
        if (confirm(message)) {
            return true;
        } else {
            return false;
        }
    }

    function formatDate(date) {

      if (date == "Restricted") {
        return "Kein Datum"
      }

        return new Date(date).toLocaleDateString('de-DE', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric', 
          hour: 'numeric', 
          minute: 'numeric', 
          second: 'numeric' 
        })    
      }

</script>
<template>
    <div class="loading" v-if="isLoading">
        <img src="../../assets/Loading.svg" alt="loading"/>
    </div>
    <div class="case__wrapper" v-else>
      <div class="case_info__wrapper">
        <div class="case_info">
          <b>Akte {{ entries.id }}: {{ entries.definition }}</b>
        </div>
      </div>
      <div class="case_content__wrapper">
        <div class="description__wrapper">
          <b class="case_title">Beschreibung</b>
          <div class="law_entry"></div>
            <textarea class="description__textarea" readonly>{{ entries.description }}</textarea>
        </div>
        <div class="articles__wrapper">
          <b class="case_title">Straftaten</b>
          <div v-if="entries.laws != 'Restricted'" class="law_entry_colored">
            <div v-for="law in entries.laws">
              <div class="">
                <p class="law_title">
                  <RouterLink 
                  :to="{  name: 'LawArticle', 
                          query: { ArticleID: law.law.id }}"
                          :law = "law"
                          >
                          §{{ law.law.Paragraph }}
                  </RouterLink>
                  {{ law.law.Title }}
                </p>
                <p class="law_description">
                  {{ law.law.Description }}
                </p>
              </div>
            </div>
          </div>
          <div v-else>
            <div class="law_restrict">
              <p>RESTRICTED</p>
            </div>
          </div>
        </div>
        <div class="informations__wrapper">
          <div class="case__content">
            <b class="case_title">
              Metadaten
            </b>
            <div class="law_entry">
              <p class="law_entry">
                <b>Erstellt am:</b> {{ formatDate(entries.created_at) }}
              </p>
              <p class="law_entry" v-if="entries.user != 'Restricted'">
                <b>Erstellt von: </b> 
                <RouterLink 
                  :to="{  name: 'Member', 
                          query: { MemberID: entries.user.id }}"
                          :user = "entries.user"
                          >
                  {{ entries.user.rank.abbreviation }} {{ entries.user.name }}
                </RouterLink>
              </p>
              <p class="law_entry" v-else>
                <b>Erstellt von:</b> RESTRICTED {{ entries.user.name }}
              </p>
              <p class="law_entry">
                <b>Sicherheitsstufe:</b> 
                <span v-if="entries.isRestricted"> 
                  {{ entries.restrictionClass }}
                </span>
                <span v-else>
                  Keine Einschränkung
                </span>
              </p>
            </div>
          </div>
          <div class="criminal__content">
            <b class="case_title">
              Zieldaten
            </b>
            <div class="law_entry">
              <p class="law_entry">
                <b>Verdächtiger:</b> {{ entries.user != 'Restricted' ? entries.entry[0].identification : entries.user }}
              </p>
              <p class="law_entry">
                <b>Tatzeit:</b> {{ entries.user != 'Restricted' ?  formatDate(entries.date) : entries.user }}
              </p>
              <p class="law_entry">
                <b>Strafe:</b> {{ entries.user != 'Restricted' ?  entries.fine : entries.user }} Hafteinheiten
              </p>
              <p class="law_entry">
                <b>Rang zur Tatzeit:</b> {{ entries.user != 'Restricted' ? entries.rank[0].abbreviation : entries.user }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<style scoped>
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.case__wrapper {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: calc(100vh - 100px);
  /* background-color: #ff0000; */
}

.case_info__wrapper {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid gray;
  margin-bottom: 1rem;
}

.case_info {
  align-self: flex-start;
  padding: 0.5rem 1rem;
  color: #008ab0;
}

.case_content__wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  /* background-color: #00ff00; */
}

.description__wrapper {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
  /* background-color: aquamarine; */
  border-right: 1px solid gray;
}

.articles__wrapper{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
  /* background-color: #3300ff; */
  border-right: 1px solid gray;
}

.informations__wrapper{
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  /* background-color: #ff00ff; */
}

.case__content {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 90%;
  height: 45%;
  /* background-color: #00f7ff; */
}

.criminal__content {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 90%;
  height: 45%;
  /* background-color: #ff6600; */
}

.law_entry {
  padding-top: 1rem;
  width: 90%;
  align-self: center;
  padding-left: 1rem;
}

.law_restrict {
  padding-top: 1rem;
  width: 90%;
  align-self: center;
  padding: 0.5rem;
  margin: 0.5rem 0;
}

.law_entry_colored {
  padding-top: 1rem;
  width: 90%;
  align-self: center;
  padding-left: 1rem;
  border-radius: 4px;
  padding: 0.5rem;
  margin: 0.5rem 0;
}

.case_title {
  /* padding-top: 1rem; */
  color: white;
  border-bottom: 1px solid gray;
  width: 30%;
  align-self: center;
  display: flex;
  justify-content: center;
}

textarea {
  margin-top: 1rem;
  width: 90%;
  height: 85%;
  resize: none;
  background-color: transparent;
  border-radius: 4px;
  border: 1px solid gray;
  padding: 0.5rem;
  color: #ffff;
}

.law_title {
  color: white;
  border-bottom: 1px solid gray;
  width: 100%;
  align-self: center;
  padding: 2px 0px;
  margin-bottom: 5px;
  padding-top: 1rem;
}

.law_description {
  color: white;
  font-size: 1rem;
}

</style>
