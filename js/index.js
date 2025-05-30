function toggleMenuIcon(button) {
    const img = button.querySelector("img");
    if (img.src.includes("menuIcon.svg")) {
        img.src = "assets/close.svg";
    } else {
        img.src = "assets/menuIcon.svg";
    }
}

document.addEventListener("DOMContentLoaded", () => {
  const subscriberCount = document.getElementById('subscriberCount');
  const viewCount = document.getElementById('viewCount');
  const videoCount = document.getElementById('videoCount');

  if (!subscriberCount || !viewCount || !videoCount) {
    console.error('One or more elements not found in the DOM');
    return;
  }

  const APIKey = 'AIzaSyD3pyuVTBUJJ20nRHhCxa4AhD1VL4gcFuE';
  const Userid = 'UCsDUR3maxEMihNFGBKOmHLA';

  fetch(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${Userid}&key=${APIKey}`)
    .then(response => response.json())
    .then(data => {
      if (!data.items || data.items.length === 0) {
        console.error('No channel data found');
        return;
      }
      subscriberCount.textContent = data.items[0].statistics.subscriberCount;
      viewCount.textContent = data.items[0].statistics.viewCount;
      videoCount.textContent = data.items[0].statistics.videoCount;
    })
    .catch(error => {
      console.error('Error fetching YouTube API:', error);
    });
});
