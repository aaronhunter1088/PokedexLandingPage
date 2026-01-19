import {ComponentFixture, TestBed} from '@angular/core/testing';

import {Tiles} from './tiles';
import {ActivatedRoute} from '@angular/router';
import {of} from 'rxjs';

describe('Tiles', () => {
    let component: Tiles;
    let fixture: ComponentFixture<Tiles>;

    beforeEach(async () => {
        // Clear localStorage before each test
        localStorage.clear();
        
        await TestBed.configureTestingModule({
            imports: [Tiles],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: {
                        queryParamMap: of({
                            get: () => null
                        })
                    }
                }
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(Tiles);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    afterEach(() => {
        // Clean up localStorage after each test
        localStorage.clear();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should not set toggle when no parameters are provided', () => {
        expect(component.toggle1Checked).toBe(false);
        expect(component.toggle2Checked).toBe(false);
        expect(component.toggle3Checked).toBe(false);
    });

    it('should set toggle1 to true when tileNumber=1 and darkmode=true', async () => {
        const mockActivatedRoute = {
            queryParamMap: of({
                get: (key: string) => {
                    if (key === 'tileNumber') return '1';
                    if (key === 'darkmode') return 'true';
                    return null;
                }
            })
        };

        await TestBed.configureTestingModule({
            imports: [Tiles],
            providers: [
                {provide: ActivatedRoute, useValue: mockActivatedRoute}
            ]
        }).compileComponents();

        const newFixture = TestBed.createComponent(Tiles);
        const newComponent = newFixture.componentInstance;
        await newFixture.whenStable();
        newFixture.detectChanges();

        expect(newComponent.toggle1Checked).toBe(true);
        expect(newComponent.toggle2Checked).toBe(false);
        expect(newComponent.toggle3Checked).toBe(false);
    });

    it('should set toggle1 to false when tileNumber=1 and darkmode=false', async () => {
        const mockActivatedRoute = {
            queryParamMap: of({
                get: (key: string) => {
                    if (key === 'tileNumber') return '1';
                    if (key === 'darkmode') return 'false';
                    return null;
                }
            })
        };

        await TestBed.configureTestingModule({
            imports: [Tiles],
            providers: [
                {provide: ActivatedRoute, useValue: mockActivatedRoute}
            ]
        }).compileComponents();

        const newFixture = TestBed.createComponent(Tiles);
        const newComponent = newFixture.componentInstance;
        await newFixture.whenStable();
        newFixture.detectChanges();

        expect(newComponent.toggle1Checked).toBe(false);
    });

    it('should set toggle2 when tileNumber=2', async () => {
        const mockActivatedRoute = {
            queryParamMap: of({
                get: (key: string) => {
                    if (key === 'tileNumber') return '2';
                    if (key === 'darkmode') return 'true';
                    return null;
                }
            })
        };

        await TestBed.configureTestingModule({
            imports: [Tiles],
            providers: [
                {provide: ActivatedRoute, useValue: mockActivatedRoute}
            ]
        }).compileComponents();

        const newFixture = TestBed.createComponent(Tiles);
        const newComponent = newFixture.componentInstance;
        await newFixture.whenStable();
        newFixture.detectChanges();

        expect(newComponent.toggle1Checked).toBe(false);
        expect(newComponent.toggle2Checked).toBe(true);
        expect(newComponent.toggle3Checked).toBe(false);
    });

    it('should set toggle3 when tileNumber=3', async () => {
        const mockActivatedRoute = {
            queryParamMap: of({
                get: (key: string) => {
                    if (key === 'tileNumber') return '3';
                    if (key === 'darkmode') return 'true';
                    return null;
                }
            })
        };

        await TestBed.configureTestingModule({
            imports: [Tiles],
            providers: [
                {provide: ActivatedRoute, useValue: mockActivatedRoute}
            ]
        }).compileComponents();

        const newFixture = TestBed.createComponent(Tiles);
        const newComponent = newFixture.componentInstance;
        await newFixture.whenStable();
        newFixture.detectChanges();

        expect(newComponent.toggle1Checked).toBe(false);
        expect(newComponent.toggle2Checked).toBe(false);
        expect(newComponent.toggle3Checked).toBe(true);
    });

    it('should not set toggle when only tileNumber is provided', async () => {
        const mockActivatedRoute = {
            queryParamMap: of({
                get: (key: string) => {
                    if (key === 'tileNumber') return '1';
                    return null;
                }
            })
        };

        await TestBed.configureTestingModule({
            imports: [Tiles],
            providers: [
                {provide: ActivatedRoute, useValue: mockActivatedRoute}
            ]
        }).compileComponents();

        const newFixture = TestBed.createComponent(Tiles);
        const newComponent = newFixture.componentInstance;
        await newFixture.whenStable();
        newFixture.detectChanges();

        expect(newComponent.toggle1Checked).toBe(false);
        expect(newComponent.toggle2Checked).toBe(false);
        expect(newComponent.toggle3Checked).toBe(false);
    });

    it('should not set toggle when only darkmode is provided', async () => {
        const mockActivatedRoute = {
            queryParamMap: of({
                get: (key: string) => {
                    if (key === 'darkmode') return 'true';
                    return null;
                }
            })
        };

        await TestBed.configureTestingModule({
            imports: [Tiles],
            providers: [
                {provide: ActivatedRoute, useValue: mockActivatedRoute}
            ]
        }).compileComponents();

        const newFixture = TestBed.createComponent(Tiles);
        const newComponent = newFixture.componentInstance;
        await newFixture.whenStable();
        newFixture.detectChanges();

        expect(newComponent.toggle1Checked).toBe(false);
        expect(newComponent.toggle2Checked).toBe(false);
        expect(newComponent.toggle3Checked).toBe(false);
    });

    it('should not set toggle when tileNumber is invalid', async () => {
        const mockActivatedRoute = {
            queryParamMap: of({
                get: (key: string) => {
                    if (key === 'tileNumber') return '4';
                    if (key === 'darkmode') return 'true';
                    return null;
                }
            })
        };

        await TestBed.configureTestingModule({
            imports: [Tiles],
            providers: [
                {provide: ActivatedRoute, useValue: mockActivatedRoute}
            ]
        }).compileComponents();

        const newFixture = TestBed.createComponent(Tiles);
        const newComponent = newFixture.componentInstance;
        await newFixture.whenStable();
        newFixture.detectChanges();

        expect(newComponent.toggle1Checked).toBe(false);
        expect(newComponent.toggle2Checked).toBe(false);
        expect(newComponent.toggle3Checked).toBe(false);
    });

    it('should save to localStorage when updateMode1 is called', () => {
        component.updateMode1(true);
        expect(localStorage.getItem('tile1Darkmode')).toBe('true');
        expect(component.toggle1Checked).toBe(true);
    });

    it('should save to localStorage when updateMode2 is called', () => {
        component.updateMode2(true);
        expect(localStorage.getItem('tile2Darkmode')).toBe('true');
        expect(component.toggle2Checked).toBe(true);
    });

    it('should save to localStorage when updateMode3 is called', () => {
        component.updateMode3(true);
        expect(localStorage.getItem('tile3Darkmode')).toBe('true');
        expect(component.toggle3Checked).toBe(true);
    });

    it('should load darkmode settings from localStorage on init', async () => {
        localStorage.setItem('tile1Darkmode', 'true');
        localStorage.setItem('tile2Darkmode', 'true');
        localStorage.setItem('tile3Darkmode', 'false');

        const mockActivatedRoute = {
            queryParamMap: of({
                get: () => null
            })
        };

        await TestBed.configureTestingModule({
            imports: [Tiles],
            providers: [
                {provide: ActivatedRoute, useValue: mockActivatedRoute}
            ]
        }).compileComponents();

        const newFixture = TestBed.createComponent(Tiles);
        const newComponent = newFixture.componentInstance;
        await newFixture.whenStable();
        newFixture.detectChanges();

        expect(newComponent.toggle1Checked).toBe(true);
        expect(newComponent.toggle2Checked).toBe(true);
        expect(newComponent.toggle3Checked).toBe(false);
    });

    it('should save query parameter values to localStorage', async () => {
        const mockActivatedRoute = {
            queryParamMap: of({
                get: (key: string) => {
                    if (key === 'tileNumber') return '2';
                    if (key === 'darkmode') return 'true';
                    return null;
                }
            })
        };

        await TestBed.configureTestingModule({
            imports: [Tiles],
            providers: [
                {provide: ActivatedRoute, useValue: mockActivatedRoute}
            ]
        }).compileComponents();

        const newFixture = TestBed.createComponent(Tiles);
        await newFixture.whenStable();
        newFixture.detectChanges();

        expect(localStorage.getItem('tile2Darkmode')).toBe('true');
    });
});
