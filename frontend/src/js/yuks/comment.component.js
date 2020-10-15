class CommentCtrl {
  constructor(User) {
    'ngInject';
    console.log("controller comment")
    this.$onInit = () => {
      console.log(this.data);
      if (User.current) {
        this.canModify = (User.current.username === this.data.author.username);
      } else {
        this.canModify = false;
      }

      // console.log(this.yuk);
      this.showAuthor = (this.data.author.username === this.yuk.author.username);
    }

  }
}

let Comment = {
  bindings: {
    yuk: '=',
    data: '=',
    deleteCb: '&'
  },
  controller: CommentCtrl,
  templateUrl: 'yuks/comment.html'
};

export default Comment;
