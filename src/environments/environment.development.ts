const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

export const environment = {
    production: false,
    get springBootAppUrl(): string {
        return isMobile ? `http://${window.location.hostname}:4201/springboot/` : 'http://localhost:4201/springboot/';
    },
    get angularAppUrl(): string {
        return isMobile ? `http://${window.location.hostname}:4202` : 'http://localhost:4202';
    },
    get combinedAppUrl(): string {
        return isMobile ? `http://${window.location.hostname}:4203` : 'http://localhost:4203';
    },
    get swaggerUrl(): string {
        return isMobile ? `http://${window.location.hostname}:4201/springboot/swagger-ui.html` : 'http://localhost:4201/springboot/swagger-ui.html';
    }
};
