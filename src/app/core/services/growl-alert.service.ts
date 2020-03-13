import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable()
export class GrowlAlertService {
    constructor(private messageService: MessageService) { }

    showSuccess(msg) {
        this.messageService.add({
            severity: 'success',
            summary: msg,
            detail: ''
        });
    }

    showError(msg) {
        this.messageService.add({
            severity: 'error',
            summary: msg,
            detail: ''
        });
    }

    clear() {
        this.messageService.clear();
    }
}
