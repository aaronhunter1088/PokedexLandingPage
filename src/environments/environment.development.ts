const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

export const environment = {
    production: false,
    get springBootAppUrl(): string {
        return isMobile ? 'http://192.168.1.152:4201/springboot/' : 'http://localhost:4201/springboot/';
    },
    get angularAppUrl(): string {
        return isMobile ? 'http://192.168.1.152:4202' : 'http://localhost:4202';
    },
    get combinedAppUrl(): string {
        return isMobile ? 'http://192.168.1.152:4203' : 'http://localhost:4203';
    },
    get swaggerUrl(): string {
        return isMobile ? 'http://192.168.1.152:4204/combined/swagger-ui.html' : 'http://localhost:4204/combined/swagger-ui.html';
    },
};
