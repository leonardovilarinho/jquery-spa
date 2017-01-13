function Local() {};


Local.set = function(key, value) {
    localStorage.setItem(key, value);
};

Local.get = function(key) {
    return localStorage.getItem(key);
};

Local.has = function(key) {
    if (localStorage.getItem(key) === null)
        return false;
    return true;
};

Local.destroy = function(key) {
    localStorage.removeItem(key);
}

Local.clear = function() {
    localStorage.clear();
}
