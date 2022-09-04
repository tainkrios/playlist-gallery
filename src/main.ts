import { createApp, type ComponentOptionsBase, type ComponentPublicInstance} from 'vue'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'

let app: ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>>


app = createApp(App).use(router).mount('#app')

if ('paintWorklet' in CSS) {
  CSS.paintWorklet.addModule(
    'https://www.unpkg.com/css-houdini-squircle@0.1.3/squircle.min.js'
  )
}
declare namespace CSS {
  namespace paintWorklet {
    export function addModule(url: string): void
  }
}
