import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.dhobisamaj.metromany',
  appName: 'Dhobi Matrimony',
  webDir: 'dist',
  server: {
    url: 'https://dhobi-samaj-metromany.vercel.app',
    cleartext: true
  }
};

export default config;
