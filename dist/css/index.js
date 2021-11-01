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

function convertToInternationalCurrencySystem (labelValue) {

    // Nine Zeroes for Billions
    return Math.abs(Number(labelValue)) >= 1.0e+9

    ? (Math.abs(Number(labelValue)) / 1.0e+9).toFixed(2) + "B"
    // Six Zeroes for Millions 
    : Math.abs(Number(labelValue)) >= 1.0e+6

    ? (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(2) + "M"
    // Three Zeroes for Thousands
    : Math.abs(Number(labelValue)) >= 1.0e+3

    ? (Math.abs(Number(labelValue)) / 1.0e+3).toFixed(2) + "K"

    : Math.abs(Number(labelValue));

}

async function fetchCors(url='')
{
    const response = await fetch('https://api.allorigins.win/get?url=https://www.reddit.com/r/ethtrader.json');
    const json = await response.json();
    if(json.contents)
    {
        return JSON.parse(json.contents);
    }
}


window.onload = function()
{ 
    const Http = new XMLHttpRequest();
    const url = 'https://api.etherscan.io/api?module=stats&action=tokensupply&contractaddress=0xc0f9bd5fa5698b6505f643900ffa515ea5df54a9&apikey=KIX2DUCUIVGT5PMEKF65TJIXMSQXTFCRYH';
    Http.open('GET', url);
    Http.send();

    Http.onreadystatechange = function()
    {
        if(this.readyState == 4 && this.status == 200)
        {
            const obj = JSON.parse(Http.responseText);
            var supply = obj.result;
            document.querySelector(".total-supply").innerHTML = convertToInternationalCurrencySystem(supply.slice(0 , -18));
        }
    }

    const Http1 = new XMLHttpRequest();
    const url1 = 'https://api.coingecko.com/api/v3/simple/price?ids=donut&vs_currencies=usd&include_market_cap=true';
    Http1.open('GET', url1);
    Http1.send();

    Http1.onreadystatechange = function()
    {
        if(this.readyState == 4 && this.status == 200)
        {
            console.log(Http1.responseText);
            const obj1 = JSON.parse(Http1.responseText);

            var price = obj1.donut.usd;
            price = price.toString().slice(0, 6);
            var marketCap = Math.floor(parseFloat(obj1.donut.usd_market_cap));
            marketCap = convertToInternationalCurrencySystem(obj1.donut.usd_market_cap);

            document.querySelector(".price").innerHTML = '$' + price;
            document.querySelector(".market-cap").innerHTML = marketCap;

            console.log(price, marketCap, typeof price, typeof marketCap);
        }
    }


    fetchCors().then(function(result)
    {
        var members = result['data']['children'][0]['data']['subreddit_subscribers'];
        members = convertToInternationalCurrencySystem(members);
        document.querySelector(".members").innerHTML = members;

        var top_posts = [];

        for(var i = 0;i < 9;i++)
        {
            top_posts.push(result['data']['children'][i]['data']['title']);
        }

        console.log(top_posts);

        for(var i = 0;i < 9;i++)
        {
            var row, post;
            if (i >=0 && i<=2)
            {
                row = 1;
                post = (i % 3) + 1;
            }

            if (i >=3 && i<=5)
            {
                row = 2;
                post = (i % 3) + 1;
            }

            if (i >=6 && i<=8)
            {
                row = 3;
                post = (i % 3) + 1;
            }
            var selector = `.r${row}p${post}`;
            console.log(selector, typeof selector);
            console.log(document.querySelector(selector).innerHTML);
            document.querySelector(selector).innerHTML = top_posts[i];
        }

    });


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


