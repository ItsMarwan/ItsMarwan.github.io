function toggleMenuIcon(button) {
    const img = button.querySelector("img");
    if (img.src.includes("menuIcon.svg")) {
        img.src = "assets/close.svg";
    } else {
        img.src = "assets/menuIcon.svg";
    }
}

function youtube() {
    const APIKey = 'AIzaSyD3pyuVTBUJJ20nRHhCxa4AhD1VL4gcFuE';
    const Userid = 'UCsDUR3maxEMihNFGBKOmHLA';
    const subscriberCount= document.getElementById('subscriberCount');
    const viewCount = document.getElementById('viewCount');
    const videoCount = document.getElementById('videoCount');

    let getdata = () => {
        fetch(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${Userid}&key=${APIKey}`)
        .then(response => {
            return response.json()
        })
        .then(data => {
            console.log(data);
            subscriberCount.innerHTML = data["items"][0].statistics.subscriberCount;
            viewCount.innerHTML = data["items"][0].statistics.viewCount;
            videoCount.innerHTML = data["items"][0].statistics.videoCount;
            
        })
    }
    getdata();
}

window.onload = function() {
    youtube();
};

function redirection() {
  const pageinfo = document.getElementById("pageinfo");
  if (window.location.pathname === "/home") {
    document.body.style.overflow = "hidden";
    document.title = "Redirecting...";
    pageinfo.innerText = "Redirecting";
    pageinfo.style.fontSize = "50px";
    window.location.replace("/");
      
  } else if (window.location.pathname === "/support") {
    document.body.style.overflow = "hidden";
    document.title = "Redirecting...";
    pageinfo.innerText = "Redirecting";
    pageinfo.style.fontSize = "50px";
    window.location.replace("https://buymeacoffee.com/itsmarwan");
      
  } else if (window.location.pathname === "/discord") {
    document.body.style.overflow = "hidden";
    document.title = "Redirecting...";
    pageinfo.innerText = "Redirecting";
    pageinfo.style.fontSize = "50px";
    window.location.replace("https://discord.gg/Fwd9MgB8Ww");
      
  } else if (window.location.pathname === "/shop/external") {
    document.body.style.overflow = "hidden";
    document.title = "Redirecting...";
    pageinfo.innerText = "Redirecting";
    pageinfo.style.fontSize = "50px";
    window.location.replace("https://buymeacoffee.com/itsmarwan/extras");
  }

  const url = window.location.href;
  const index = url.indexOf("password?=");

  if (index !== -1) {
    const value = decodeURIComponent(url.substring(index + "password?=".length));
    document.title = "Password Page!";
    const pageinfo = document.getElementById("pageinfo");
    pageinfo.innerText = value;
    pagesub.innerText = "You Found a Password! Congrats!";
  }

  function scaleFont() {
    const pageinfo = document.getElementById("pageinfo");
    if (!pageinfo) return;

    const width = window.innerWidth;

    if (width < 400) {
      pageinfo.style.fontSize = "14px";
    } else if (width < 768) {
      pageinfo.style.fontSize = "18px";
    } else {
      pageinfo.style.fontSize = "22px";
    }

    pageinfo.style.visibility = "visible";
    pageinfo.style.opacity = "1";
  }

  window.addEventListener("load", scaleFont);
  window.addEventListener("resize", scaleFont);

}
