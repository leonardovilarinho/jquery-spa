function Session() {};


Session.set = function(key, value) {
    sessionStorage.setItem(key, value);
};

Session.get = function(key) {
    return sessionStorage.getItem(key);
};

Session.has = function(key) {
    if (sessionStorage.getItem(key) === null)
        return false;
    return true;
};

Session.destroy = function(key) {
    sessionStorage.removeItem(key);
}

Session.clear = function() {
    sessionStorage.clear();
}
