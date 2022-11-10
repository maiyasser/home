const home = $('#home');
const course = $('#course');
const homeNav = $('#home-nav');
const courseNav = $('#course-nav');
const sideBar = $('#sideBar');

const getHomePage = (t) => {
    home.show();
    course.hide();
    courseNav.toggleClass('active');
    homeNav.toggleClass('active');
    sideBar.toggleClass('course-side-bar');
}
const getCoursesPage = () => {
    home.hide();
    course.show();
    courseNav.toggleClass('active');
    homeNav.toggleClass('active');
    sideBar.toggleClass('course-side-bar');
    /** video player*/
    // (A) PLAYER INIT
    // (A1) PLAYLIST - CHANGE TO YOUR OWN!
    let playlist = [
        { name: "Video A", src: "1-cat.mp4" },
        { name: "Video B", src: "2-dog.mp4" },
        { name: "Video C", src: "3-cat-dog.mp4" }
    ];

    // (A2) VIDEO PLAYER & GET HTML CONTROLS
    const video = document.getElementById("vVid"),
        vPlay = document.getElementById("vPlay"),
        vPlayIco = document.getElementById("vPlayIco"),
        vNow = document.getElementById("vNow"),
        vTime = document.getElementById("vTime"),
        vSeek = document.getElementById("vSeek"),
        vVolume = document.getElementById("vVolume"),
        vVolIco = document.getElementById("vVolIco"),
        vList = document.getElementById("vList");

    // (A3) BUILD PLAYLIST
    for (let i in playlist) {
        let row = document.createElement("div");
        row.className = "vRow";
        row.innerHTML = playlist[i]["name"];
        row.addEventListener("click", () => { vidPlay(i); });
        playlist[i]["row"] = row;
        vList.appendChild(row);
    }
    // (B) PLAY MECHANISM
    // (B1) FLAGS
    var vidNow = 0, // current video
        vidStart = false, // auto start next video

        // (B2) PLAY SELECTED VIDEO
        vidPlay = (idx, nostart) => {
            vidNow = idx;
            vidStart = nostart ? false : true;
            video.src = playlist[idx]["src"];
            for (let i in playlist) {
                if (i == idx) { playlist[i]["row"].classList.add("now"); }
                else { playlist[i]["row"].classList.remove("now"); }
            }
        };

    // (B3) AUTO START WHEN SUFFICIENTLY BUFFERED
    video.addEventListener("canplay", () => {
        if (vidStart) {
            video.play();
            vidStart = false;
        }
    });

    // (B4) AUTOPLAY NEXT VIDEO IN THE PLAYLIST
    video.addEventListener("ended", () => {
        vidNow++;
        if (vidNow >= playlist.length) { vidNow = 0; }
        vidPlay(vidNow);
    });

    // (B5) INIT SET FIRST VIDEO
    vidPlay(0, true);
    // (C) PLAY/PAUSE BUTTON
    // (C1) AUTO SET PLAY/PAUSE TEXT
    video.addEventListener("play", () => {
        vPlayIco.innerHTML = "pause";
    });
    video.addEventListener("pause", () => {
        vPlayIco.innerHTML = "play_arrow";
    });

    // (C2) CLICK TO PLAY/PAUSE
    vPlay.addEventListener("click", () => {
        if (video.paused) { video.play(); }
        else { video.pause(); }
    });
    // (D) TRACK PROGRESS
    // (D1) SUPPORT FUNCTION - FORMAT HH:MM:SS
    var timeString = (secs) => {
        // HOURS, MINUTES, SECONDS
        let ss = Math.floor(secs),
            hh = Math.floor(ss / 3600),
            mm = Math.floor((ss - (hh * 3600)) / 60);
        ss = ss - (hh * 3600) - (mm * 60);

        // RETURN FORMATTED TIME
        if (hh > 0) { mm = mm < 10 ? "0" + mm : mm; }
        ss = ss < 10 ? "0" + ss : ss;
        return hh > 0 ? `${hh}:${mm}:${ss}` : `${mm}:${ss}`;
    };

    // (D2) INIT SET TRACK TIME
    video.addEventListener("loadedmetadata", () => {
        vNow.innerHTML = timeString(0);
        vTime.innerHTML = timeString(video.duration);
    });

    // (D3) UPDATE TIME ON PLAYING
    video.addEventListener("timeupdate", () => {
        vNow.innerHTML = timeString(video.currentTime);
    });
}
