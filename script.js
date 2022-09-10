
let musicNames = ["	A Chit So Dar-အချစ်ဆိုတာ-Khin Maung Toe.mp3	",
    "	A Chit Yaw Gar-အချစ်ရောကါ.mp3	",
    "	Ayin Lo Bawa Myo Yout Chin Tal-အရင်လိုဘ၀မျိုးရောက် ခြင်တယ်-Nang	",
    "	Barmiton-ဘာမီတွန်-Shwe Htoo.mp3	",
    "	Chit Thu Pya Ta Nar-ချစ်သူပြသနာ-Shwe Htoo.mp3	",
    "	Chit Thu Thi Say-ချစ်သူသိစေ-Khin Maung Toe.mp3	",
    "	December Nya -ဒီဇင်ဘာည-Lin Nat.mp3	",
    "	Ka Byar Ma Pi Sar Ma Pi-ကဗျာမမီ စာမပီ-San Lin.mp3	",
    "	Kar Yan Lay-ကာရန်လေး-Myo Kyawt Myaing.mp3	",
    "	Kaut Tay-ကောက်တေး-Bunny Phyo.mp3	",
    "	Kya Naw Hnint A Nu Pa Nyar-ကျွန်တောင်နှင့်အနုပညာ-Wai La.mp3	",
    "	Lan Khwal Yan A Thint-လမ်းခွဲရန်အသငိ့-Wai La.mp3	",
    "	Lann Mha Gyee Yey Bey -လမ်းမကြီးရဲ့ဘေး-Wine Suu Khine Thein.mp3	",
    "	Lat Saung လက်ဆောင်-Shwe Htoo.mp3	",
    "	Lay Htal Ka Aim-လေထဲကအိမ်-Bunny Phyo.mp3	",
    "	Lwan-လွမ်း-Khin Maung Toe.mp3	",
    "	Mario- -Ni Ni Khin Zaw.mp3	",
    "	Medusa-မယ်ဒူစာ-Shwe Htoo.mp3	",
    "	Ngr Mhan Tan-ငါမှန်တယ်-Shwe Htoo.mp3	",
    "	Pin Lal Pon Pyin-ပင်လယ်ပုံပြင်-Wai La.mp3	",
    "	Sate Ta Za Hospital-စိတ်တဇဆေးရုံ-Shwe Htoo.mp3	",
    "	Sit Ku Yin Sar Oak-စိတ်ကူးယဉ်စာအုပ်-Shwe Htoo.mp3	",
    "	Swal Arr-ဆွဲအား-Mar Rizz.mp3	",
    "	Tagar Pwint Htar Pr Tal-တံခါးဖွင့်ထားပါတယ်-Shwe Htoo.mp3	",
    "	Tsaw Ra Ai Tsaw Hkrup Sai- -Ann Naw.mp3	",
    "	Yee Zarr Sar-ရည်းစားစာ-Sai Sai Kham Hlaing.mp3	",
    "	You Belong With Me- -Taylor Swift.mp3	"
]

let tracks = [

];
let musicArray = {};
for (let i = 0; i < musicNames.length; i++) {
    let musicNameSplit = musicNames[i].split("-");
    let SingerTitle = musicNameSplit[2];
    musicArray = { Id: 5, trackPatch: `music/${musicNames[i]}`, title: `${musicNameSplit[0]}-${musicNameSplit[1]}`, Singer: `${SingerTitle}` };
    tracks.push(musicArray);
}
const musicContainer = document.querySelector(".musicContainer");
const audioPlay = document.querySelector("#audioPlay");
const durationAndCurrentTime = document.querySelector(".durationAndCurrentTime");
const musicProgress = document.querySelector(".musicProgress");
const playingTitle = document.querySelector(".playingTitle");
const playBtn = document.querySelector(".playBtn");
const previousBtn = document.querySelector(".previousBtn");
const pauseBtn = document.querySelector(".pauseBtn");
const nextBtn = document.querySelector(".nextBtn");
const searchResult = document.querySelector(".searchResult");
const searchInput = document.querySelector(".searchInput");
const searchInputContainer = document.querySelector(".searchInputContainer");
const playingImg = document.querySelector(".playingImg");
const footer = document.querySelector("footer");
const musicBody = document.querySelector(".musicBody");

