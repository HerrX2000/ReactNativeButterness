import theme from './../../constants/theme';
import themeDark from './../../constants/themeDark';

const htmlHead = {
    script:`<script>
    document.addEventListener("DOMContentLoaded", function() { 
        const elements = Array.from(document.getElementsByTagName("IFRAME"));
        elements.forEach(function(element) {
            console.log(element);
            console.log(element.textContent);
            element.sandbox="allow-scripts allow-same-origin";

            let link = document.createElement('a');
            link.setAttribute('href', element.src);
            link.textContent="In Browser/App öffnen:"
			if(element.parentElement.tagName=="BODY"){
			 element.insertAdjacentHTML("beforebegin","<div style='display: block;width:100%;'><a style='width:100%;text-align:center;-webkit-appearance: button;appearance: button;' href='"+link.href+"'>"+link.textContent+"</a></div>")      
			}
			else{
			 element.parentElement.insertAdjacentHTML("beforebegin","<div style='display: block;width:100%;'><a style='width:100%;text-align:center;-webkit-appearance: button;appearance: button;' href='"+link.href+"'>"+link.textContent+"</a></div>")      
			}
		});
    });
    </script>`,
    /*
    the version above addes the Link in the parentElement instead
    this version replaces the style
    youtubeJS:`<script>
    document.addEventListener("DOMContentLoaded", function() { 
        const elements = Array.from(document.getElementsByTagName("IFRAME"));
        elements.forEach(function(element) {
            console.log(element);
            console.log(element.textContent);
            element.sandbox="allow-scripts allow-same-origin";
            element.width=screen.width-20
            /*element.height=screen.width*0.56*//*
            element.style=""
            let link = document.createElement('a');
            link.setAttribute('href', element.src);
            link.textContent="In Browser/App öffnen:"
            element.insertAdjacentHTML("beforebegin","<div style='display: block;width:100%;'><a style='width:100%;text-align:center;-webkit-appearance: button;appearance: button;' href='"+link.href+"'>"+link.textContent+"</a></div>")      
        });
    });
 
    </script>`,
    */
    CSS:`
    <style>
    html{
        width:100%;
    }
    body{
        padding-left:2%;
        width:92%;
        background-color: ${theme.background.primary};
        color:${theme.text.primary};
        text-overflow: ellipsis;
        font-size: 1.05em;
    }
    img{
        height:auto;
        max-width: 100%;
        box-shadow: 0px 0px 6px 1px ${theme.background.primaryVariant};
    }
    iframe{
        height:auto;
        max-width:100%;
    }
    a{
        display: inline-block;
        color: ${themeDark.tertiary};
    }
    p{
        margin-top:0.2em;
        margin-bottom:0.2em;
        
        overflow: hidden;
    }
    </style>`,
    darkCSS:`
    <style type="text/css">
    html{
        width:100%;
        overflow: hidden;
    }
    body{
        padding-left:2%;
        width:92%;
        background-color: ${themeDark.background.primary};
        color:${themeDark.text.primary};
        text-overflow: ellipsis;
        font-size: 1.05em;
        
    }
    img{
        height:auto;
        max-width: 100%;
        box-shadow: 0px 0px 6px 1px ${themeDark.background.primaryVariant};
    }
    iframe{
        height:auto;
        max-width:100%;
    }
    a{
        display: inline-block;
        color: ${themeDark.tertiary};
    }
    p{
        margin-top:0.2em;
        margin-bottom:0.2em;
        overflow: hidden;
    }
    </style>`,
}

export default htmlHead;
