<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Delete User</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="loadUsers">Refresh</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-card>
        <ion-card-header>
          <ion-card-title>Remove User</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-item>
            <ion-select v-model="selectedId" label="Select User" label-placement="stacked" placeholder="Choose a user to delete">
              <ion-select-option v-for="user in users" :key="user.id" :value="user.id">
                {{ user.name }} - {{ user.email }}
              </ion-select-option>
            </ion-select>
          </ion-item>

          <ion-button
            expand="block"
            color="danger"
            class="ion-margin-top"
            :disabled="!selectedId"
            @click="deleteUser"
          >
            Delete User
          </ion-button>

          <ion-text v-if="!users.length" color="medium">
            <p class="empty">No users available to delete.</p>
          </ion-text>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore'
import { alertController, IonPage, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonSelect, IonSelectOption, IonText } from '@ionic/vue'
import { db } from '../firebase'

const users = ref([])
const selectedId = ref('')

async function showAlert(message) {
  const alert = await alertController.create({ header: 'Lab 4', message, buttons: ['OK'] })
  await alert.present()
}

async function loadUsers() {
  try {
    const snapshot = await getDocs(collection(db, 'users'))
    users.value = snapshot.docs.map(d => ({ id: d.id, ...d.data() }))
    if (!users.value.some(user => user.id === selectedId.value)) selectedId.value = ''
  } catch (error) {
    console.error(error)
    await showAlert('Could not load users. Check your Firebase configuration and Firestore rules.')
  }
}

async function deleteUser() {
  const user = users.value.find(item => item.id === selectedId.value)
  if (!user) return

  const alert = await alertController.create({
    header: 'Confirm Delete',
    message: `Delete ${user.name}? This action cannot be undone.`,
    buttons: [
      { text: 'Cancel', role: 'cancel' },
      {
        text: 'Delete',
        role: 'destructive',
        handler: async () => {
          try {
            await deleteDoc(doc(db, 'users', selectedId.value))
            selectedId.value = ''
            await loadUsers()
            await showAlert('User deleted successfully!')
          } catch (error) {
            console.error(error)
            await showAlert('Could not delete user. Check your Firestore rules.')
          }
        }
      }
    ]
  })
  await alert.present()
}

onMounted(loadUsers)
</script>

<style scoped>
.empty { text-align: center; margin: 24px 0; }
</style>
