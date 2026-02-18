export const environment = {
    production: false,
    get springBootAppUrl(): string {
        // Check if running on mobile device
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        return isMobile ? 'http://192.168.1.152:4201/springboot/' : 'http://localhost:4201/springboot/';
    },
    get angularAppUrl(): string {
        // Check if running on mobile device
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        return isMobile ? 'http://192.168.1.152:4202' : 'http://localhost:4202';
    },
    get combinedAppUrl(): string {
        // Check if running on mobile device
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        return isMobile ? 'http://192.168.1.152:4203' : 'http://localhost:4203';
    },
    get swaggerUrl(): string {
        // Check if running on mobile device
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        return isMobile ? 'http://192.168.1.152:4204/combined/swagger-ui.html' : 'http://localhost:4204/combined/swagger-ui.html';
    },
};
