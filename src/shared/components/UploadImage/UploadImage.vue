<template>
  <label class="upload-image">
    <slot name="button">
      <div class="q-btn">
        <span
          class="q-btn__content text-center col items-center q-anchor--skip justify-center row"
          ><span class="block">Изменить...</span></span
        >
      </div>
    </slot>
    <input
      ref="fileRef"
      type="file"
      @change="onImageSelected"
      accept=".png, .jpg, .jpeg"
    />
  </label>
  <q-dialog
    v-if="!!imageSrc"
    v-model="dialog"
    persistent
    maximized
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card class="full-height">
      <q-card-section>
        <div class="text-h6">Подготовка изображения</div>
      </q-card-section>

      <q-separator />

      <q-card-section class="scroll cropper-section">
        <Cropper
          ref="cropper"
          class="example-cropper"
          :src="imageSrc"
          :stencil-props="{
            aspectRatio: 1 / 1,
          }"
        />
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-btn flat label="Отмена" color="negative" v-close-popup />
        <q-btn
          flat
          label="Сохранить"
          color="positive"
          v-close-popup
          @click="onCropConfirm"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Cropper } from 'vue-advanced-cropper';
import {
  QBtn,
  QCard,
  QCardActions,
  QCardSection,
  QDialog,
  QSeparator,
} from 'quasar';

import 'vue-advanced-cropper/dist/style.css';

const emit = defineEmits(['change']);
const dialog = ref(false);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const cropper = ref<any>(false);
const fileRef = ref<HTMLInputElement | null>(null);
const imageSrc = ref<string | undefined>(undefined);

const onCropConfirm = () => {
  const result = cropper.value.getResult();
  resizedataURL(result.canvas.toDataURL('image/png'));
};

function resizedataURL(datas: string) {
  const wantedSize = 32;
  // We create an image to receive the Data URI
  var img = document.createElement('img');

  // When the event "onload" is triggered we can resize the image.
  img.onload = function () {
    // We create a canvas and get its context.
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');

    // We set the dimensions at the wanted size.
    canvas.width = wantedSize;
    canvas.height = wantedSize;

    // We resize the image with the canvas method drawImage();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    ctx?.drawImage(this, 0, 0, wantedSize, wantedSize);

    imageSrc.value = canvas.toDataURL();
    emit('change', imageSrc.value);
    dialog.value = false;

    /////////////////////////////////////////
    // Use and treat your Data URI here !! //
    /////////////////////////////////////////
  };

  // We put the Data URI in the image's src attribute
  img.src = datas;
}

const onImageSelected = () => {
  const file = fileRef.value?.files ? fileRef.value.files[0] : null;
  if (!file) {
    return;
  }

  let reader = new FileReader();
  reader.readAsDataURL(file);

  reader.onload = function () {
    imageSrc.value = reader.result as string;
    dialog.value = true;
  };
  reader.onerror = function () {
    console.log('Something wrong has happened', reader.error);
  };
};
</script>

<style scoped lang="scss">
.upload-image {
  input {
    display: none;
  }
}
.cropper-section {
  max-height: calc(100vh - 120px);
}
</style>
