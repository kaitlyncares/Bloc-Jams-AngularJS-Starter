(function (){
  function AlbumCtrl(){
      this.albumData = fixtures
  }

  angular
    .module('blocJams')
    .controller('AlbumCtrl', AlbumCtrl);
}) ();
