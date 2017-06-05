componentWillMount: function() {
  this.firebaseRef = firebase.database().ref("refire");
  this.firebaseRef.on("child_added", function(dataSnapshot) {
    this.items.push(dataSnapshot.val());
    this.setState({
      items: this.items
    });
  }.bind(this));
}
