var UserProfile = (function() {

    var setId = function(uid) {
      localStorage.setItem('id',uid);    
    };
      
    var getId = function() {
      return localStorage.getItem('id');
    };
  

    var get_search = function() {
        return localStorage.getItem('search');
    };
    
    var set_search = function(val) {
        var search = get_search();
        if(search){
          search = search + "," + val;
        }
        else{
          search = val;
        }
        localStorage.setItem('search', search)
    };

    return {
      getId: getId,
      setId: setId,
      get_search: get_search,
      set_search: set_search
    }
  
  })();
  
  export default UserProfile;