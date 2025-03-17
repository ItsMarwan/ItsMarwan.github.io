function toggleMenuIcon(button) {
    const img = button.querySelector("img");
    if (img.src.includes("menuIcon.svg")) {
        img.src = "assets/close.svg";
    } else {
        img.src = "assets/menuIcon.svg";
    }
}

function youtube() {
    const APIKey = 'AIzaSyDJwSN96hw_-N3P6FZ32cC1CeGQnMd2im4';
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
