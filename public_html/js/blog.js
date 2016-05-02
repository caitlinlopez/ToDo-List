$(function () {
    var APPLICATION_ID = "F4E79277-3431-8C3F-FF4E-AB800B6F6000",
        SECRET_KEY = "8AF21CDC-5CDC-447A-FF40-3305A22AD900",
        VERSION = "v1";
        
    Backendless.initApp(APPLICATION_ID, SECRET_KEY, VERSION);    
    
    var postsCollection = Backendless.Persistence.of(Posts).find();
    
    console.log(postsCollection);
    
    var wrapper = {
      posts: postsCollection.data  
    };
    
    Handlebars.registerHelper('format', function (time) {
        return moment(time).format("dddd, MMMM Do YYYY");
    });
    
    var blogScript = $("#blogs-template").html();
    var blogTemplate = Handlebars.compile(blogScript);
    var blogHTML = blogTemplate(wrapper);
    
    $('.main-container').html(blogHTML);
    
});

function Posts(args){
    args = args || {};
    this.title = args.title || "";
    this.content = args.content || "";
    this.authorEmail = args.authorEmail || "";
}

$(document).on('click','.trash', function(event) {
       console.log(event);
       Backendless.Persistence.of(Posts).remove(event.target.attributes.data.nodeValue);
      location.reload(); 
   });