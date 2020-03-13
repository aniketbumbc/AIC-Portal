import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation
} from "@angular/core";

import { Message } from "./../model/message.model";
import { MessagesService } from "./../services/message.service";
import { HelperService } from "./../services/helper.service";

import { config } from "app/config";
import { Animations } from "./animations";

@Component({
  selector: "app-chat-message",
  templateUrl: "./chat-message.component.html",
  styleUrls: ["./chat-message.component.scss"],
  animations: [Animations.sendAnimation]
})
export class ChatMessageComponent implements OnInit {
  @Input() message: Message;
  @Output() msgLoading: EventEmitter<any> = new EventEmitter<any>();

  botImage = config.personal_assistant.chat_icon.bot.image;
  defaultImg = "assets/none.jpg";
  userImage = config.personal_assistant.chat_icon.user.image;

  avatarBotImage: string;
  avatarUserImage: string;

  state: string;
  incoming: boolean;
  isLoading: boolean;
  text: string;

  constructor(
    public messagesService: MessagesService,
    public helperService: HelperService
  ) {}

  ngOnInit(): void {
    this.avatarBotImage =
      this.helperService.configObject.style.window.avatar.bot !== ""
        ? this.helperService.configObject.style.window.avatar.bot
        : this.botImage;

    this.avatarUserImage =
      this.helperService.configObject.style.window.avatar.user !== ""
        ? this.helperService.configObject.style.window.avatar.user
        : this.userImage;

    this.isLoading = false;
    this.incoming = this.message.author === "bot";
    // this.defaultImg = "";
    if (!this.incoming) {
      this.state = "sent";
    }
  }

  // adding the message after clicking on the action button
  queryOnClick(query: string) {
    this.msgLoading.emit();
    this.messagesService.addTextOnlyMessage(query);
  }

  isBotAvatarVisible(message: Message): boolean {
    if (message.type === "default" || message.type === "initial_suggestions") {
      return true;
    } else {
      return false;
    }
  }
}
