// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  productUrl: 'http://localhost:8080/api/auth/product/',
  productUploadFileUrl: 'http://localhost:8080/api/auth/file/',
  lineUrl: 'http://localhost:8080/api/auth/line/',
  userUrl: 'http://localhost:8080/api/auth/user/',
  commentUrl: 'http://localhost:8080/api/auth/comment/',
  albumUrl: 'http://localhost:8080/api/auth/album/',
  albumUploadAvatarUrl: 'http://localhost:8080/api/auth/album-avatar/',
  albumUploadImageUrl: 'http://localhost:8080/api/auth/album-add-image/',
  imageUrl: 'http://localhost:8080/api/auth/image/',

  loginUrl: 'http://localhost:8080/api/auth/signin',
  signupUrl: 'http://localhost:8080/api/auth/signup',
  updateProfileUrl: 'http://localhost:8080/api/auth/update-profile',
  updatePasswordUrl: 'http://localhost:8080/api/auth/update-password',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
