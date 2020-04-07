const Music = require('../models/Music');

exports.get = async (req, res, next) => {
  await Music.find({ active: true }).then(musicas => {
    res.status(201).send({ message: musicas });
   }).catch(err => {
     res.status(500).send({
       message: 'Falha ao processar requisiçao: '+err
     })
   });
}

exports.getAll = async (req, res, next) => {
  await Music.find().then(musicas => {
    res.status(201).send({ message: musicas });
   }).catch(err => {
     res.status(500).send({
       message: 'Falha ao processar requisiçao: '+err
     })
   });
}

exports.getById = async (req, res, next) => {
  await Music.findById({ _id: req.params.id, active: true }, 'name author album url').then(musicas => {
   res.status(201).send({ message: musicas });
  }).catch(err => {
    res.status(500).send({
      message: 'Falha ao processar requisiçao: '+err
    })
  });
}

exports.getAuthorById = async (req, res, next) => {
  await Music.find({"author._id": req.params.id, active: true}, 'name album author url').then(musicas => {
    res.status(200).send(musicas);
  }).catch(err => {
    res.status(500).send({
      message: 'Falha ao processar requisiçao: '+err
    })
  });
}

exports.getAlbumById = async (req, res, next) => {
  await Music.find({"album._id": req.params.id}, 'name album author url').then(musicas => {
    res.status(200).send(musicas);
  }).catch(err => {
    res.status(500).send({
      message: 'Falha ao processar requisiçao: '+err
    })
  });
}

exports.put = async (req, res, next) => {
  await Music.findByIdAndUpdate( { _id: req.params.id }, {
    $set: {
      name: req.body.name,
      url: req.body.url,
      active: req.body.active
    }
  }).then((data) => {
    res.status(200).send({
      message: 'Novos dados: '+data
    });
  }).catch(err => {
    res.status(500).send({
      message: 'Falha ao processar requisição: '+err
    });
  });
}

exports.delete = async (req, res, next) => {
  await Music.findOneAndRemove({ _id: req.params.id }).then(() => {
    res.status(200).send({
      message: 'Música removida'
    });
  }).catch(err => {
    res.status(500).send({
      message: 'Falha ao processar requisição: '+err
    });
  });
}

exports.post = async (req, res, next) => {
  var erros = [];

    if(!req.body.name || typeof req.body.name == null || req.body.name == undefined) {
      erros.push({texto: 'Nome inválido'});
    }

    if(!req.body.author.name || typeof req.body.author.name == null || req.body.author.name == undefined) {
      erros.push({texto: 'Autor inválido'});
    }

    if(!req.body.url || typeof req.body.url == null || req.body.url == undefined) {
      erros.push({texto: 'URL inválido'});
    }

    if(erros.length > 0){
      res.status(400).send({
        message: erros
      });
    } else {
      var author_info;
      var album_info;

      await Music.findOne( {"author.name":req.body.author.name} ).then((info) => {
        author_info = info;
      });

      await Music.findOne( {"album.name":req.body.album.name} ).then((info) => {
        album_info = info;
      });

      await new Music({
        name: req.body.name,
        author: (author_info == null ? req.body.author : author_info.get('author')),
        album: (album_info == null ? req.body.album : album_info.get('album')),
        url: req.body.url
      }).save().then(() => {
        res.status(201).send({
          message: req.body.name.toUpperCase()+' de '+req.body.author.name.toUpperCase()+' adicionado'
        });
      }).catch(err => {
        res.status(500).send({
          message: 'Falha ao processar requisição: '+err
        });
      });
    }
}