function User(user) {
    User.active = user;
};

User.active = null;
User._type = null;
User._last = null;

User.type = function(type) {
    User._last = User._type;
    User._type = type;
};
