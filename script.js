console.log("Welcome to Musify");
let songIndex = 0;
let audioElement = new Audio("allsongs/song-1.mp3");
let previous = document.getElementById("previous");
let masterPlay = document.getElementById("masterPlay");
let forward = document.getElementById("forward");
let progressBar = document.getElementById("progressBar");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("masterSongName");
let songCover = document.getElementById("songCover");
let songList = Array.from(document.getElementsByClassName("songList")); 
let songListPlay =Array.from (document.getElementsByClassName("songListPlay"));
let listSongCover = document.getElementsByClassName("listSongCover");
let songName = document.getElementsByClassName("songName");
let songListButton = Array.from(document.getElementsByClassName("songListButton"));


// console.log(songListPlay);
let songs = [
    {songName: "Tu Mileya - Darshan Raval", filePath: "allsongs/song-1.mp3", coverPath: "songCovers/cover-1.jpeg"},
    {songName: "Hai apna dill to awara - Soogum Sookha", filePath: "allsongs/song-2.mp3", coverPath: "songCovers/cover-2.jpeg"},
    {songName: "Dill - Ek Villain Returns", filePath: "allsongs/song-3.mp3", coverPath: "songCovers/cover-3.jpeg"},
    {songName: "Haule Haule - Rab ne bna di jori", filePath: "allsongs/song-4.mp3", coverPath: "songCovers/cover-4.jpeg"},
    {songName: "Main doondne - Arijit Singh", filePath: "allsongs/song-5.mp3", coverPath: "songCovers/cover-5.jpeg"},
    {songName: "Introduction - Faris Shafi", filePath: "allsongs/song-6.mp3", coverPath: "songCovers/cover-6.jpeg"},
    {songName: "Kahani - Kaifi Khalil", filePath: "allsongs/song-7.mp3", coverPath: "songCovers/cover-7.jpeg"},
    {songName: "Love me - Ellie Goulding", filePath: "allsongs/song-8.mp3", coverPath: "songCovers/cover-8.jpeg"},
    {songName: "Obsessed - Riar Saab", filePath: "allsongs/song-9.mp3", coverPath: "songCovers/cover-9.jpeg"},
    {songName: "Yaar ka sataya hua hai - B Praak", filePath: "allsongs/song-10.mp3", coverPath: "songCovers/cover-10.jpeg"},
]

songList.forEach(myFunction);
function myFunction(element, i){ 
    listSongCover[i].src = songs[i].coverPath; 
    songName[i].innerText = songs[i].songName; 
}
// Master Play

masterPlay.addEventListener("click", ()=>{
    if (audioElement.currentTime <= 0 || audioElement.paused){
        audioElement.play();
        songListPlay[songIndex].classList.remove("fa-play");
        songListPlay[songIndex].classList.add("fa-pause");
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");
        gif.style.opacity = 1;
        bgGray();
    } else{
        audioElement.pause();
        masterPlay.classList.remove("fa-circle-pause");
        masterPlay.classList.add("fa-circle-play");
        gif.style.opacity = 0;
        makeAllPlays();
        resetBg();
    }
    
})
// progressBar

audioElement.addEventListener("timeupdate", ()=>{
    progress = parseInt((audioElement.currentTime / audioElement.duration)*100);
    progressBar.value = progress;
})

progressBar.addEventListener("change", ()=>{
    audioElement.currentTime = (progressBar.value*audioElement.duration)/100;
})

// songListPlay
// function makeAllPlays(){
//     songListPlay.forEach((element)=>{
//     element.classList.remove("fa-play");
//     element.classList.add("fa-pause");
//     })
//     }

// songListButton.forEach((element)=>{
//     element.addEventListener("click", (e)=>{
//         makeAllPlays();
//         console.log(e.target.songListPlay);
//         e.target.songListPlay.classList.remove("fa-play");
//         e.target.songListPlay.classList.add("fa-pause");
//     })
// })

// makeAllPlays

const makeAllPlays = ()=>{
    songListPlay.forEach((element)=>{
        element.classList.remove('fa-pause');
        element.classList.add('fa-play');
    })
}

function bgGray(){
songList[songIndex].classList.add("gray");
songListButton[songIndex].classList.add("blueButton");
}
function resetBg(){
    songList.forEach((element)=>{
        element.classList.remove('gray');
    })
    songListButton.forEach((element)=>{
        element.classList.remove("blueButton");
    })
   
}

songListPlay.forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        if (audioElement.currentTime <= 0 || audioElement.paused){
            makeAllPlays();
            songIndex = parseInt(e.target.id);
            e.target.classList.remove('fa-play');
            e.target.classList.add('fa-pause');
            audioElement.src = `allsongs/song-${songIndex+1}.mp3`;
            masterSongName.innerText = songs[songIndex].songName;
            songCover.src = songs[songIndex].coverPath;
            audioElement.currentTime = 0;
        
            audioElement.play();
            gif.style.opacity = 1;
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
            bgGray();
        } else{
            makeAllPlays();
            // songIndex = parseInt(e.target.id);
            // e.target.classList.remove('fa-play');
            // e.target.classList.add('fa-pause');
            // audioElement.src = `allsongs/song-${songIndex+1}.mp3`;
            // masterSongName.innerText = songs[songIndex].songName;
            // songCover.src = songs[songIndex].coverPath;
            // audioElement.currentTime = 0;
            resetBg();
            audioElement.pause();
            gif.style.opacity = 0;
            masterPlay.classList.remove('fa-circle-pause');
            masterPlay.classList.add('fa-circle-play');
        }
       
 } )
})

// previous

previous.addEventListener("click", ()=>{
    if(songIndex == 0){
        songIndex = 9;
    } else{
        songIndex -= 1;
    }
    makeAllPlays();
    resetBg();
    bgGray();
    songListPlay[songIndex].classList.remove("fa-play");
    songListPlay[songIndex].classList.add("fa-pause");
    audioElement.src = `allsongs/song-${songIndex+1}.mp3`;
    // console.log(songIndex)
    masterSongName.innerText = songs[songIndex].songName;
    songCover.src = songs[songIndex].coverPath;
    audioElement.currentTime = 0;

    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})

// forward

forward.addEventListener("click", ()=>{
    if(songIndex == 9){
        songIndex = 0;
    } else{
        songIndex += 1;
    }
    makeAllPlays();
    resetBg();
    bgGray();
    songListPlay[songIndex].classList.remove("fa-play");
    songListPlay[songIndex].classList.add("fa-pause");
    audioElement.src = `allsongs/song-${songIndex+1}.mp3`;
    // console.log(songIndex)
    masterSongName.innerText = songs[songIndex].songName;
    songCover.src = songs[songIndex].coverPath;
    audioElement.currentTime = 0;

    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})

