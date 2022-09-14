import { createApp, type ComponentOptionsBase, type ComponentPublicInstance} from 'vue'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'
import { auth } from './firebase/config'

let app: ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>>

auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App).use(router).mount('#app')
  }
})
