<template>
  <div class="container relative-position">
    <q-btn
      style="position: absolute; left: 0"
      class="q-mt-lg"
      icon="arrow_back"
      :to="{
        name: 'prizeGiveaway',
        params: { id: id },
      }"
    >
      Назад
    </q-btn>
    <q-btn
      color="primary"
      class="q-ma-lg"
      @click="onStartConduction"
      :class="{ hideStartConductionBtn: isStarted }"
    >
      Начать розыгрыш
    </q-btn>
    <div class="relative-position">
      <div class="stopContainer" :class="{ visible: !!activeId && !winnerId }">
        <q-btn class="q-ma-lg" @click="onGetWinner">
          Определить победителя
        </q-btn>
      </div>
    </div>
    <section
      class="relative-position"
      :class="{ gridContainer: isStarted, 'shadow-4': isStarted }"
    >
      <AppGrid>
        <q-avatar
          :size="isStarted ? '300px' : undefined"
          :class="{
            absoluteAvatar: isStarted,
            elevated: coupon.id === activeId,
          }"
          v-for="coupon in registeredCoupons"
          :key="coupon.id"
          :color="coupon.id === winnerId ? 'amber-8' : 'green-14'"
          text-color="white"
        >
          {{ coupon.sequence_number }}
        </q-avatar>
      </AppGrid>
    </section>
    <div class="saveResultContainer" :class="{ visible: !!winnerId }">
      <SetWinnerBtn v-if="winnerId" :id="winnerId" @winnerIsSet="onWinnerSet" />
      <div>... и завершить розыгрыш</div>
      <div>или</div>
      <q-btn @click="onReset" class="bg-white q-mt-sm">
        Отменить результат
      </q-btn>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { SetWinnerBtn } from 'src/features/SetWinner';
import { useCouponsStore } from 'src/entities/coupon';
import { AppGrid } from 'src/shared/components';
import { useRouteParams } from 'src/shared/composables';

const router = useRouter();
const isStarted = ref(false);
const interval = ref<NodeJS.Timeout | null>(null);
const activeId = ref<string>();
const winnerId = ref<string>();
const { id } = useRouteParams('id');
const couponsStore = useCouponsStore();

const registeredCoupons = computed(() =>
  couponsStore.store.data?.filter(({ is_registered }) => is_registered)
);

const couponIds = computed(() => registeredCoupons.value?.map(({ id }) => id));

watch(
  () => id,
  (giveawayId) => {
    couponsStore.read({ giveaway_id: giveawayId });
  },
  { immediate: true }
);

const setActiveCoupon = () => {
  if (!couponIds.value) {
    activeId.value = undefined;
    return;
  }
  activeId.value =
    couponIds.value[
      Math.floor(Math.random() * (couponIds.value?.length || 0 + 1))
    ];
};

const onStartConduction = () => {
  if (!!interval.value) {
    clearInterval(interval.value);
  }
  isStarted.value = true;
  winnerId.value = undefined;
  interval.value = setInterval(setActiveCoupon, 100);
};

const onGetWinner = () => {
  if (!interval.value) {
    return;
  }
  clearInterval(interval.value);
  interval.value = null;
  winnerId.value = activeId.value;
};

const onReset = () => {
  isStarted.value = false;
  activeId.value = undefined;
  winnerId.value = undefined;
  if (interval.value) {
    clearInterval(interval.value);
  }
};

const onWinnerSet = async () => {
  await couponsStore.read({ giveaway_id: id });
  router.push({
    name: 'prizeGiveaway',
    params: { id: id },
  });
};
</script>

<style scoped lang="scss">
.container {
  display: table;
  margin: 0 auto;
  text-align: center;
}
.gridContainer {
  width: 600px;
  height: 600px;
  border-radius: 50%;
  transition: all 0.5s;
}

.absoluteAvatar {
  position: absolute;
  left: 50%;
  top: 50%;
  transition: all 0.5s;
  transform: translate(-50%, -50%);
  &.elevated {
    z-index: 2;
  }
}
.saveResultContainer {
  position: relative;
  z-index: 4;
  opacity: 0;
  transition: 0.3s;
  &.visible {
    opacity: 1;
    transform: translateY(-100px);
  }
}

.stopContainer {
  transition: 0.4s;
  opacity: 0;
  position: absolute;
  z-index: 4;
  left: 0;
  right: 0;
  text-align: center;
  &.visible {
    opacity: 1;
    transform: translateY(50px);
  }
}
.hideStartConductionBtn {
  opacity: 0;
}
</style>
