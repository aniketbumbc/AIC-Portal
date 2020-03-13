import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation
} from "@angular/core";

import { Message } from "./../../model/message.model";
import { MessagesService } from "./../../services/message.service";

@Component({
  selector: "multiple-choice",
  templateUrl: "./multiple-choice.component.html",
  styleUrls: ["./multiple-choice.component.css"]
})
export class MultipleChoiceComponent implements OnInit {
  cardData: Array<any> = [
    {
      displayValue: "FAQ 1"
    },
    {
      displayValue: "FAQ 2"
    },
    {
      displayValue: "FAQ 1"
    },
    {
      displayValue: "FAQ 2"
    }
  ]; // Multiple Choice card data
  @Input() message: Message;
  @Output() msgLoading: EventEmitter<any> = new EventEmitter<any>();
  constructor(public messagesService: MessagesService) {
    // public messagesService: MessagesService
  }

  ngOnInit() {}
  queryOnClick(query: string) {
    this.msgLoading.emit();
    this.messagesService.addTextOnlyMessage(query);
  }
}
