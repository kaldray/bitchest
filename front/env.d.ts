/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASEURL: string;
  readonly VITE_API_ENDPOINT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
