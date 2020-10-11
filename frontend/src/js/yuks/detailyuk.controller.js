class DetailYukCtrl {
  constructor(User,yuk,Comments,Tags,AppConstants, $state,$scope) {
    'ngInject';
    console.log("controller detail yuk")
    this.yuk = yuk;
    this._Comments = Comments;


    this.$onInit = () => {
      // console.log(this.yuk)
      Comments.getAll(this.yuk.slug).then(
        (comments) => this.comments = comments
      );
    }

    this.resetCommentForm();
    

  }
  resetCommentForm() {
    this.commentForm = {
      isSubmitting: false,
      body: '',
      errors: []
    }
  }

  addComment(){
    this.commentForm.isSubmitting = true;

    this._Comments.add(this.yuk.slug, this.commentForm.body).then(
      (comment) => {
        this.comments.unshift(comment);
        this.resetCommentForm();
      },
      (err) => {
        this.commentForm.isSubmitting = false;
        this.commentForm.errors = err.data.errors;
      }
    )
  }

  deleteComment(commentId, index) {
    this._Comments.destroy(commentId, this.yuk.slug).then(
      (success) => {
        this.comments.splice(index, 1);
      }
    )
  }

}

export default DetailYukCtrl;
