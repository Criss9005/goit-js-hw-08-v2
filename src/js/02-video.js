import Player from '@vimeo/player';
import throttle from 'lodash.throttle'

  const iframe = document.querySelector('iframe');
    const player = new Player(iframe);

    player.on('play', function() {
        console.log('played the video!');
    }); 


player.on('timeupdate', throttle((e) => {
    
    const timeString = JSON.stringify(e)//convierto en string
    localStorage.setItem('videoplayer-current-time', timeString)
    
}),1000)

const currentime = localStorage.getItem("videoplayer-current-time")
console.log(currentime)
const timeObject = JSON.parse(currentime)//convierto el string en objeto


player.setCurrentTime(timeObject.seconds).then(function() {
    // seconds = the actual time that the player seeked to
}).catch(function(error) {
    switch (error.name) {
        case 'RangeError':
            // the time was less than 0 or greater than the video’s duration
            break;

        default:
            // some other error occurred
            break;
    }
});