import { createApp } from "vue";
import App from "./App.vue";
import router from './router';
import { IonicVue } from '@ionic/vue';
import { addIcons } from 'ionicons';
import { linkOutline, bulbOutline, bookOutline, calendarOutline } from 'ionicons/icons';

import '@ionic/core/css/padding.css'
import 'ion-rangeslider/css/ion.rangeSlider.css'

document.title = "Living Library [PROTOTYPE]";
const app = createApp(App)
    .use(IonicVue)
    .use(router);

router.isReady().then(() => {
    addIcons({
        'link': linkOutline,
        'book': bookOutline,
        'bulb': bulbOutline,
        'calendar': calendarOutline
    });

    app.mount('#app');
});