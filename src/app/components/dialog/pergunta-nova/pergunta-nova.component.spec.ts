import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerguntaNovaComponent } from './pergunta-nova.component';

describe('PerguntaNovaComponent', () => {
  let component: PerguntaNovaComponent;
  let fixture: ComponentFixture<PerguntaNovaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerguntaNovaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerguntaNovaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
