var config = {
  apiKey: "AIzaSyAvzTNPrudlKMhuE8d5sbp0IbrItqR2MTE",
  authDomain: "",
  databaseURL: "https://messageinthebottle-4d3dc.firebaseio.com"
};
firebase.initializeApp(config);

var converter = new Showdown.converter();

var Comment = React.createClass({
  render: function() {
    var rawMarkup = converter.makeHtml(this.props.children.toString());
    return (
      <div className='Bottle'>
        <h2 className='commentAuthor'>{this.props.duid}</h2>
        <span dangerouslySetInnerHTML={{__html: rawMarkup}} />
      </div>
    );
  }
});


var CommentList = React.createClass({
  render: function() {
    var commentNodes = this.props.data.map(function (comment, index) {
      return <Comment key={index} duid={comment.duid}>{comment.bottle}</Comment>;
    });
    return <div className='commentList'>{commentNodes}</div>;
  }
});


var CommentForm = React.createClass({
  handleSubmit: function(event) {
    event.preventDefault();
    var duid = this.refs.duid.value.trim();
    var bottle = this.refs.bottle.value.trim();
    this.props.onCommentSubmit({duid: duid, bottle: bottle});
    this.refs.duid.value = '';
    this.refs.bottle.value = '';
  },

  render: function() {
    return (
      <form className='commentForm' onSubmit={this.handleSubmit}>
        <input type='text' placeholder='Your name' ref='duid' />
        <input type='text' placeholder='Say something...' ref='bottle' />
        <input type='submit' value='Post' disabled={!this.refs.duid.value}/>
      </form>
    );
  }
});


var CommentBox = React.createClass({
  mixins: [ReactFireMixin],

  handleCommentSubmit: function(comment) {
    // Here we push the update out to Firebase and let ReactFire update this.state.data
    this.firebaseRefs['data'].push(comment);
  },

  getInitialState: function() {
    return {
      data: []
    };
  },

  componentWillMount: function() {
    // Here we bind the component to Firebase and it handles all data updates,
    // no need to poll as in the React example.
    this.bindAsArray(firebase.database().ref('refire'), 'data');
  },

  render: function() {
    return (
      <div className='commentBox'>
        <h1>Comments</h1>
        <CommentList data={this.state.data} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
      </div>
    );
  }
});

ReactDOM.render(
  <CommentBox />,
  document.getElementById('content')
);
