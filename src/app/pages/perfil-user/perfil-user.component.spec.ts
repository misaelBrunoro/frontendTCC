import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilUserComponent } from './user-profile.component';

describe('UserProfileComponent', () => {
  let component: PerfilUserComponent;
  let fixture: ComponentFixture<PerfilUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
