<template>
  <section>
    <q-card>
      <q-card-section horizontal>
        <q-card-section>
          <img :src="dataUrlWithQRCode" />
        </q-card-section>
        <q-card-section>
          Купон №
          <q-avatar
            :color="isRegistered ? 'green-14' : 'grey-6'"
            text-color="white"
          >
            {{ coupon?.sequence_number }}
          </q-avatar>
          <p style="width: 400px">
            Для регистрации купона в розыгрыше:
            <ol>
              <li>отсканируйте qr-код и перейдите по ссылке</li>
              <li>на открывшейся странице укажите свои данные Имя, Фамилия и номер телефон </li>
              <li>подтвердите введённые данные</li>
              <li>ждите розыгрыша в группе в контакте: https://vk.com/k.wolves</li>
            </ol>
            ... или отправьте фотографию купона в группу "Карельских волков"
          </p>
        </q-card-section>
      </q-card-section>
    </q-card>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { QRCodeCanvas } from '@cheprasov/qrcode';
import { useCouponsStore } from '../../model';

const qrCanvas = new QRCodeCanvas('some value for QR code');
const dataUrlWithQRCode = qrCanvas.toDataUrl();

const props = defineProps<{ couponId: string }>();
const couponsStore = useCouponsStore();

const coupon = computed(() =>
  couponsStore.store.data?.find(({ id }) => id === props.couponId)
);
const isRegistered = computed(() => !!coupon.value?.registered_on);
</script>

<style scoped lang="scss">
.qrcode {
  width: 200px;
  height: 200px;
}
</style>
