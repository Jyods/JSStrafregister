<script setup>
import { ref, onMounted } from 'vue'
import { getRanks, getMembers, getCompanies } from '../../api/requests';
import { updateOrientation, createPermission, getOrientationById, get_perms_for_orientation, deletePermission } from '../../api/orientation';
import { useRoute } from 'vue-router'

const url = ref('')
const httpsRegex = /^https?:\/\//

import { reactive } from 'vue'

//get the params from route
const route = useRoute()
const { id } = route.params

const orientation = ref(null)

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
const permissions = ref(null)

const types = ref([
    {name: 'Allgemeines', id: 1},
    {name: 'Leitfäden', id: 2},
    {name: 'Training', id: 3},
    {name: 'Sonstiges', id: 4}
])

const onSubmit = async () => {

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

    await updateOrientation(form, id).then((response) => {
        console.log(response.data)
        createOrientationID = response.data.id
    })

    // erstelle die permissions
    await updatePermissionsForOrientation(createOrientationID)

}

async function updatePermissionsForOrientation(id) {
    // Überprüfe ob sich die Permissions zum vorherigen state geändert haben
    let old_permissions = await get_perms_for_orientation(id)
    let old_permissions_ids = []
    for (const permission of old_permissions) {
        old_permissions_ids.push(permission.id)
    }

    // lösche alle permissions die nicht mehr benötigt werden
    for (const permission of old_permissions_ids) {
        if (form.members.includes(permission.user_id) || form.companies.includes(permission.company_id)) {
            console.log("Permission wird nicht gelöscht")
        }
        else {
            console.log("Permission wird gelöscht")
            await deletePermission(permission)
        }
    }

    // erstelle die neuen permissions
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

}

onMounted(async () => {

    await getOrientationById(id).then((response) => {
        console.log(response.data)
        form.name = response.data.name
        form.path = response.data.path
        form.type = response.data.type
        form.rank_id = response.data.rank_id
        form.members = response.data.members
        form.companies = response.data.companies
    })

    getRanks().then((response) => {
        console.log(response.data)
        ranks.value = response.data
    })
    getMembers().then((response) => {
        console.log(response.data)
        members.value = response.data
    })
    getCompanies().then((response) => {
        console.log(response)
        companies.value = response
    })

    await get_perms_for_orientation(id).then((response) => {
        console.log(response)
        permissions.value = response
    })

    map_all_permissions_to_form()

})

function map_all_permissions_to_form() {
    let apfel = []
    let banane = []
    for (const permission of permissions.value) {
        if (permission.user_id != null) {
            apfel.push(permission.user_id)
        }
        if (permission.company_id != null) {
            banane.push(permission.company_id)
        }
    }
    form.members = apfel
    form.companies = banane
}


</script>

<template>
  <el-form :model="form" :rules="rules" label-width="120px">
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
      <el-button type="primary" @click="onSubmit">Update</el-button>
      <el-button>Cancel</el-button>
    </el-form-item>
  </el-form>
  <!-- <iframe v-if="httpsRegex.test(form.path)" :src="form.path" width="100%" height="400px"></iframe> -->
</template>

<style scoped></style>

