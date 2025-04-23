import { Component, inject, signal } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ConfirmationModalComponent } from './modals/confirmation-modal/confirmation-modal.component';
import { UserInputModalComponent } from './modals/user-input-modal/user-input-modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  private modalService = inject(BsModalService)
  private modalRef?: BsModalRef;
  itemList = signal<string[]>(['Book', 'Pen']);

  openConfirmationModal() {
    this.modalRef = this.modalService.show(ConfirmationModalComponent, {
      initialState: {
        title: 'Confirm Deletion',
      },
    });

    this.modalRef.content?.closed.subscribe((result: boolean) => {
      if (result) {
        console.log('User confirmed deletion.');
      } else {
        console.log('Deletion cancelled.');
      }
      this.modalRef?.hide();
    });
  }

  openUserModal() {
    this.modalRef = this.modalService.show(UserInputModalComponent, {
      class: 'modal-dialog-centered',
      initialState: {
        title: 'Add New Item',
        numberOfItems: this.itemList().length,
      },
    });

    this.modalRef.content?.addNewItem.subscribe((newItem: string) => {
      this.itemList.update(list => [...list, newItem]);
      console.log('New item added:', newItem);
      this.modalRef?.hide();
    });
  }
}
