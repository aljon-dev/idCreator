// src/vue-shim.d.ts or src/shims-vue.d.ts
declare module 'vue-toast-notification'
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
