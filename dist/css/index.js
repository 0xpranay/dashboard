function iOS() {
    return [
      'iPad Simulator',
      'iPhone Simulator',
      'iPod Simulator',
      'iPad',
      'iPhone',
      'iPod'
    ].includes(navigator.platform)
    // iPad on iOS 13 detection
    || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
}


window.onload = function()
{ 
    if(iOS())
    {
        console.log("Device is iOS");
        var collection = document.getElementsByTagName("picture");
        for(i = 0;i < collection.length;i++)
        {
            collection.item(i).innerHTML = '<source type="image/gif" srcset="/assets/donut.gif">' + collection.item(i).innerHTML;
        }
        console.log("iOS fix applied");
    }
}


