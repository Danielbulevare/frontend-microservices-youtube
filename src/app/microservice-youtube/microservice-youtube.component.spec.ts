import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MicroserviceYoutubeComponent } from './microservice-youtube.component';

describe('MicroserviceYoutubeComponent', () => {
  let component: MicroserviceYoutubeComponent;
  let fixture: ComponentFixture<MicroserviceYoutubeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MicroserviceYoutubeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MicroserviceYoutubeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
