<script setup>
import { ref, onMounted } from 'vue'
import { getRanks, getMembers, getCompanies } from '../../api/requests';
import { createOrientation, createPermission } from '../../api/orientation';

const loading = ref(false)
const btndisabled = ref(false)

const url = ref('')
const httpsRegex = /^https?:\/\//

import { reactive } from 'vue'

// do not use same name with ref
const form = reactive({
  name: '',
  path: '',
  type: null,
  rank_id: null,
    members: [],
    companies: []
})

const rules = reactive({
  name: [
    { required: true, message: 'Please input name', trigger: 'blur' },
    { min: 3, max: 20, message: 'Length should be 3 to 20', trigger: 'blur' }
  ],
  path: [
    { required: true, message: 'Please input path', trigger: 'blur' },
    { min: 3, max: 20, message: 'Length should be 3 to 20', trigger: 'blur' }
  ]
})

const ranks = ref(null)
const members = ref(null)
const companies = ref(null)

const types = ref([
    {name: 'Allgemeines', id: 1},
    {name: 'Leitfäden', id: 2},
    {name: 'Training', id: 3},
    {name: 'Sonstiges', id: 4}
])

const onSubmit = async () => {

    btndisabled.value = true

    if (form.name == '' || form.path == '') {
        console.log("Name oder URL nicht gesetzt")
        return
    }

    // wenn der typ nicht gesetzt ist, setze ihn auf Allgemeines
    if (form.type == null) {
        form.type = 'Allgemeines'
    }

    if (form.rank_id == null) {
        form.rank_id = 0
    }

    let createOrientationID = null

    await createOrientation(form).then((response) => {
        console.log(response.data)
        createOrientationID = response.data.id
    })

    // erstelle die permissions
    await createPermissionForOrientation(createOrientationID)

    btndisabled.value = false

    // reset form
    for (const [key, value] of Object.entries(form)) {
        form[key] = null
    }

}

async function createPermissionForOrientation(id) {
    if (form.members.length == 0 && form.companies.length == 0) {
        console.log("Keine User oder Einheiten ausgewählt")
        return
    }
    for (const user of form.members) {
        let data = {
            orientation_file_id: id,
            user_id: user
        }
        console.error(data)
        createPermission(data).then((response) => {
            console.log(response.data)
        })
    }
    for (const company of form.companies) {
        let data = {
            orientation_file_id: id,
            company_id: company
        }
        createPermission(data).then((response) => {
            console.log(response.data)
        })
    }

    console.log("Permissions erstellt")
}

onMounted(() => {
    getRanks().then((response) => {
        console.log(response.data)
        ranks.value = response.data
    })
    getMembers().then((response) => {
        console.log(response.data)
        members.value = response.data
    })
    getCompanies().then((response) => {
        console.log(response.data)
        companies.value = response
    })
})

</script>

<template>
    <div class="loading" v-if="loading">
        <img src="../../assets/Loading.svg" alt="loading"/>
    </div>
  <el-form v-else :model="form" :rules="rules" label-width="120px">
    <el-form-item label="Titel">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item label="URL" required>
      <el-input v-model="form.path" />
    </el-form-item>
    <el-form-item label="Typ:">
        <el-select v-model="form.type" filterable placeholder="Select">
            <el-option
            v-for="item in types"
            :key="item.id"
            :label="item.name"
            :value="item.name"
            />
        </el-select>
    </el-form-item>
    <el-form-item label="Einheiten:">
        <el-select
        v-model="form.companies"
        multiple
        collapse-tags
        placeholder="Select"
        style="width: 240px"
        >
        <el-option
            v-for="item in companies"
            :key="item.id"
            :label="item.abbreviation"
            :value="item.id"
        />
        </el-select>
    </el-form-item>
    <el-form-item label="Ab:" required>
        <el-select v-model="form.rank_id" clearable filterable placeholder="Select">
            <el-option
            v-for="item in ranks"
            :key="item.id"
            :label="item.abbreviation"
            :value="item.id"
            />
        </el-select>
    </el-form-item>
    <el-form-item label="User:">
        <el-select
        v-model="form.members"
        multiple
        collapse-tags
        placeholder="Select"
        style="width: 240px"
        >
        <el-option
            v-for="item in members"
            :key="item.identification"
            :label="item.identification"
            :value="item.id"
        />
        </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit" :disabled="btndisabled">Create</el-button>
      <el-button :disabled="btndisabled">Cancel</el-button>
    </el-form-item>
  </el-form>
  <iframe v-if="httpsRegex.test(form.path)" :src="form.path" width="100%" height="400px"></iframe>
</template>

<style scoped></style>

