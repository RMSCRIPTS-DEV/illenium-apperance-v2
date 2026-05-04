/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Dev preview backdrop: unset = on; false|off|transparent|0 = off; true|on|1 = on */
  readonly VITE_DEV_PREVIEW_BACKGROUND?: string;
  /** When backdrop on, optional image URL (default: Thomas boilerplate imgur) */
  readonly VITE_DEV_PREVIEW_BACKGROUND_URL?: string;
}

interface Window {
  Nui: {
    post(event: string, data = {}): Promise<any>;
    onEvent(type: string, func: any): void;
    emitEvent(type: string, payload: any): void;
  };
}
