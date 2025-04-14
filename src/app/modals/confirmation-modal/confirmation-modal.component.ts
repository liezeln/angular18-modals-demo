import { Component, inject, output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-confirmation-modal',
  standalone: true,
  imports: [],
  templateUrl: './confirmation-modal.component.html',
  styleUrl: './confirmation-modal.component.css'
})
export class ConfirmationModalComponent {
  bsModalRef = inject(BsModalRef);
  title = '';
  closed = output<boolean>();

  close(result: boolean) {
    this.closed.emit(result);
    this.bsModalRef.hide();
  }
}
