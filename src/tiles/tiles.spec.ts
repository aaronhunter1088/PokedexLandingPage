import {ComponentFixture, TestBed} from '@angular/core/testing';

import {Tiles} from './tiles';

describe('Tiles', () => {
    let component: Tiles;
    let fixture: ComponentFixture<Tiles>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [Tiles]
        })
            .compileComponents();

        fixture = TestBed.createComponent(Tiles);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
