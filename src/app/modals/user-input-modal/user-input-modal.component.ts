import { Component, inject, OnInit, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-user-input-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-input-modal.component.html',
  styleUrl: './user-input-modal.component.css'
})
export class UserInputModalComponent implements OnInit {
  bsModalRef = inject(BsModalRef);
  private formBuilder = inject(FormBuilder)
  title = 'Add item';
  numberOfItems = 0;
  itemForm: FormGroup = new FormGroup({});
  addNewItem = output<string>();

  ngOnInit(): void {
    this.itemForm = this.formBuilder.group({
      name: [''],
    });
  }

  saveToList() {
    const newItem = this.itemForm.value.name;
    if (newItem) {
      this.addNewItem.emit(newItem);
    }
    this.bsModalRef.hide();
  }
}
