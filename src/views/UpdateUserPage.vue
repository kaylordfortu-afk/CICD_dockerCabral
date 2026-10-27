<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Update User</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="loadUsers">Refresh</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-card>
        <ion-card-header>
          <ion-card-title>Edit User</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-item>
            <ion-select v-model="selectedId" label="Select User" label-placement="stacked" placeholder="Choose a user">
              <ion-select-option v-for="user in users" :key="user.id" :value="user.id">
                {{ user.name }} - {{ user.email }}
              </ion-select-option>
            </ion-select>
          </ion-item>

          <template v-if="selectedId">
            <ion-item>
              <ion-input v-model="name" label="Name" label-placement="stacked" placeholder="Enter name" />
            </ion-item>
            <ion-item>
              <ion-input v-model="email" type="email" label="Email" label-placement="stacked" placeholder="Enter email" />
            </ion-item>
            <ion-button expand="block" class="ion-margin-top" @click="updateUser">
              Update User
            </ion-button>
          </template>

          <ion-text v-else color="medium">
            <p class="empty">Select a user to edit.</p>
          </ion-text>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore'
import { alertController, IonPage, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonInput, IonSelect, IonSelectOption, IonText } from '@ionic/vue'
import { db } from '../firebase'

const users = ref([])
const selectedId = ref('')
const name = ref('')
const email = ref('')

async function showAlert(message) {
  const alert = await alertController.create({ header: 'Lab 4', message, buttons: ['OK'] })
  await alert.present()
}

async function loadUsers() {
  try {
    const snapshot = await getDocs(collection(db, 'users'))
    users.value = snapshot.docs.map(d => ({ id: d.id, ...d.data() }))
  } catch (error) {
    console.error(error)
    await showAlert('Could not load users. Check your Firebase configuration and Firestore rules.')
  }
}

watch(selectedId, (id) => {
  const user = users.value.find(item => item.id === id)
  name.value = user?.name || ''
  email.value = user?.email || ''
})

async function updateUser() {
  if (!selectedId.value || !name.value.trim() || !email.value.trim()) {
    return showAlert('Please select a user and fill in all fields.')
  }

  try {
    await updateDoc(doc(db, 'users', selectedId.value), {
      name: name.value.trim(),
      email: email.value.trim()
    })
    await loadUsers()
    await showAlert('User updated successfully!')
  } catch (error) {
    console.error(error)
    await showAlert('Could not update user. Check your Firestore rules.')
  }
}

onMounted(loadUsers)
</script>

<style scoped>
.empty { text-align: center; margin: 24px 0; }
</style>
