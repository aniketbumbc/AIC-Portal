// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { KeycloakConfig } from "keycloak-angular";

let keycloakConfig: KeycloakConfig = {
  realm: "aic",
  url: "https://login.accionbreeze.com/auth",
  clientId: "aic-local"
};

export const environment = {
  production: false,
  graphQlUrl: "http://localhost:4001",
  newgraphQlUrl: "https://aic.accionbreeze.com/graphql",
  keycloak: keycloakConfig,
  /* baseUrl: 'http://aic.accionlabs.com/api/aic',
  authUrl: 'http://aic.accionlabs.com/api',
  graphUrl: 'http://aic.accionlabs.com/api/accion',
  linkedin: 'http://aic.accionlabs.com/social-feeds/linkedin/' */
  baseUrl: "http://localhost:5000/api/aic",
  socketUrl: "https://breeze.accion.rocks",
  // socketUrl: 'http://localhost:8765',
  // socketUrl: 'https://9ec37799.ngrok.io',
  oldAicUrl: 'http://aic2.accionlabs.com',
  authUrl: "http://localhost:3000",
  graphUrl: "http://localhost:5000/api/accion",
  linkedin: "http://aic.accionlabs.com/social-feeds/linkedin/",
  hostUrl: "http://127.0.0.1:4200/",
  searchURL: "https://breeze.accionbreeze.com/search-service/",
  employeeCount: "https://aic.accionbreeze.com/employees/count",
  cmUrl: "https://candidate-management.accionbreeze.com/resourcerequests",
  newBaseUrl: "https://aic.accionbreeze.com/",
  newProjects: "https://aic.accionbreeze.com/projects",
  aicEmployee: "https://aic.accionbreeze.com/employees/find-by-aiclevel?level=",
  addAndRemoveProjectMember: "https://aic.accionbreeze.com/projectmembers",
  addNupdateSocialProfiles:
    "https://aic.accionbreeze.com/socialprofileemployees/many",
  cuiUrl: "https://breeze.accionbreeze.com/cui-service/api/",
  projectNewReqMemberLocation:
    "https://candidate-management.accionbreeze.com/locations",
  exportProfile: "https://aic.accionbreeze.com/employees/exportProfile/",
  skillsMatrix: "https://aic.accionbreeze.com/employees/skills-matrix",
  imageUrl: "https://aic.accionbreeze.com"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
