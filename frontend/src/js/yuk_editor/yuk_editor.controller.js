class Yuk_EditorCtrl {
  constructor(Yuks, yuk, $state) {
    'ngInject';
    console.log("dentro controller yuk_editor")
    this._Yuks = Yuks;
    this._$state = $state;

    if (!yuk) {
      console.log("yuk creado")
      this.yuk = {
        title:'',
        content: '',
        image: '',
        tagList: []
      }
    } else {
      this.yuk = yuk;
    }

  }

  addTag() {
    if (!this.yuk.tagList.includes(this.tagField)) {
      console.log(this.yuk.tagList);
      this.yuk.tagList.push(this.tagField);
      this.tagField = '';
    }
  }

  removeTag(tagName) {
    this.yuk.tagList = this.yuk.tagList.filter((slug) => slug != tagName);
  }

  submit() {
    this.isSubmitting = true;

    this._Yuks.save(this.yuk).then(
      (newYuk) => {
        this._$state.go('app.detailyuk', { slug: newYuk.slug });
      },

      (err) => {
        this.isSubmitting = false;
        this.errors = err.data.errors;
      }

    )
  }



}


export default Yuk_EditorCtrl;