let isPlaying = false;
const songPlay = () => {
    audioPlay.src = tracks[playingIndex].trackPatch;
    audioPlay.play();
    updatePlayAndPauseBtn();
    playingTitle.innerHTML = tracks[playingIndex].title;
}
const createMinAndSecText = (s) => {
    const min = Math.floor(s / 60);
    const sec = s % 60;
    const minText = min < 10 ? "0" + min.toString() : min.toString();
    const secText = sec < 10 ? "0" + sec.toString() : sec.toString();
    return minText + ":" + secText;
}
const updatePlayAndPauseBtn = () => {
    if (isPlaying) {
        playBtn.style.display = "none";
        pauseBtn.style.display = "inline"
        playingImg.style.animationName = "circle";
    }
    if (!isPlaying) {
        playBtn.style.display = "inline";
        pauseBtn.style.display = "none"
        playingImg.style.animationName = "";
    }
}
for (let i = 0; i < tracks.length; i++) {
    const trackTag = document.createElement("div");
    trackTag.addEventListener("click", () => {
        audioPlay.src = tracks[i].trackPatch;
        audioPlay.play();
        isPlaying = true;
        playingTitle.innerHTML = tracks[i].title
        updatePlayAndPauseBtn();
        playingIndex = i;
    });
    trackTag.classList.add("col-md-2");
    // const title = (i + 1).toString() + "." + tracks[i].title;
    trackTag.innerHTML = `
    <div class="position-relative musicPhoto">
            <img src="https://bit.ly/3meBBYg" class="w-100" alt="">
            <div class="position-absolute bottom-0 text-dark musicImgPlayIcon"><i class="fa-solid text-white fa-circle-play fs-3 mt-1"></i></div>
            </div>
            <div class="musicName">${tracks[i].title}</div>
    `
    musicContainer.append(trackTag);
}

let durationText = "00:00";
let duration = "";
audioPlay.addEventListener("loadeddata", () => {
    duration = Math.floor(audioPlay.duration)
    durationText = createMinAndSecText(duration);
});
audioPlay.addEventListener("timeupdate", () => {
    currentTime = Math.floor(audioPlay.currentTime);
    currentTimeText = createMinAndSecText(currentTime);
    durationAndCurrentTime.innerHTML = `${currentTimeText} | ${durationText}`;
    const progress = 300 / duration;
    musicProgress.style.width = `${progress* currentTime}px`;
    let result = "n/a"
    
    if (duration === currentTime) {
        playingIndex+=1
        songPlay();
    }
    
})

let playingIndex = 0;
playBtn.addEventListener("click", () => {
    currentTime = Math.floor(audioPlay.currentTime);
    if (currentTime === 0) {
        audioPlay.src = tracks[playingIndex].trackPatch;
        playingTitle.innerHTML = tracks[playingIndex].title;
        audioPlay.play();
        isPlaying = true;
        updatePlayAndPauseBtn();

    } else {
        audioPlay.play();
        isPlaying = true;
        updatePlayAndPauseBtn();
    }
});
pauseBtn.addEventListener("click", () => {
    audioPlay.pause();
    isPlaying = false;
    updatePlayAndPauseBtn();
})
previousBtn.addEventListener("click", () => {
    if (playingIndex === 0) {
        return;
    } else {
        playingIndex -= 1;
        songPlay()
    }
})
nextBtn.addEventListener("click", () => {
    if (playingIndex === tracks.length - 1) {
        return;
    } else {
        playingIndex += 1;
        songPlay();
    }
})

