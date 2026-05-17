export const config = {
  baseUrl: 'https://www.saucedemo.com/',
  headless: process.env.HEADLESS !== 'false',
  timeout: 30_000,
  viewport: {
    width: 1280,
    height: 720,
  },
};
