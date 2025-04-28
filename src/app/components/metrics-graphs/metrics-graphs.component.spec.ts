import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetricsGraphsComponent } from './metrics-graphs.component';

describe('MetricsGraphsComponent', () => {
  let component: MetricsGraphsComponent;
  let fixture: ComponentFixture<MetricsGraphsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MetricsGraphsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MetricsGraphsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
