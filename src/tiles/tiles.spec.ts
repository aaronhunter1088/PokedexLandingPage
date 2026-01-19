import {ComponentFixture, TestBed} from '@angular/core/testing';

import {Tiles} from './tiles';
import {ActivatedRoute} from '@angular/router';
import {of} from 'rxjs';

describe('Tiles', () => {
    let component: Tiles;
    let fixture: ComponentFixture<Tiles>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [Tiles],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: {
                        queryParamMap: of(new Map())
                    }
                }
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(Tiles);
        component = fixture.componentInstance;
        await fixture.whenStable();
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
});
