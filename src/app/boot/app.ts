import { boot } from 'quasar/wrappers';
import store from '../store';

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app }) => {
  app.config.errorHandler = (err, instance, info) => {
    console.log(err);
    console.log(instance);
    console.log(info);
    // handle error, e.g. report to a service
  };
  const pinia = await store({});
  app.use(pinia);
});
