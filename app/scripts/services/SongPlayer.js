

(function () {
  function SongPlayer(Fixtures){
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
     }
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
@function SongPlayer.play
@desc plays new song or plays paused song
@param {object} song
*/
    SongPlayer.play = function(song) {
        song = song || SongPlayer.currentSong;
        if(SongPlayer.currentSong !== song){
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


    return SongPlayer;
  }

  angular
      .module('blocJams')
      .factory('SongPlayer', ['Fixtures', SongPlayer]);
})();
