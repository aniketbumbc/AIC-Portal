import {
  Component,
  ElementRef,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  HostListener
} from "@angular/core";

import { Observable, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

import { config } from "app/config";

import { Message } from "../model/message.model";
import { MessagesService } from "../services/message.service";
import { HelperService } from "../services/helper.service";
import { DelegateService } from "../services/delegate.service";
import { BrowserDetectService } from "../services/browser-detect.service";
import { VoiceService } from "../services/speech-api.service";

import { Animations } from "./animations";

import {
  PerfectScrollbarConfigInterface,
  PerfectScrollbarDirective
} from "ngx-perfect-scrollbar";

@Component({
  selector: "chat-window",
  templateUrl: "./chat-window.component.html",
  styleUrls: ["./chat-window.component.scss"],
  animations: [Animations.toggleAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatWindowComponent implements OnInit, OnDestroy {
  @Input() test: string;
  @Input() object: any;
  @Output() action = new EventEmitter<any>();

  @ViewChild(PerfectScrollbarDirective)
  directiveScroll: PerfectScrollbarDirective;

  messages$: Observable<Message[]>;

  textFieldValue = "";
  listItems: any[];
  botImage = config.personal_assistant.chat_icon.bot.image;
  destroy$: Subject<boolean> = new Subject<boolean>(); // to unsubscribe from all subscriptions

  draftMessage: Message;

  // assistant parameters
  showVoiceButton = true;
  isVoiceInputTaken = false;
  isAssistantOpen = false;
  isFirstLoad = false;
  isAutocompleteVisible = false;
  speechInputStart = false; // start taking user input through speech
  isTextInputActive = false;

  todayDate: Date;
  assistantState = "close";
  recording = false;
  toolTipDelay = 500;
  position = "above";

  // autosuggest params
  suggestions: string[];
  remainingChar = "";
  lastMatchedString = "";

  // autosuggest params
  suggestionArray = [];
  suggestionType = "";

  config: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
  };

  activeIndex = 0;

  // PA config params
  paConfigObject: any;
  toggleButtonBackground: string;
  toggleButtonIcon: string;
  userAvatarIcon: string;
  botAvatarIcon: string;
  titleBarBackground: string;
  titleBarIcon: string;
  titleBarText: string;
  windowPlaceholder: string;

  public get isLoading(): boolean {
    return this.messagesService.isPAWaitingForRespnse;
  }

  public get speechInputStatus(): boolean {
    return this.delegateService.speechInputStart;
  }

  public get noSupport() {
    return this.browserService.getBrowser() !== "chrome";
  }

  @HostListener("document:keydown", ["$event"])
  highlightSuggestion(event: KeyboardEvent): void {
    if (event.code === "ArrowUp") {
      event.preventDefault();
      if (this.activeIndex === -1) {
        this.activeIndex = this.suggestionArray.length - 1;
      } else {
        if (this.activeIndex === 0) {
          this.activeIndex = this.suggestionArray.length - 1;
        } else {
          this.activeIndex--;
        }
      }
    }
    if (event.code === "ArrowDown") {
      event.preventDefault();
      if (this.activeIndex < this.suggestionArray.length - 1) {
        if (this.activeIndex === -1) {
          this.activeIndex = 0;
        } else {
          this.activeIndex++;
        }
      } else {
        this.activeIndex = 0;
      }
    }
    if (event.code === "Escape") {
      this.delegateService.hideIntentsWindow = true;
      this.suggestionArray = [];
      this.isAutocompleteVisible = false;
      this.activeIndex = -1;
    }

    this.ref.detectChanges();
  }

  constructor(
    private messagesService: MessagesService,
    private helperService: HelperService,
    private delegateService: DelegateService,
    private el: ElementRef,
    private ref: ChangeDetectorRef,
    private browserService: BrowserDetectService,
    // private speechRecognitionService: SpeechRecognitionService,
    // private speechSynthesisService: SpeechSynthesisService
    private voiceService: VoiceService
  ) {}

  ngOnInit(): void {
    try {
      this.paConfigObject = JSON.parse(this.object);
    } catch (error) {
      this.paConfigObject = {
        url: "",
        style: {
          toggleButton: {
            color: "red",
            icon: ""
          },
          window: {
            inputBar: { placeholderText: "" },
            topBar: {
              backgroundColor: "red",
              titleIcon: "https://breeze.accion.rocks/assets/breezelogo.png",
              titleText: "AIC Assistant"
            },
            avatar: {
              user: "./assets/user.svg",
              bot: "./assets/bot.png"
            }
          }
        }
      };
    }
    this.helperService.configObject = this.paConfigObject;
    this.botAvatarIcon =
      this.paConfigObject.style.window.avatar.bot !== ""
        ? this.paConfigObject.style.window.avatar.bot
        : this.botImage;
    this.toggleButtonIcon = this.paConfigObject.style.window.topBar.titleIcon;
    this.titleBarBackground = this.paConfigObject.style.window.topBar.backgroundColor;
    this.titleBarText =
      this.paConfigObject.style.window.topBar.titleText !== ""
        ? this.paConfigObject.style.window.topBar.titleText
        : "Personal Assistant";

    this.toggleButtonBackground = this.paConfigObject.style.toggleButton.color;

    this.windowPlaceholder =
      this.paConfigObject.style.window.inputBar.placeholderText !== ""
        ? this.paConfigObject.style.window.inputBar.placeholderText
        : "Type your message here...";
    this.draftMessage = new Message();

    // for all new messages
    this.messagesService.messages.pipe(takeUntil(this.destroy$)).subscribe();
    this.messages$ = this.messagesService.messages;

    // create the initial messages
    this.delegateService.initialMessages.map((message: Message) => {
      this.messagesService.addMessage(message);
    });

    this.setupChatWindow();
  }

  ngOnDestroy() {
    this.isAssistantOpen = false;
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }

  // ================================================== //
  // ******************** Class Methods *************** //
  // ================================================== //

  /**
   * initialize and setup the chat window
   */

  setupChatWindow(): void {
    this.setupSubscriptions();

    this.todayDate = new Date();
    this.isAssistantOpen = false;
    this.isFirstLoad = true;
    this.isAutocompleteVisible = false;
    this.messagesService
      .userMessages()
      .pipe(takeUntil(this.destroy$))
      .forEach((message: Message) => {
        this.messagesService.getData(message.text).subscribe(
          response => {
            this.delegateService.speechInputStart = false;
            this.voiceService.stop();
            this.parseJSONData(response);
          },
          error => {
            console.error(error);
            this.messagesService.isPAWaitingForRespnse = false;

            this.messagesService.addTextOnlyMessageForBot(
              "I am having trouble processing your request."
            );
          }
        );
      });

    // subscription for bot messages
    this.messagesService
      .botMessages()
      .pipe(takeUntil(this.destroy$))
      .forEach(() => {
        this.messagesService.isPAWaitingForRespnse = false;
        this.ref.detectChanges();
      });
  }

  setupSubscriptions() {
    // scroll to bottom on PA window if a message is added to messages array
    this.messages$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      setTimeout(() => {
        this.scrollToBottom();
        this.directiveScroll.update();
      });
    });

    this.helperService.updateScrollbar
      .pipe(takeUntil(this.destroy$))
      .subscribe(event => {
        this.directiveScroll.update();
      });

    this.voiceService
      .getMessage()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        res => {
          if (this.browserService.getBrowser() === "chrome") {
            if (res.text === "") {
              const textarea: any = this.el.nativeElement.querySelector(
                ".textarea"
              );
              textarea.placeholder = "Type your message here...";
            }
            if (this.delegateService.speechInputStart) {
              if (res.text) {
                const textarea: any = this.el.nativeElement.querySelector(
                  ".textarea"
                );
                textarea.placeholder = "Type your message here...";
                this.messagesService.isPAWaitingForRespnse = true;
                this.sendMessageFromSpeech(res.text);
              } else {
                this.delegateService.speechInputStart = false;
                this.ref.detectChanges();
              }
            }
          } else {
            if (this.delegateService.speechInputStart) {
              if (res.text) {
                this.messagesService.isPAWaitingForRespnse = true;
                this.delegateService.speechInputStart = false;
                const textarea: any = this.el.nativeElement.querySelector(
                  ".textarea"
                );
                textarea.placeholder = "Type your message here...";

                this.sendMessageFromSpeech(res.text);
              } else {
                this.delegateService.speechInputStart = false;
                this.ref.detectChanges();
              }
            }
          }
        },
        err => {
          console.error("speech err-->", err);
          this.delegateService.speechInputStart = false;
          this.ref.detectChanges();
        }
      );
  }

  onBackspace() {
    if (this.suggestionArray.length !== 0) {
      if (this.textFieldValue.length === 3) {
        this.remainingChar = this.textFieldValue; // set last three chars from user input
      }
    }
  }

  onClickTextArea() {
    this.delegateService.hideIntentsWindow = true;
    this.ref.detectChanges();
  }
  onClickSuggestion(suggestion: string) {
    this.delegateService.stopReading();
    this.isAutocompleteVisible = false;
    this.delegateService.isAudioInputActive = false;
    this.delegateService.hideIntentsWindow = true;
    this.messagesService.isPAWaitingForRespnse = true;
    this.isTextInputActive = true;
    this.textFieldValue = "";
    this.messagesService.addTextOnlyMessage(suggestion);
  }
  onFocus(): void {
    this.delegateService.speechInputStart = false;
    this.delegateService.hideIntentsWindow = true;
    this.voiceService.stop();
  }

  getSuggestions() {
    // hide autosuggestions list if textfield is empty
    if (this.isTextFieldEmpty || this.textFieldValue === "") {
      this.isAutocompleteVisible = false;
      this.remainingChar = "";
      this.activeIndex = -1;
      this.suggestionArray = [];
      this.ref.detectChanges();
    }

    // show autosuggestions list if user has typed something
    if (!this.isTextFieldEmpty) {
      if (this.textFieldValue.length > 2 || this.textFieldValue === "?") {
        // show only if there are >2 chars
        setTimeout(() => {
          this.messagesService
            .autocomplete(this.textFieldValue)
            .subscribe(result => {
              if (result.suggestions) {
                if (result.suggestions.length === 0) {
                  // no suggestions returned from server
                  if (this.suggestionArray.length > 1) {
                    // if suggestions already visible
                    this.remainingChar = this.lastMatchedString; // set to last matched string
                    this.ref.detectChanges();
                  } else {
                    // clear suggestions
                    this.suggestionArray = [];
                    this.remainingChar = "";
                    this.isAutocompleteVisible = false;
                    this.ref.detectChanges();
                  }
                }

                if (result.suggestions.length > 0) {
                  // show suggestions
                  if (!this.isTextFieldEmpty) {
                    this.suggestionArray = result.suggestions;
                    this.suggestionType = result.type;
                    if (this.suggestionType === "fallback") {
                      setTimeout(() => {
                        if (!this.isTextFieldEmpty) {
                          this.remainingChar = "";
                          this.lastMatchedString = this.textFieldValue;
                          this.isAutocompleteVisible = true;
                          this.ref.detectChanges();
                        }
                      }, 1500);
                    } else {
                      this.remainingChar = "";
                      this.lastMatchedString = this.textFieldValue;
                      this.isAutocompleteVisible = true;
                      this.ref.detectChanges();
                    }
                  }
                }
              }
            });
        }, 100);
      }
    }
  }

  /** create a new message for user's query through voice and send to server to get the response */
  sendMessageFromSpeech(value: string): void {
    this.isVoiceInputTaken = true;
    this.messagesService.addTextOnlyMessage(value);
  }

  /**
   * formats the data received from the server and displays the data as 'messages' in the PA UI
   * @param resultData - The data received from the server
   */
  parseJSONData(data: any): void {
    if (data) {
      this.delegateService.checkMessageType(data);
    }
  }

  /** to check if textfield is empty and return true if it is */
  public get isTextFieldEmpty(): boolean {
    const isWhiteSpace = (this.textFieldValue || "").trim().length;
    if (isWhiteSpace === 0) {
      return true;
    } else {
      return false;
    }
  }

  // ================================================== //
  // ******************** DOM Methods ***************** //
  // ================================================== //

  /** to stop recording user's voice input */
  stopRecording(): void {
    this.delegateService.speechInputStart = false;
    // this.delegateService.hideIntentsWindow = true;
    // this.speechRecognitionService.DestroySpeechObject();
    this.voiceService.stop();
  }

  /** triggered when the user speech recording is started */
  onStartRecording(): void {
    this.delegateService.stopReading();
    this.delegateService.hideIntentsWindow = true;
    this.delegateService.isAudioInputActive = true;
    this.isTextInputActive = false;
    this.textFieldValue = "";
    this.delegateService.startRecording();

    // remove placeholder from textfield when speech recognition is enabled
    const textarea: any = this.el.nativeElement.querySelector(".textarea");
    textarea.placeholder = "";
  }

  /**
   * send the user query to the server to get the response
   * @param query - the query on which user clicked
   */
  onClickQuery(query: string) {
    this.textFieldValue = "";
    this.messagesService.isPAWaitingForRespnse = true;
    this.delegateService.stopReading();
    this.delegateService.isAudioInputActive = false;
    this.messagesService.addTextOnlyMessage(query.replace(/"/g, ""));
  }

  /** to change status of loading when button is clicked for query */
  changeStatus(): void {
    this.delegateService.stopReading();
    this.textFieldValue = "";
    this.delegateService.isAudioInputActive = false;
    this.messagesService.isPAWaitingForRespnse = true;
  }

  /** to scroll to bottom when user sends a query */
  scrollToBottom(): void {
    const scrollPane: any = this.el.nativeElement.querySelector(
      ".msg-container-base"
    );
    scrollPane.scrollTop = scrollPane.scrollHeight;
  }

  /** to send user query on pressing enter */
  onEnter(event: any): void {
    if (!this.isTextFieldEmpty) {
      this.messagesService.isPAWaitingForRespnse = true;
      this.isTextInputActive = true;
      this.isVoiceInputTaken = false;
      this.isAutocompleteVisible = false;
      this.delegateService.isAudioInputActive = false;
      this.ref.detectChanges();
      this.delegateService.stopReading();
      this.sendMessage();
      event.preventDefault();
    }
  }

  /** create a new message for user's query and send to server to get the response */
  sendMessage(): void {
    if (this.activeIndex > -1 && this.suggestionArray.length > 0) {
      this.messagesService.addTextOnlyMessage(
        this.suggestionArray[this.activeIndex]
      );
    } else {
      this.messagesService.addTextOnlyMessage(this.textFieldValue);
    }

    // reset
    this.activeIndex = -1;
    this.suggestionArray = [];
    this.textFieldValue = "";
  }

  /** use to open/close the PA window */
  toggleAssistant(isDelete: boolean): void {
    // this.helperService.userConfig = this.object;

    this.isFirstLoad = false;
    this.isAssistantOpen = !this.isAssistantOpen;
    // this.ref.detectChanges();
    this.assistantState = this.assistantState === "close" ? "open" : "close";

    if (this.isAssistantOpen) {
      // do something when PA window is open
    } else {
      if (isDelete) {
        this.textFieldValue = "";
        this.messagesService.clearMessages();
      }
      this.isAutocompleteVisible = false;
      this.messagesService.isPAWaitingForRespnse = false;
      this.voiceService.stop();
    }
  }
}
