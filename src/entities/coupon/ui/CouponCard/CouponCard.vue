<template>
  <section>
    <q-card bordered flat class="coupon">
      <q-card-section horizontal>
        <q-card-section>
          <img :src="qrCode" class="qrCode"/>
        </q-card-section>
        <q-card-section>
          Купон №
          <span class="print-only">{{ coupon?.sequence_number }}</span>
          <q-avatar
            size="sm"
            :color="isRegistered ? 'green-14' : 'grey-6'"
            text-color="white"
            class="print-hide"
          >
            {{ coupon?.sequence_number }}
          </q-avatar>
          <p>
            Для регистрации купона в розыгрыше воспользуйтесь одним из способов (или обоими сразу):
            <ol>
              <li>отсканируйте qr-код, перейдите по ссылке, нажмите кнопку "Зарегистрировать купон"</li>
              <li>сфотографируйте купон и отправьте фото в группу VK "Карельские волки": https://vk.com/k.wolves</li>
            </ol>
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
  const qrCanvas = new QRCodeCanvas(`${process.env.QR_CODE_SITE}#/coupon-registration/${coupon.value?.id || ''}`);
  // const qrCanvas = new QRCodeCanvas('https://vk.com/k.wolves');
  return qrCanvas.toDataUrl();
})

const isRegistered = computed(() => !!coupon.value?.is_registered);
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
.print-only {
  font-weight: bold;
  font-size: 16px;
}
</style>
