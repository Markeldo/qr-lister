<template>
  <section>
    <q-card bordered flat class="coupon">
      <q-card-section horizontal>
        <q-card-section>
          <img :src="qrCode" class="qrCode"/>
        </q-card-section>
        <q-card-section>
          Купон №
          <q-avatar
            size="sm"
            :color="isRegistered ? 'green-14' : 'grey-6'"
            text-color="white"
          >
            {{ coupon?.sequence_number }}
          </q-avatar>
          <p>
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

const props = defineProps<{ couponId: string }>();
const couponsStore = useCouponsStore();

const coupon = computed(() =>
  couponsStore.store.data?.find(({ id }) => id === props.couponId)
);

const qrCode = computed(() => {
  const qrCanvas = new QRCodeCanvas(coupon.value?.id || '');
  return qrCanvas.toDataUrl();
})

const isRegistered = computed(() => !!coupon.value?.registered_on);
</script>

<style scoped lang="scss">
.qrCode {
  width: 100px;
  height: 100px;
}
.coupon {
  font-size: 11px;

  ol {
    margin: 0;
    padding: 0 0 0 20px;
  }
}
</style>
