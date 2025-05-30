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
    
    const subscriberCount = document.getElementById('subscriberCount');
    const viewCount = document.getElementById('viewCount');
    const videoCount = document.getElementById('videoCount');

    fetch(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${Userid}&key=${APIKey}`)
        .then(response => response.json())
        .then(data => {
            const stats = data.items[0].statistics;

            if (subscriberCount) {
                subscriberCount.innerHTML = stats.subscriberCount;
            }
            if (viewCount) {
                viewCount.innerHTML = stats.viewCount;
            }
            if (videoCount) {
                videoCount.innerHTML = stats.videoCount;
            }
        });
}

window.onload = youtube;
