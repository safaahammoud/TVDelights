/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_NODE_ENV: string;
    readonly VITE_API_BACKEND_URL: string;
}
  
interface ImportMeta {
    readonly env: ImportMetaEnv;
}
  
declare module '*.vue' {
    import type { DefineComponent } from 'vue';

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const component: DefineComponent<{}, {}, any>;
    export default component;
}