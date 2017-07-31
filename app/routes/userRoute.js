
module.exports = {

  register: (req, res, next) => {
    res.send(200).data("hello");
  }

}
