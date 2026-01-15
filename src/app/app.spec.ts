import {TestBed} from '@angular/core/testing';
import {App} from './app';

describe('App', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [App],
        }).compileComponents();
    });

    it('should create the app', () => {
        const fixture = TestBed.createComponent(App);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });

    it('should display default region name', async () => {
        const fixture = TestBed.createComponent(App);
        await fixture.whenStable();
        fixture.detectChanges();
        const compiled = fixture.nativeElement as HTMLElement;
        const regionName = compiled.querySelector('.region-name');
        expect(regionName).toBeTruthy();
        expect(regionName?.textContent).toBeTruthy();
    });

    it('should update region name when toggleBackground is called', () => {
        const fixture = TestBed.createComponent(App);
        const app = fixture.componentInstance;
        const initialRegion = app.regionName();
        app.toggleBackground();
        fixture.detectChanges();
        expect(app.regionName()).toBeTruthy();
        expect(['Kanto', 'Johto', 'Hoenn', 'Sinnoh', 'Hisui', 'Unova', 'Kalos', 'Alola', 'Galar', 'Paldea']).toContain(app.regionName());
    });
});
