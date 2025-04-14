import { Component, inject } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ConfirmationModalComponent } from './modals/confirmation-modal/confirmation-modal.component';

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
}
