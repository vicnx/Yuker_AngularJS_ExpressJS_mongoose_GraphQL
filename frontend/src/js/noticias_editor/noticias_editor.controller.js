class Noticias_EditorCtrl {
  constructor(Noticias, noticia, $state) {
    'ngInject';
    console.log("dentro controller noticias_editor")
    this._Noticias = Noticias;
    this._$state = $state;

    if (!noticia) {
      console.log("noticiascreado")
      this.noticia = {
        titulo:'',
        contenido: '',
        tagList: []
      }
    } else {
      this.noticia = noticia;
    }

  }

  addTag() {
    if (!this.noticia.tagList.includes(this.tagField)) {
      console.log(this.noticia.tagList);
      this.noticia.tagList.push(this.tagField);
      this.tagField = '';
    }
  }

  removeTag(tagName) {
    this.noticia.tagList = this.noticia.tagList.filter((slug) => slug != tagName);
  }

  submit() {
    this.isSubmitting = true;

    this._Noticias.save(this.noticia).then(
      (newNoticia) => {
        this._$state.go('app.detailnoticia', { slug: newNoticia.slug });
      },

      (err) => {
        this.isSubmitting = false;
        this.errors = err.data.errors;
      }

    )
  }



}


export default Noticias_EditorCtrl;
