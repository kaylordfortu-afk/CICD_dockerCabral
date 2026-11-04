<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet />
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="create" href="/tabs/create">
          <ion-icon :icon="addCircleOutline" />
          <ion-label>Create updated
          </ion-label>
        </ion-tab-button>
        <ion-tab-button tab="read" href="/tabs/read">
          <ion-icon :icon="peopleOutline" />
          <ion-label>Read</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="update" href="/tabs/update">
          <ion-icon :icon="createOutline" />
          <ion-label>Update</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="delete" href="/tabs/delete">
          <ion-icon :icon="trashOutline" />
          <ion-label>Delete</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup>
import { IonPage, IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonLabel, IonIcon } from '@ionic/vue'
import { addCircleOutline, peopleOutline, createOutline, trashOutline } from 'ionicons/icons'
</script>
