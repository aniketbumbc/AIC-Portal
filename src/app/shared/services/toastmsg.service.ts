import { Injectable } from "@angular/core";
import { MessageService } from 'primeng/api';

@Injectable()
export class ToastmsgService {
  constructor(private messageService: MessageService) { }
  addSingle(msg: any) {
    this.messageService.add({ summary: msg, severity: 'success', sticky: false });
  }
  addError(msg: any) {
    this.messageService.add({ summary: msg, severity: 'error', sticky: false });
  }
  clear() {
    this.messageService.clear();
  }
}
