/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_NODE_ENV: string;
    readonly VITE_API_BACKEND_URL: string;
}
  
interface ImportMeta {
    readonly env: ImportMetaEnv;
}
  