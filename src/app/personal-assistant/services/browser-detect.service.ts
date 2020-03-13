import { Injectable } from "@angular/core";

@Injectable()
export class BrowserDetectService {
    
    getBrowser(){
        var sBrowser, 
        sUsrAg = navigator.userAgent;
        
        if(sUsrAg.indexOf("Edge") > -1) {
            sBrowser = "edge";
        }
        else if(sUsrAg.indexOf("Chrome") > -1) {
            sBrowser = "chrome";
        } else if (sUsrAg.indexOf("Safari") > -1) {
            sBrowser = "safari";
        } else if (sUsrAg.indexOf("Opera") > -1) {
            sBrowser = "opera";
        } else if (sUsrAg.indexOf("Firefox") > -1) {
            sBrowser = "firefox";
        } else if (sUsrAg.indexOf("MSIE") > -1 || sUsrAg.indexOf("Trident") > -1) {
            sBrowser = "ie";
        }
        return sBrowser;
    }
}