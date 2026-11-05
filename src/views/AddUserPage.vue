<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary"><ion-title>Add User V2</ion-title></ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-card>
        <ion-card-header><ion-card-title>Create User</ion-card-title></ion-card-header>
        <ion-card-content>
          <ion-item>
            <ion-input v-model="name" label="Name" label-placement="stacked" placeholder="Enter name" />
          </ion-item>
          <ion-item>
            <ion-input v-model="email" type="email" label="Email" label-placement="stacked" placeholder="Enter email" />
          </ion-item>
          <ion-button expand="block" class="ion-margin-top" @click="addUser">Add User</ion-button>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref } from 'vue'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { alertController, IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonInput, IonButton } from '@ionic/vue'
import { db } from '../firebase'

const name = ref('')
const email = ref('')

async function showAlert(message) {
  const alert = await alertController.create({ header: 'Lab 4', message, buttons: ['OK'] })
  await alert.present()
}

async function addUser() {
  if (!name.value.trim() || !email.value.trim()) return showAlert('Please fill in all fields.')
  try {
    await addDoc(collection(db, 'users'), { name: name.value.trim(), email: email.value.trim(), createdAt: serverTimestamp() })
    name.value = ''
    email.value = ''
    await showAlert('User added successfully!')
  } catch (error) {
    console.error(error)
    await showAlert('Could not add user. Check your Firebase configuration and Firestore rules.')
  }
}
</script>
