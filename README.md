# QRrize (quasar-project)

### **Обратите внимание!**
Приложение является демонстрационным, предоставляется в ознакомительных целях и является исключительно отражением авторского видения и понимания архитектурной методологии Feature-Sliced Design.

## QRize - проведение розыгрышей призов по купонам.

**Зарегистрированный пользователь (организатор)** создаёт розыгрыш, добавляет купоны, после чего распечатывает их.
Затем в живую происходит распространение купонов.

**Участники розыгрыша** регистрируют купоны путём сканирования QR-кода на купоне. При переходе по ссылке в купоне открывается интерфейс регистрации купона с кнопкой "Зарегистрировать купон".

Зарегистрированные купоны отображаются специальным образом в списке всех купонов розыгрыша на специальной странице.
Организатор розыгрыша в какой-то момент закрывает регистрацию купонов и проводит розыгрыш. Среди зарегистрированных купонов случайным образом определяется победитель или несколько победителей на усмотрение организатора. После этого розыгрыш можно закрывать, а победитель розыгрыша со своим купоном встречается с организатором и забирает свой приз.

### Please note!
The application is a demo, provided for informational purposes only and is solely a reflection of the author's vision and understanding of the architectural methodology Feature-Sliced Design.

## QRize - conducting prize draws using coupons.

A registered user (organizer) creates a draw, adds coupons, and then prints them out.
Then the coupons are distributed live.

Participants of the draw register coupons by scanning the QR code on the coupon. When they follow the link on the coupon, a registration interface for the coupon with a "Register Coupon" button opens.

Registered coupons are displayed in a special way in the list of all draw coupons on a special page.
At some point, the draw organizer closes the registration of coupons and conducts the draw. A winner or several winners are randomly selected from the registered coupons at the discretion of the organizer. After that, the draw can be closed, and the winner of the draw meets with the organizer with their coupon to claim their prize.


## Install the dependencies

```bash
yarn
# or
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
quasar dev
```

### Lint the files

```bash
yarn lint
# or
npm run lint
```

### Format the files

```bash
yarn format
# or
npm run format
```

### Build the app for production

```bash
quasar build
```

### Customize the configuration

See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).
