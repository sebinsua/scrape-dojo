const apiKey = '75589e7a-ed2f-4419-8c4e-d321e45fdb3e';
const latitude = '51.5525341200245';
const longitude = '-0.0527206225141576';

export const apiUrl = 'https://apiv3.dojoapp.co/mobile/v3-1/LON';

export const createHeaders = () => ({
  accept: '*/*',
  language: 'en',
  'accept-language': 'en-gb',
  sdkVersion: '12.4',
  os: 'iOS',
  'user-agent': 'Dojo/566 CFNetwork/978.0.7 Darwin/18.7.0',
  device: 'iPhone10,6',
  build: '566',
  'api-key': apiKey,
  lat: latitude,
  long: longitude,
});
