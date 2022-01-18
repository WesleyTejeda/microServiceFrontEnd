import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileHubComponent } from './profile-hub.component';

describe('ProfileHubComponent', () => {
  let component: ProfileHubComponent;
  let fixture: ComponentFixture<ProfileHubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileHubComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileHubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
