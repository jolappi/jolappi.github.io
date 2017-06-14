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
      <div className='Bottle' style={{display: 'flex', justifyContent: 'center'}}>
        <div class="col-lg-1 col-centered">
            <h2 className='commentAuthor hidden'>{this.props.duid}</h2>
            <span dangerouslySetInnerHTML={{__html: rawMarkup}} />
        </div>
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
    getInitialState: function() {
        return { showSubmit: '' };
    },
    onChange: function(evt) {
        	this.setState({ showSubmit: evt.target.value });
    },
  handleSubmit: function(event) {
    event.preventDefault();
    var duid = this.refs.duid.value.trim();
    var bottle = this.refs.bottle.value.trim();
    this.props.onCommentSubmit({duid: duid, bottle: bottle});
    this.refs.duid.value = '';
    this.refs.bottle.value = '';
  },
  generateUUID: function generateUUID() {
      var d = new Date().getTime();
      var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = (d + Math.random()*16)%16 | 0;
          d = Math.floor(d/16);
          return (c=='x' ? r : (r&0x3|0x8)).toString(16);
      });
      return uuid;
  },
  render: function() {
      var uuid = this.generateUUID();
    return (
      <div class="row" style={{ flex:1, background: 'gray', display: 'flex', justifyContent: 'center', height:'200' , alignItems: 'center' }}>
      <form className='commentForm center-div' onSubmit={this.handleSubmit} style={{ alignItems: 'center' , justifyContent: 'center' }}>
      <center>
        <h2 style={{ whiteSpace: 'nowrap', color:'white' , justifyContent: 'center' }}>Heitä pullosi - Cast away your bottle </h2>
        <br />
        <input type='hidden' placeholder='Your name' ref='duid' value={uuid}/>
        <input style={{ width:'80%'}} align='center' type='text' placeholder='Kirjoita jotain - Write something...' onChange={this.onChange} ref='bottle' /><br />
        <br />
        { this.state.showSubmit ? <Submits /> : null }
        </center>
      </form>
      </div>
    );
  }
});

var Submits = React.createClass({
    render: function() {
        return (
            <input type='submit' value='Heitä pullosi - Cast your bottle' className='btn btn-lg btn-primary'/>
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
    this.bindAsArray(firebase.database().ref('drifting'), 'data');
  },

  render: function() {
    return (
      <div className='commentBox'>
        <h2 style={{display: 'flex', justifyContent: 'center'}}>Pullo Posti - Message In the Bottle</h2>
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
