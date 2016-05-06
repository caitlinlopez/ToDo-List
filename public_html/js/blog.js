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
    
    if(Backendless.UserService.isValidLogin()){
    var blogScript = $("#blogs-template").html();
    var blogTemplate = Handlebars.compile(blogScript);
    var blogHTML = blogTemplate(wrapper);
    
    $('.main-container').html(blogHTML);
    }
    else{
        Materialize.toast('Please login to see posts')
    }
});
 $(document).on('click', '.add-blog', function(){
        var addBlogScript = $("#add-blog-template").html();
        var addBlogTemplate = Handlebars.compile(addBlogScript);
    
        $('.main-container').html(addBlogTemplate);
    });
    $(document).on('submit', '.form-add-blog', function (){
       event.preventDefault();
       
       var data = $(this).serializeArray(),
           title = data[0].value,
           content = data[1].value;
         
        if (content ==="" || title ==="") {
            Materialize.toast('Cannot leave title or content empty', 4000, 'rounded')
        }
        else {
            
        var dataStore = Backendless.Persistence.of(Posts);
        
        var postObject = new Posts({
            title: title,
            content: content,
            authorEmail: Backendless.UserService.getCurrentUser().email
        });
        
        dataStore.save(postObject);
        
        this.title.value = "";
        this.content.value = "";
    }
    });
    
    $(document).on('click', '.white-out-post', function(){
       var uncheckListScript = $("#check-done-template").html();
       var uncheckListTemplate = Handlebars.compile(uncheckListScript);
       $('.main-container').html(uncheckListTemplate);
   });

function Posts(args){
    args = args || {};
    this.title = args.title || "";
    this.content = args.content || "";
    this.authorEmail = args.content;
}

$(document).on('click','.trash', function(event) {
       console.log(event);
       Backendless.Persistence.of(Posts).remove(event.target.attributes.data.nodeValue);
      location.reload(); 
   });