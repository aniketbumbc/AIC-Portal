import { Injectable } from "@angular/core";
import * as lodash from "lodash";
import { Subject } from "rxjs";
import { config } from "app/config";

import { Message } from "../model/message.model";
import { Suggestion } from "../model/suggestion.model";

import { MessagesService } from "../services/message.service";
import { HelperService } from "../services/helper.service";
import { VoiceService } from "../services/speech-api.service";
import { BrowserDetectService } from "../services/browser-detect.service";

// import { SpeechRecognitionService } from "../services/speech-recognition/speech-recognition.service";
import { SpeechSynthesisService } from "../services/speech-recognition/speech-synthesis.service";

@Injectable()
export class DelegateService {
  isAudioInputActive = false; // check if user gave input through speec
  hideIntentsWindow = true;
  listItems: any[];
  speechInputStart = false;
  showAudioLoadingAnimation = new Subject<boolean>();

  suggestionButtons: Suggestion[];

  initialMessages: Array<
    Message
  > = config.personal_assistant.initial_messages.map(msg => {
    return new Message({
      author: "bot",
      text: msg
    });
  });

  constructor(
    private messagesService: MessagesService,
    private helperService: HelperService,
    private voiceService: VoiceService,
    private browserService: BrowserDetectService,
    // private speechRecognitionService: SpeechRecognitionService,
    private speechSynthesisService: SpeechSynthesisService
  ) {}

  checkMessageType(data: any) {
    const { parameters, fulfillment } = data;
    const messages = fulfillment.messages;

    if (messages.length > 0) {
      messages.forEach(msg => {
        switch (msg.type) {
          case 0:
            if (msg.speech !== "") {
              this.messagesService.addTextOnlyMessageForBot(msg.speech);
              if (this.isAudioInputActive) {
                if (this.browserService.getBrowser() === "chrome") {
                  this.speechSynthesisService.speakText(msg.speech).subscribe(
                    value => {},
                    err => {
                      console.error(err);
                    },
                    () => {
                      if (fulfillment.data) {
                        if (fulfillment.data.expectUserResponse) {
                          this.startRecording();
                        }
                      }
                    }
                  );
                }
              }
            } else {
              // SHOW ERROR MESSAGE TO USER IF NO RESPONSE FROM SERVER
              this.messagesService.addTextOnlyMessageForBot(
                this.helperService.getRandomErrorResponse()
              );
            }
            break;

          case "leadership.accion":
            this.listItems = [];
            msg.data.profiles.forEach(elem => {
              console.log("fdjsh");
              this.listItems.push({
                title: elem.displayName || elem.name,
                thumbnailImg: `http://aic.accionlabs.com${elem.photograph}`,
                description: elem._designation || ""
              });
            });

            this.messagesService.addCardMessage(
              msg.type,
              { list: this.listItems },
              msg.viewType,
              parameters
            );

          case "profiles":
            this.listItems = [];
            this.listItems = msg.data.profiles.map(elem => {
              return {
                title: elem._source.name,
                thumbnailImg: `http://aic.accionlabs.com${
                  elem._source.photograph
                }`,
                description: elem._source.introduction
              };
            });
            this.messagesService.addCardMessage(
              msg.type,
              { list: this.listItems },
              msg.viewType,
              parameters
              // viewType
            );
            break;

          case "suggestions":
            this.suggestionButtons = [];
            this.addSuggestions(msg.data.suggestions);

            this.messagesService.addMessage(
              new Message({
                author: "bot",
                text: msg.data.text,
                suggestions: this.suggestionButtons,
                type: "initial_suggestions"
              })
            );
            break;

          // case "fetch.email":
          //   console.log("case matched");
          //   this.listItems = [];
          //   this.listItems = msg.data.data;
          //   this.messagesService.addCardMessage(
          //     msg.type,
          //     { list: msg.data.data },
          //     msg.viewType,
          //     parameters
          //   );
          //   break;

          default:
            if (msg.viewType) {
              this.listItems = [];
              this.listItems = msg.data;
              this.messagesService.addCardMessage(
                msg.type,
                { list: msg.data.data },
                msg.viewType,
                parameters
                // viewType
              );
            } else {
              console.log("Inside defaualt");
              this.messagesService.addTextOnlyMessageForBot(
                this.helperService.getRandomErrorResponse()
              );
            }

            break;
        }
      });
    } else {
      this.messagesService.addTextOnlyMessageForBot(
        this.helperService.getRandomErrorResponse()
      );
    }
  }

  addSuggestions(suggestions: any[]): void {
    this.suggestionButtons = [];
    suggestions.forEach(suggestion => {
      console.log(suggestion);
      const suggestionTitle: string = suggestion;
      let sugg: Suggestion;

      sugg = new Suggestion({
        text: suggestionTitle
      });
      this.suggestionButtons.push(sugg);
    });
  }

  /**
   * stop speaking the currently reading text
   */
  stopReading() {
    this.speechSynthesisService.DestroySyntesisObject();
  }

  /** to start recording user's voice input */
  startRecording(): void {
    // this.speechRecognitionService.record();
    this.voiceService.start();
    this.showAudioLoadingAnimation.next(true);
    this.speechInputStart = true;
  }
}