searchResult.addEventListener("mouseout", () => {

})
searchResultList = document.querySelector(".searchResultList")
searchResult.style.top = `${searchInputContainer.offsetHeight}px`;
searchInput.addEventListener("keyup", () => {


    searchFunction();
})
searchInput.addEventListener("click", () => {
    searchFunction();
})
const searchFunction = () => {
    searchResult.innerHTML = ""
    const searchText = event.target.value.toLowerCase();
    if (searchText.length > 0) {
        const songSearchResult = tracks.filter(song => {
            return song.title.toLowerCase().includes(searchText);

        });
        if (songSearchResult.length > 0) {
            for (let i = 0; i < songSearchResult.length; i++) {
                const list = document.createElement("li")
                list.addEventListener("click", () => {
                    audioPlay.src = songSearchResult[i].trackPatch;
                    audioPlay.play();
                    isPlaying = true;
                    playingTitle.innerHTML = songSearchResult[i].title
                    updatePlayAndPauseBtn();
                    playingIndex = songSearchResult[i].Id - 1;
                    searchResult.innerHTML = "";
                })
                const title = songSearchResult[i].title;
                list.innerHTML = title;
                searchResult.append(list);
            }
        }
    }
}

// musicBody.style.marginBottom = `${footer.offsetHeight}px`;
const artistBody = document.querySelector(".artistBody");
const section = document.querySelector(".section");
const artistBtn = document.querySelector(".artistBtn");
const homeBtn = document.querySelector(".homeBtn");
const lBtn = document.querySelectorAll(".lBtn");
$(".lBtn").click(function(){
    $(".mainColorBtn").removeClass("mainColorBtn");
    $(this).addClass("mainColorBtn");
    if($(this).hasClass("homeBtn")){
        $('.section').css({"display":"none"});
        $("#homeSection").css({"display":"flex"});
    }
    else if($(this).hasClass("artistBtn")){
        $('.section').css({"display":"none"});
        $("#artistSection").css({"display":"flex"});
    }
    else{
        $('.section').css({"display":"none"});
    }
})

let Singers = [];
for (let i = 0; i < tracks.length; i++) {
    Singers.push(tracks[i].Singer)
}
let uniqueSingers = Singers.filter((c, index) => {
    return Singers.indexOf(c) === index;
})
let list = "";
for (let i = 0; i < uniqueSingers.length; i++) {
    let PureName = uniqueSingers[i].split(".");
    artistBody.innerHTML += `
    <div class="accordion" id="accordionExample">
                    <div class="accordion-item">
                      <h2 class="accordion-header" id="headingTwo">
                        <button class="accordion-button bg-black text-light collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collape${i}" aria-expanded="false" aria-controls="collape${i}">
                          ${PureName[0]}
                        </button>
                      </h2>
                      <div id="collape${i}" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                        <div class="accordion-body bg-black text-light">
                        <ul class="list-group singerSongContainer singerSongContainer${i} bg-black text-light">
                        </ul>
                        </div>
                      </div>
                    </div>
                  </div
            `;
    let uniqueSingersSongs = tracks.filter(element => {
        return element.Singer === uniqueSingers[i];
    })

    try {
        for (let a = 0; a < uniqueSingersSongs.length; a++) {
            const list = document.createElement("li");
            list.classList.add("list-group-item", "text-light");
            list.innerHTML = uniqueSingersSongs[a].title;
            list.setAttribute(`patch`, `${uniqueSingersSongs[a].trackPatch}`)
            document.querySelector(`.singerSongContainer${i}`).append(list);
            $(".list-group-item").click(function () {
                $patch = $(this).attr("patch");
                audioPlay.src = $patch
                audioPlay.play();
                isPlaying = true;
                playingTitle.innerHTML = $(this).html();
                updatePlayAndPauseBtn();
            })
        }
    } catch (error) {
        console.log(error);
    }

}
$(".menuContainer").click(function(){
    if ($(".line-1").hasClass("line-1action")) {
        $(".line-1").removeClass("line-1action");
        $(".line-2").removeClass("line-2action");
        $(".line-3").removeClass("line-3action");
        $(".lsbLabel").css({"display":"none"});
    $(".leftSideBar").css({"width":"50px","align-items":"center"});

    }else{
    $(".line-1").addClass("line-1action");
    $(".line-2").addClass("line-2action");
    $(".line-3").addClass("line-3action");
    $(".lsbLabel").css({"display":"block"});
    $(".leftSideBar").css({"width":"auto","align-items":"flex-start"});
    }

})




