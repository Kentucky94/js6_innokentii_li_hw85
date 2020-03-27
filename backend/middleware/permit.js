const permit = (...roles) => {
  return (req, res, next) => {
    const user = req.user;

    if(!user) return res.status(401).send({message: 'Unidentified'});

    if(!roles.includes(user.role)){
      return res.status(403).send({message: 'Unauthorized'});
    }
    next();
  }
};

module.exports = permit;