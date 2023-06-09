const container = document.querySelector(".container");
const image = document.querySelector("#music-image");
const audio = document.querySelector("#audio");
const title= document.querySelector("#music-details .title");
const singer = document.querySelector("#music-details .singer");
const prev = document.querySelector("#controls #prev");
const play = document.querySelector("#controls #play");
const next = document.querySelector("#controls #next");
const duration = document.querySelector(".times #duration");
const currentTime = document.querySelector(".times #current-time");
const progressBar = document.querySelector("#progress-bar");
const volume = document.querySelector("#volume");
const volumeBar=  document.querySelector("#volume-bar");
const ul = document.querySelector("ul");


const player = new Musicplayer(musicList);


window.addEventListener("load",()=>{
    let music = player.getMusic();
    displayMusic(music);
    displayMusicList(player.musicList);
    isPlayMusic();
});

function displayMusic(music){       
    title.innerText = music.getName();
    singer.innerText = music.singer;
    image.src = "img/"+music.img;
    audio.src = "mp3/"+music.file;
}
play.addEventListener("click",()=>{
    const isMusicPlay = container.classList.contains("playing");
    // isMusicPlay ? pauseMusic() : playMusic();
    if (isMusicPlay) {
        pauseMusic();
    }
    else{
        playMusic();
    }
});


next.addEventListener("click",()=>{
    nextMusic();
});


prev.addEventListener("click",()=>{
    prevMusic();
});



function nextMusic() {
    player.next();
    let music = player.getMusic();
    displayMusic(music);
    playMusic();
    isPlayMusic();
    
}


function prevMusic() {
    player.previous();
    let music = player.getMusic();
    displayMusic(music);
    playMusic();    
    isPlayMusic();   
}


function playMusic(){
    container.classList.add("playing");
    play.querySelector("i").classList = "fa-solid fa-pause";
    audio.play();
    
}

function pauseMusic(){
    container.classList.remove("playing");
    play.querySelector("i").classList = "fa-solid fa-play";
    audio.pause();
}

const calculateTimes = (toplamSaniye)=>{
    const dakika = Math.floor(toplamSaniye / 60);
    const saniye = Math.floor(toplamSaniye % 60);
    const guncellenenSaniye = toplamSaniye<10 ? `0${saniye}`: `${saniye}`;
    const sonuc = `${dakika}:${guncellenenSaniye}`;
    return sonuc;
};

audio.addEventListener("loadedmetadata",()=>{
    duration.textContent = calculateTimes(audio.duration);
    progressBar.max = Math.floor(audio.duration);
});

audio.addEventListener("timeupdate",()=>{
    progressBar.value = Math.floor(audio.currentTime);
    progressBar.textContent = calculateTimes(progressBar.value);
    currentTime.textContent = calculateTimes(progressBar.value);
   
});

progressBar.addEventListener("input",()=>{
    currentTime.textContent = calculateTimes(progressBar.value);
    audio.currentTime = progressBar.value;
});

volumeBar.addEventListener("input",(e)=>{// burada "e" harfi windows formdaki gibi event listesini getirir.
    const value = e.target.value;
    audio.volume = value / 100;
    if (value == 0) {
        audio.muted = true;
        sesDurumu="sessiz";
        volume.classList="fa-solid fa-volume-xmark";
    }
    else{
        audio.muted=false;
        sesDurumu="sesli";
        volume.classList="fa-solid fa-volume-high";
    }
});

let sesDurumu = "sesli";
volume.addEventListener("click",()=>{
    if (sesDurumu==="sesli") {
        audio.muted = true;
        sesDurumu="sessiz";
        volume.classList="fa-solid fa-volume-xmark";
        volumeBar.value=0;
    }
    else{
        audio.muted=false;
        sesDurumu="sesli";
        volume.classList="fa-solid fa-volume-high";
        volumeBar.value = 100;
    }
});


const displayMusicList = (list) =>{
    for (let i = 0; i < list.length; i++) {
        let liTag = `
            <li li-index="${i}" onclick="selectedMusic(this)" class="list-group-item d-flex justify-content-between align-items-center">
                <span>${list[i].getName()}</span>
                <span id="music-${i}" class="badge bg-primary rounded-pill"></span>
                <audio class="music-${i}" src = "mp3/${list[i].file}"></audio>
            </li>
            `    

            ul.insertAdjacentHTML("beforeend",liTag);

            let liAudioDuration = ul.querySelector(`#music-${i}`);
            let liAudioTag = ul.querySelector(`.music-${i}`);
            liAudioTag.addEventListener("loadeddata",()=>{
                liAudioDuration.innerText = calculateTimes(liAudioTag.duration);
            });
    }
}

const selectedMusic = (li)=>{
    const index = li.getAttribute("li-index");
    player.index = index;
    displayMusic(player.getMusic());
    playMusic();
    isPlayMusic();

}

const isPlayMusic = ()=>{
    for (let li of ul.querySelectorAll("li")) {
        if (li.classList.contains("playing")) {
            li.classList.remove("playing");
        }
        if (player.index == li.getAttribute("li-index")) {
            li.classList.add("playing");
        }
    }
}

audio.addEventListener("ended",()=>{
    nextMusic();
});
//Muhammet Eren YILMAZ