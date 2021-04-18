export async function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    try {
        for (var i = 0; i < 10; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        return text;

    } catch (e) {
        console.warn("Can't create MakeId");
    }
}

export async function getParam(parameter) {
    var p={};
    var ori_loc = window.location;
    try {
      ori_loc.search.replace(/[?&]+([^=&]+)=([^&]*)/gi,function(s,k,v){p[decodeURIComponent(k)]=decodeURIComponent(v)});
      return parameter?p[parameter]:p;
    } catch (e) {
      console.warn("Can't get param");
    }
  }
  
 export async function onboarding(parameter) {
    if (window.localStorage) {
      if (!localStorage.getItem("quicknote_onboarding")) {
       
        setTimeout(function() {
          var wtf = document.getElementById("wtf");
          wtf.click();
  
          localStorage.setItem("quicknote_onboarding", true);
        }, 2000);
  
      }
    }
  } 
  