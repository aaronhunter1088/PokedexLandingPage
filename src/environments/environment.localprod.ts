// Uses the host the page was opened from, so a phone on the network reaches
// this machine (e.g. 192.168.1.152) instead of its own "localhost".
const host = window.location.hostname;

export const environment = {
    production: true,

    springBootAppUrl: `http://${host}:8080/`,
    angularAppUrl: `http://${host}:4202`,
    combinedAppUrl: `http://${host}:4203`,
    swaggerUrl: `http://${host}:8080/swagger-ui/index.html`
};
