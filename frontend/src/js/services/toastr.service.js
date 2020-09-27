export default class Toastr {
    constructor (toastr) {
      'ngInject';

      this._toastr = toastr;
    }

    showToastr(type, message){
      switch (type) {
        case 'success':
          this._toastr.success(message);
          break;
        case 'error':
          this._toastr.error(message);
          break;
      }
    }
  }