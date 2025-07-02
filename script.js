//getting songs
var folder;
var songs;
function convertSecondsToTime(seconds) {
  // Ensure seconds are a whole number
  seconds = Math.floor(seconds);
  
  // Calculate minutes and remaining seconds
  let minutes = Math.floor(seconds / 60);
  let remainingSeconds = seconds % 60;
  
  // Ensure two digits for both minutes and seconds
  let formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  let formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
  
  return `${formattedMinutes}:${formattedSeconds}`;
}



async function getsongs(folder="english") {
  window.folder=folder
  let websong = await fetch(`songs/${folder}/songs.json`);
  let response = await websong.json();


  songs = response.filter(song => song.endsWith(".mp3")).map(song => `songs/${folder}/${song}`);


  
  let ol = document.querySelector(".songlist");
  ol.innerHTML=""
  for (let song of songs) {
    ol.innerHTML =
      ol.innerHTML +
      `<li>
            <img src="assets/music.svg" alt="">
            <div class="sinfo">
                <div class="sname">${decodeURI(song).split("/").pop()}</div>
                <div class="artist">Amie</div>
            </div>
            <img src="assets/blackplay.svg" alt="">
        </li>`;
  }

  Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e=>{
    e.addEventListener("click",()=>{
        playmusic(e.querySelector(".sname").innerHTML)
    })
  })
  return songs;
}

var currentsong= new Audio()
const playmusic=(song)=>{
            currentsong.src=`songs/${folder}/${song.replace("amp;","")}`
            currentsong.play()
            console.log(currentsong);
            let curplay=document.querySelector(".songinfo")
            curplay.innerHTML=decodeURI(song)
            play.src="assets/pause.svg"
}
async function main() {
  //getting list of songs
  songs = await getsongs();
  english.addEventListener("click",async()=>{
    
    songs = await getsongs("english");
    document.querySelector(".left").style.display = "block";
    
  })
  hindi.addEventListener("click",async()=>{
    songs = await getsongs("hindi");
    document.querySelector(".left").style.display = "block";

    
  })
  kannada.addEventListener("click",async()=>{
    songs = await getsongs("kannada");
    document.querySelector(".left").style.display = "block";
  })
  document.querySelector(".ham").addEventListener("click", () => {
    const leftElement = document.querySelector(".left");

    // Check the current display property
    if (leftElement.style.display === "none" || leftElement.style.display === "") {
        // Set display to block if it's currently none
        leftElement.style.display = "block";
    } else {
        // Set display to none if it's currently block
        leftElement.style.display = "none";
    }
});
document.querySelector(".plus").addEventListener("click",()=>{
  if(window.innerWidth <= 1300){
  document.querySelector(".left").style.display = "none";
}
})

  //LISTING INTO LIBRARY  
  
  play.addEventListener("click",()=>{
    if(!currentsong.src){
      currentsong.src=songs[0]
      let curplay=document.querySelector(".songinfo")
      curplay.innerHTML=decodeURI(songs[0]).split(`songs/${folder}/`)[1]
    }
    if(currentsong.paused)
      {currentsong.play()
        play.src="assets/pause.svg"
      }
      else
      {
      currentsong.pause()
      play.src="assets/blackplay.svg"
      }
  })
currentsong.addEventListener("timeupdate",()=>{
  document.querySelector(".completed").innerHTML=convertSecondsToTime(currentsong.currentTime)
  document.querySelector(".total").innerHTML=convertSecondsToTime(currentsong.duration)
  document.querySelector(".circle").style.left=(currentsong.currentTime/currentsong.duration)*100 +"%"
  if(currentsong.currentTime==currentsong.duration){
    let index = songs.findIndex(song => currentsong.src.includes(song))
    if(index<songs.length-1){
      playmusic(songs[index+1].split(`songs/${folder}/`)[1])
    }
  }
})

document.querySelector(".durbar").addEventListener("click",e=>{
  let percentage=(e.offsetX/e.target.getBoundingClientRect().width)*100
  document.querySelector(".circle").style.left=percentage+"%"
  currentsong.currentTime= (currentsong.duration*percentage)/100
})
prev.addEventListener("click",()=>{
  let index = songs.findIndex(song => currentsong.src.includes(song))
  if(index>0){
    playmusic(songs[index-1].split(`songs/${folder}/`)[1])
  }
  else
  currentsong.currentTime=0
})
next.addEventListener("click",()=>{
 let index = songs.findIndex(song => currentsong.src.includes(song))
  if(index<songs.length-1){
    playmusic(songs[index+1].split(`songs/${folder}/`)[1])
  }
})
document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change",e=>{
  currentsong.volume=parseInt(e.target.value)/100
})


let vol=document.querySelector(".volume").getElementsByTagName("img")[0]
vol.addEventListener("click",()=>{
  if(vol.src.match("mute")){
    vol.src="assets/volume.svg"
    document.querySelector(".range").getElementsByTagName("input")[0].value=0
    currentsong.volume=0
  }
  else{
    vol.src="assets/mute.svg"
    currentsong.volume=0.2
    document.querySelector(".range").getElementsByTagName("input")[0].value=20
  }
  
})


}
main();
