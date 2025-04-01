export const environment = {
  production: false,
  baseUrl: 'https://api.nobelprize.org/2.1',
  // baseUrl: 'http://api.nobelprize.org/2.1', // unsecure => throws error in firebase

  // Please uncomment below url (http://localhost:3000) line incase of the CORS error from http://api.nobelprize.org/2.1
  // and execute command `npm run server` in terminal.
  // baseUrl: 'http://localhost:3000'
}