declare module "worker-loader!*" {
  class WebpackWorker extends Worker {
    constructor();
  }
 
  export default WebpackWorker;
}

declare module "*.json" {
  const value: any;
  export default value;
}

declare var Flac: any;
declare var gapi: any;
declare var Modernizr: any;
declare var FB: any;

declare var System: any;
declare var gtag:any;
declare var CryptoJS:any;
