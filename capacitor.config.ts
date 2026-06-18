import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.dhobi.metromani',
  appName: 'Dhobi Matrimony',
  webDir: 'dist',
  server: {
    url: 'https://dhobi-samaj-metromany.vercel.app',
    cleartext: true
  }
};

export default config;
