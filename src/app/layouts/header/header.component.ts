import {
  Component,
  OnInit,
  HostListener,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy
} from "@angular/core";
import { NavigationExtras, Router } from "@angular/router";
import { any } from "async";
import { KeycloakService } from "keycloak-angular";
import { MyProfileServices } from "@app/shared/services/myProfile.service";
import { Subject } from "rxjs";
import { VoiceService } from "../../personal-assistant/services/speech-api.service";
import { BrowserDetectService } from "../../personal-assistant/services/browser-detect.service";
import { SearchQueryService } from "@app/modules/search/service/search.service";
import { SpeechSynthesisService } from "@app/personal-assistant/services/speech-recognition/speech-synthesis.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
  providers: [MyProfileServices]
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {
  toggleSearch = false;
  inputFocus = false;
  searchValue = "";
  isBw = false;
  userData: any;
  ddlOpen = false;
  slug = any;
  dropdownClass = "mdi novi-icon mdi-account-circle pointer";
  toggleMenu = false;
  menuClass = "rd-navbar-nav";
  toggleUserMobile = false;
  profileId: string;
  isAdmin: Boolean = false;
  public recording: boolean;
  public voiceValue: string;
  public isChrome = true;
  public controlIf: number = 0;
  private _onDestroy = new Subject<void>();

  constructor(
    private elementRef: ElementRef,
    private router: Router,
    private keycloak: KeycloakService,
    private profileService: MyProfileServices,
    private _voice: VoiceService,
    private searchQueryService: SearchQueryService,
    private _browserService: BrowserDetectService,
    private speech: SpeechSynthesisService
  ) {}

  @ViewChild("searchInput") searchElement: ElementRef;
  @ViewChild("searchInput1") searchElement1: ElementRef;
  public ngAfterViewInit(): void {
    this.elementRef.nativeElement.focus();
    // this.searchElement.nativeElement.focus();
  }
  @HostListener("document:scroll", ["$event"])
  @HostListener("document:click", ["$event"])
  onScroll(event) {
    if (event.type == "scroll") {
      if (event.srcElement.scrollingElement.scrollTop !== 0) {
        this.isBw = true;
      } else {
        this.isBw = false;
      }
    } else if (event.type == "click") {
      if (this.ddlOpen && event.target.className !== this.dropdownClass) {
        this.ddlOpen = false;
      }
    } else {
      this.isBw = false;
      this.ddlOpen = false;
    }
  }

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem("userDetails"));
    this.isAdmin = localStorage.getItem("userRole") === "admin";
    this.getProfileId();
    this._voice.getMessage().subscribe(
      res => {
        if (this.recording && res.text !== "") {
          if (res.text && res.text.length > 0) {
            this.voiceValue = res.text;
          }
          if (this._browserService.getBrowser() === "chrome") {
            if (res.text) {
              this.controlIf++;
              this.recording = res.recording;
              this.searchValue = res.text;
              this.controlIf = 0;
              this.navigate(this.searchValue);
              return;
            }
          } else {
            /*for other browser delay needed >4sec bcoz of service itself taking 3sec*/
            if (res.text) {
              this.controlIf++;
              setTimeout(() => {
                this.recording = res.recording;
                this.searchValue = res.text;
                this.controlIf = 0;
              }, 2000);
              this.navigate(this.searchValue);
              return;
            }
          }
          if (!this.controlIf) {
            this.recording = res.recording;
            this.searchValue = res.text;
            this.controlIf = 0;
          }
        }
      },
      err => {}
    );
  }

  searchOpen() {
    this.toggleSearch = !this.toggleSearch;
    if (!this.toggleSearch) {
      this.inputFocus = false;
      this.elementRef.nativeElement.value = "";
      // this.searchValue = '';
    } else {
      setTimeout(() => {
        this.searchElement.nativeElement.focus();
        this.searchElement1.nativeElement.focus();
      }, 100);
    }
  }
  searchClose() {
    this.searchValue = "";
    setTimeout(() => {
      if (this.toggleSearch) {
        this.toggleSearch = false;
      }
    }, 500);
  }

  navigate(value: any) {
    let data = {
        session: "864fd3e8-9544-c273-4417-7d90f2a1c6be",
        queryParams: {
          contexts: [
            {
              name: "aic",
              parameters: {
                pageNumber: 0,
                pagesize: 10
              },
              lifespanCount: 5
            }
          ]
        },
        queryInput: {
          text: {
            text: value,
            languageCode: "en"
          }
        }
      },
      keys,
      messageToSpeak;

    this.searchQueryService
      .getCuiresult("pams/aic", data)
      .subscribe((res: any) => {
        keys = Object.keys(res);

        // Data from search
        if (keys.includes("searchEngine") && res.searchEngine) {
          this.searchQueryService.setSearchData(res);
          this.router.navigate(["search"]);
        } else if (res.parameters && res.parameters.route) {
          // Data for navigation
          if (res.parameters.coe) {
            this.searchQueryService.setAddBlogData(res.parameters)
          } else if (res.parameters.project || res.parameters.client) {
            this.searchQueryService.setAddProjectData(res.parameters)
          }
          messageToSpeak = res["fulfillment"]["messages"]
            ? res["fulfillment"]["messages"][0]["speech"]
            : res["webhook"]["voice"];
          this.speech.speakText(messageToSpeak).subscribe();
          this.router.navigateByUrl(res.parameters.route);
        }
      });
    this.toggleSearch = false;
  }

  profileClk() {
    this.ddlOpen = !this.ddlOpen;
  }
  profileClk2() {
    this.toggleUserMobile = !this.toggleUserMobile;
  }

  profilesClk() {
    localStorage.removeItem("tabValue");
  }

  logoutClick() {
    localStorage.clear();
    this.keycloak.logout();
  }

  menuOpen() {
    this.toggleMenu = !this.toggleMenu;
  }

  getProfileId() {
    const profile = JSON.parse(localStorage.userDetails).email;
    let params = {
      where: {
        email: profile
      }
    };
    this.profileService.employeeDetail(params).valueChanges.subscribe(res => {
      if (res.data.employees && res.data.employees.length) {
        this.profileId = res.data.employees[0].id;
      }
    });
  }
  startRecording() {
    this.recording = true;
    this.voiceValue = "";
    this._voice.start();
    setTimeout(() => {
      this.stopRecording();
    }, 7000);
  }

  stopRecording() {
    this.recording = false;
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  clickOutside(e) {
    if (e.value) {
      this.searchClose();
    }
  }
}
