module.exports = {
  protegerRuta: function(to, from, next) {
    return localStorage.getItem('admin-login') ? next() : next(`/login/`);
  },
};
