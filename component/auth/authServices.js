/*const User = require('../../models/schema/User');

exports.findUser = (req, res) => {
    if (req.query.id) {
        User.findById(req.query.id)
            .then(data => {
                if (!data)
                    res.status(400).send({message : "Not found user with id " + id});
                else
                    res.send(data);
            })
            .catch(err => {
                res.status(500).send({message : "Error retrieving user with id " + id});
            })
    } else {
        User.findOne()
    }
}*/