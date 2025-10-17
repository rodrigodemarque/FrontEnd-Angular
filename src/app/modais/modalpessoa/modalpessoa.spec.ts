import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPessoa } from './modalpessoa';

describe('ModalPessoa', () => {
  let component: ModalPessoa;
  let fixture: ComponentFixture<ModalPessoa>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalPessoa]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalPessoa);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
