var config = {
  apiKey: "AIzaSyAvzTNPrudlKMhuE8d5sbp0IbrItqR2MTE",
  authDomain: "",
  databaseURL: "https://messageinthebottle-4d3dc.firebaseio.com"
};
firebase.initializeApp(config);

var getFirstBrowserLanguage = function () {
    var nav = window.navigator,
    browserLanguagePropertyKeys = ['language', 'browserLanguage', 'systemLanguage', 'userLanguage'],
    i,
    language;

    // support for HTML 5.1 "navigator.languages"
    if (Array.isArray(nav.languages)) {
      for (i = 0; i < nav.languages.length; i++) {
        language = nav.languages[i];
        if (language && language.length) {
          return language;
        }
      }
    }

    // support for other well known properties in browsers
    for (i = 0; i < browserLanguagePropertyKeys.length; i++) {
      language = nav[browserLanguagePropertyKeys[i]];
      if (language && language.length) {
        return language;
      }
    }

    return "en";
  };
var odd = 1;
var converter = new Showdown.converter();

var Comment = React.createClass({
  render: function() {
    var rawMarkup = converter.makeHtml(this.props.children.toString());
    var colori = 'ghostwhite';
    if(odd%2 - 1) colori="snow";
    odd = odd + 1;
    return (
      <div className='Bottle' style={{display: 'flex', justifyContent: 'center',background: colori}}>
        <div class="col-lg-1 col-centered" style={{ paddingTop:'10px' }}>
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
      var lang = getFirstBrowserLanguage();
      var thistext = 'Write something...';
      var thistext2 = 'Cast away your bottle';
      if(lang=="fi"){
          thistext = 'Kirjoita jotain...';
          thistext2 = 'Heitä pullosi...'
    }
    return (
      <div class="row" style={{ flex:1, background: 'lightGray', display: 'flex', justifyContent: 'center', height:'200' , alignItems: 'center' }}>
      <form className='commentForm center-div' onSubmit={this.handleSubmit} style={{ alignItems: 'center' , justifyContent: 'center' }}>
      <center>
        <h2 style={{ whiteSpace: 'nowrap', color:'black' , justifyContent: 'center'}}>{thistext2} </h2>
        <br />
        <input type='hidden' placeholder='Your name' ref='duid' value={uuid}/>
        <input style={{ width:'80%'}} align='center' type='text' placeholder={thistext} onChange={this.onChange} ref='bottle' /><br />
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
        var lang = getFirstBrowserLanguage();
        var thistext = 'Cast your bottle';
        if(lang=="fi")thistext = 'Heitä pullosi';
        return (
            <input type='submit' value={thistext} className='btn btn-lg btn-primary'/>
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
      var lang = getFirstBrowserLanguage();
      var thistext = 'Bottled Messages';
      if(lang=="fi"){
          thistext = 'Pullo Viestit';
    }
    return (
      <div className='commentBox'>
        <h2 style={{display: 'flex', justifyContent: 'center', paddingBottom:'40px'}} tkey="messages">{thistext}</h2>
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
