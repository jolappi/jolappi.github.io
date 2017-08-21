const client = new stitch.StitchClient('bolg-wuajn');
const db = client.service('mongodb', 'mongodb-atlas').db('modb');
const coll = db.collection("mocollection");
var updategb = function(){
    function get_action(form)
    {
        var v = grecaptcha.getResponse();
        if(v.length == 0)
        {
            $("#gotchaalert").removeClass('hidden');
            return false;
        }
        else
        {
            $("#gotchaalert").addClass('hidden');
            saveme();
            return true;
        }
    }
    get_action();
    return;
}

var saveme = function (){
    var d = new Date();
    var curr_date = d.getDate();
    var curr_month = d.getMonth() + 1; //Months are zero based
    var curr_year = d.getFullYear();
    var datestr = curr_date + "." + curr_month + "." + curr_year;

    var whoau = document.getElementById("whoareu").value;
    var msg = document.getElementById("msg").value;
    if(whoau == "" || msg == "" || !whoau || !msg){
        $("#inalert").removeClass('hidden');
        return;
    }
    $("#inalert").addClass('hidden');
    var text = msg.replace(/(\r\n|\n|\r)/g,"<br />");
    client.login().then(() =>
        coll.updateOne({who: whoau , date:datestr}, {$set:{comment:text}}, {upsert:true})
    ).catch(err => {
      console.error(err)
    });
    getgb();
    $('#msg').val('');
    $("#successalert").removeClass('hidden');
};

var getgb = function(){
    client.login().then(() =>
        coll.find({})
    ).then(docs => {
        var elm = document.getElementById("messages");
        elm.innerHTML = "";
        var ind = 1;
        docs.forEach(function(elem){
            var color = "snow";
            if(ind%2-1)color = "ghostwhite";
            ind++;
            elm.innerHTML += "<div class='row' style='background-color: "+color+";'><div class='container'><p><center><b>"+elem.date+"<br>"+elem.who+"</b><br>"+elem.comment+"</center></p></div></div>";
        });
        //elm.innerHTML = docs;
        //console.log(elm.who);
        console.log("Found docs", docs)
        console.log("[MongoDB Stitch] Connected to Stitch")
    }).catch(err => {
        console.error(err)
    });
};
getgb();
