import { KeycloakConfig } from "keycloak-angular";

let keycloakConfig: KeycloakConfig = {
  realm: "aic",
  url: "https://login.accion.rocks/auth",
  clientId: "aic"
};
export const environment = {
  production: true,
  oldAicUrl: "http://aic.accionlabs.com",
  graphQlUrl: "http://aic2.accionlabs.com/graphql/",
  baseUrl: "http://aic2.accionlabs.com/api/aic",
  authUrl: "http://aic.accionlabs.com/api/",
  graphUrl: "http://aic.accionlabs.com/api/accion",
  linkedin: "http://aic.accionlabs.com/social-feeds/linkedin/",
  socketUrl: "https://breeze.accion.rocks",
  newgraphQlUrl: "https://aic.accion.rocks/graphql",
  hostUrl: "https://aic2.accionlabs.com/",
  keycloak: keycloakConfig,
  searchURL: "https://breeze.accion.rocks/search-service/",
  employeeCount: "https://aic.accion.rocks/employees/count",
  cmUrl: "https://candidate-management.accion.rocks/resourcerequests",
  newBaseUrl: "https://aic.accion.rocks/",
  newProjects: "https://aic.accion.rocks/projects",
  aicEmployee: "https://aic.accion.rocks/employees/find-by-aiclevel?level=",
  addAndRemoveProjectMember: "https://aic.accion.rocks/projectmembers",
  addNupdateSocialProfiles:
    "https://aic.accion.rocks/socialprofileemployees/many",
  cuiUrl: "https://breeze.accion.rocks/cui-service/api/",
  projectNewReqMemberLocation:
    "https://candidate-management.accion.rocks/locations",
  exportProfile: "https://aic.accion.rocks/employees/exportProfile/",
  skillsMatrix: "https://aic.accion.rocks/employees/skills-matrix",
  imageUrl: ""
};
