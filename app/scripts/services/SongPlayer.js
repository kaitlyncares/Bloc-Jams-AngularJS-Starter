

(function () {
  function SongPlayer($rootScope, Fixtures){
    var SongPlayer = {};

    /**
@desc stores album info
@type {object}
    */
    var currentAlbum = Fixtures.getAlbum();


    /**
* @desc Buzz object audio file
* @type {Object}
*/

    var currentBuzzObject = null;


    /**
    * @function setSong
    * @desc Stops currently playing song and loads new audio file as currentBuzzObject
    * @param {Object} song
    */
    var setSong = function(song) {
        if (currentBuzzObject) {
            currentBuzzObject.stop();
            SongPlayer.currentSong.playing = null;
        }

        currentBuzzObject = new buzz.sound(song.audioUrl, {
            formats: ['mp3'],
            preload: true
        });

        currentBuzzObject.bind('timeupdate', function (){
            $rootScope.$apply(function() {
                SongPlayer.currentTime = currentBuzzObject.getTime();
            });
        });

        SongPlayer.currentSong = song;
     };
/**
@function playSong
@desc plays audio file of currentBuzzObject and changes status to playing
@param {object} song
*/
     var playSong = function(song) {
       currentBuzzObject.play();
       song.playing = true;
     };
/**
@function stopSong
@desc stops audio file of currentBuzzObject
@param {object} song
*/
     var stopSong = function(song) {
       currentBuzzObject.stop();
       song.playing = null;
     };
/**
@function getSongIndex
@desc gets index of the chosen sing from the array on the current Album
@param {object} song
*/
     var getSongIndex = function(song) {
        return currentAlbum.songs.indexOf(song);
     };
 /**
 @desc audio file currently playing
 @type {object}
 */
     SongPlayer.currentSong = null;
/**
@desc current playback time (in seconds) of currently playing song
@type {number}
*/
    SongPlayer.currentTime = null;


/**
@function SongPlayer.play
@desc plays new song or plays paused song
@param {object} song
*/
    SongPlayer.play = function(song) {
        song = song || SongPlayer.currentSong;
        if (SongPlayer.currentSong !== song) {
            setSong(song);
            playSong(song);
        } else if (SongPlayer.currentSong === song) {
            if (currentBuzzObject.isPaused()) {
                playSong(song);
            }
        }
    };

    /**
    @function SongPlayer.pause
    @desc pauses currently playing song and changes status to paused
    @param {object} song
    */
      SongPlayer.pause = function(song) {
        song = song || SongPlayer.currentSong;
       currentBuzzObject.pause();
       song.playing = false;
   };
/**
@function SongPlayer.previous
@desc stops current song playing and returns to previous song. will stop if there is no previous song.
@param {object} song
*/
    SongPlayer.previous = function() {
        var currentSongIndex = getSongIndex(SongPlayer.currentSong);
          currentSongIndex--;

        if (currentSongIndex < 0) {
          stopSong(SongPlayer.currentSong);
      } else {
          var song = currentAlbum.songs[currentSongIndex];
          setSong(song);
          playSong(song);
      }
  };
/**
@function SongPlayer.next
@desc stops current song playing and advances to next song. will stop if there are no songs to advance to.
@param {object} song
*/
  SongPlayer.next = function() {
    var currentSongIndex = getSongIndex(SongPlayer.currentSong);
    currentSongIndex++;

    if(currentSongIndex > currentAlbum.songs.length -1 ){
      stopSong(SongPlayer.currentSong);
    }else{
      var song = currentAlbum.songs[currentSongIndex];
      setSong(song);
      playSong(song);
    }
  };

/**
* @function setCurrentTime
* @desc  Set current time (in seconds) of currently playing song
* @param {number} time*/

  SongPlayer.setCurrentTime = function(time){
      if (currentBuzzObject) {
          currentBuzzObject.setTime(time);
      }
  };

    return SongPlayer;
  }

  angular
      .module('blocJams')
      .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();
