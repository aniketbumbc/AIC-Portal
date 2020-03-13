import { KeycloakService } from 'keycloak-angular';
import { environment } from '@env/environment';
export function initializer(keycloak: KeycloakService): () => Promise<any> {
  return (): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      const { keycloak: keycloakConfig } = environment;
      try {
        let isAuthenticated = await keycloak.init({
          config: keycloakConfig,
          initOptions: {
            onLoad: 'login-required',
            checkLoginIframe: false
          },
          enableBearerInterceptor: false
        }).then();
        const token = await keycloak.getToken();
        // const testToken ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Im5pcmF2LXdhZ2hlbGEiLCJlbWFpbCI6Im5pcmF2LndhZ2hlbGFAYWNjaW9ubGFicy5jb20iLCJuYW1lIjoiTmlyYXYgd2FnaGVsYSIsInJvbGUiOiJlbXBsb3llZSxhZG1pbiIsImF1dGhvcml6ZWRfcm9sZSI6ImVtcGxveWVlIiwiaWF0IjoxNTcxNzM2NDk0LCJleHAiOjE1NzE4MjI4OTR9.tzMxm35CEvxBmEfH3yF7BRWhoXVLq6iOL5TOh7R0i9k";
         localStorage.setItem('token', token);
      const user = await keycloak.loadUserProfile();
      localStorage.setItem('userDetails', JSON.stringify(user));
        if (isAuthenticated) {
          resolve()
        } else {
          keycloak.login({ redirectUri: environment.hostUrl });
          reject()
        }
      } catch (error) {
        reject(error);
      }
    });
  };
};