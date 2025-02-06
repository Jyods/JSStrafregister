<script setup>
import { ref, onMounted, computed } from 'vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getOnlyEntries, createFile, createEntry, createFileLaw, getLaws, getPermissions, getRanks } from '../../api/requests.js'

const isLoading = ref(true)
const entries = ref([])
const laws = ref([])
const ranks = ref([])
const selectedLaws = ref([])
const userPermissions = ref(null)
const permissions = ref(false)
const newRestrictionClass = ref(0)

const userEntry = ref('')
const definition = ref('')
const date = ref('')
const time = ref('')
const place = ref('')
const description = ref('')
const punishment = ref('')
const isRestricted = ref(false)
const activeRank = ref(null)

const emit = defineEmits(['add-to-array'])

const checkRestrictionClass = computed(() => {
  if (userPermissions.value === null) return false
  if (newRestrictionClass.value > userPermissions.value) {
    newRestrictionClass.value = userPermissions.value
    return true
  } else if (newRestrictionClass.value < 0) {
    newRestrictionClass.value = 0
    return true
  }
  return false
})

onMounted(async () => {
  isLoading.value = true
  let files = await getOnlyEntries()
  entries.value = files.data
  let lawsData = await getLaws()
  laws.value = lawsData.data
  let rankData = await getRanks()
  ranks.value = rankData.data

  let permData = await getPermissions()
  userPermissions.value = permData.data
  permissions.value = permData.data >= 10

  isLoading.value = false
})

async function submitForm() {
  if (!userEntry.value || !definition.value || !date.value || !time.value || !place.value || !description.value || !punishment.value) {
    alert("All fields are required!")
    return
  }

  let entry = entries.value.find(entry => entry.identification === userEntry.value)
  if (!entry) {
    alert("Die Identifikation existiert nicht!")
    return
  }

  let data = {
    entry_id: entry.id,
    definition: definition.value,
    date: `${date.value} ${time.value}`,
    description: description.value,
    fine: punishment.value,
    isRestricted: isRestricted.value,
    restrictionClass: newRestrictionClass.value || 0,
    rank_id: activeRank.value?.id || null
  }

  await createFile(data)
  await createFileLaws(data.entry_id)

  resetForm()
  emit('add-to-array', "Neue Straftat hinzugefügt")
}

function resetForm() {
  userEntry.value = ''
  definition.value = ''
  date.value = ''
  time.value = ''
  place.value = ''
  description.value = ''
  punishment.value = ''
  isRestricted.value = false
  newRestrictionClass.value = 0
  activeRank.value = null
  selectedLaws.value = []
}

async function createFileLaws(fileID) {
  for (let law of selectedLaws.value) {
    await createFileLaw({ file_id: fileID, law_id: law.id })
  }
}
</script>

<template>
  <div v-if="isLoading" class="flex justify-center items-center min-h-screen">
    <span>Loading...</span>
  </div>

  <div v-else class="">
    <CardHeader>
      <CardTitle class="text-xl font-semibold">Neue Straftat Erstellen</CardTitle>
    </CardHeader>
    <CardContent>
      <form @submit.prevent="submitForm" class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium">Identifikation</label>
            <Input v-model="userEntry" placeholder="Identifikation" list="entry" required />
            <datalist id="entry">
              <option v-for="entry in entries" :key="entry.id" :value="entry.identification" />
            </datalist>
          </div>
          <div>
            <label class="block text-sm font-medium">Vergehen</label>
            <Input v-model="definition" placeholder="Mord" required />
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium">Tatdatum</label>
            <Input type="date" required />
          </div>
          <div>
            <label class="block text-sm font-medium">Tatzeit</label>
            <Input type="time" required />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium">Tatort</label>
          <Input v-model="place" placeholder="Tatort" required />
        </div>

        <div>
          <label class="block text-sm font-medium">Beschreibung</label>
          <Textarea v-model="description" placeholder="Tatbeschreibung..." required />
        </div>

        <div>
          <label class="block text-sm font-medium">Hafteinheiten</label>
          <div class="flex items-center gap-2">
            <Input type="number" v-model="punishment" placeholder="23" required />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium">Gesetze</label>
          <Select v-model="selectedLaws">
            <SelectTrigger>
              <SelectValue placeholder="Gesetze auswählen" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem v-for="law in laws" :key="law.id" :value="law">
                §{{ law.Paragraph }} {{ law.Title }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label class="block text-sm font-medium">Rank</label>
          <Select v-model="activeRank">
            <SelectTrigger>
              <SelectValue placeholder="Rank auswählen" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem v-for="rank in ranks" :key="rank.id" :value="rank">
                {{ rank.rank }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div class="flex items-center space-x-2">
          <Checkbox v-model="isRestricted" />
          <label for="isRestricted" class="text-sm font-medium">Eingeschränkter Zugriff</label>
        </div>

        <div v-if="isRestricted">
          <label class="block text-sm font-medium">Beschränkungsklasse</label>
          <Input type="number" v-model="newRestrictionClass" placeholder="1" />
        </div>

        <Button type="submit" class="bg-primary ">Einreichen</Button>
      </form>
    </CardContent>
  </div>
</template>
