const express = require('express');
const Heroes  = require('../models/heroes');
const router = express.Router();

router.route('/')
  .get((req,res,next)=>{
    Heroes.find({})
    .then((heroes)=>{
        res.json(heroes);
  }).catch((err) => next(err));
})
.post((req,res,next)=>{
    Heroes.create(req.body)
         .then((heroes)=> { 
             res.statusCode =201;
             res.json(heroes);
}).catch(next);
})
.put((req,res,next)=>{
    res.statusCode = 405;
    res.send("Method not supported");

})
  .delete((req,res,next)=>{
    Heroes.deleteMany({})
    .then((heroes)=>{
        res.json(heroes);
}).catch(next);
});

router.route('/:id')
 .get((req,res,next)=>{
    Heroes.findById(req.params.id)
    .then((heroes)=>{
        res.json(heroes);
    }).catch(next);
 })
 .post((req,res,next)=>{
    res.statusCode = 405;
    res.send("Method not supported");
 })
.put((req,res,next)=>{
    Heroes.findByIdAndUpdate(req.params.id,{$set:  req.body},{new: true})
   .then((reply)=> {
       res.json(reply);
   }).catch(next);
})
.delete((req,res,next)=>{
    Heroes.findByIdAndDelete(req.params.id)
    .then((reply)=>{
        res.json(reply);
    }).catch(next);
});

router.route('/:id/comment')
  .get((req,res,next)=>{
       Heroes.findById(req.params.id)
       .then((heroes)=>{
         res.json(heroes.comment);
       })
       .catch(next);

  })
 
  .post((req, res, next) => {
    Heroes.findById(req.params.id)
        .then((heroes) => {
            heroes.comment.push(req.body);
            heroes.save()
                .then((heroes) => {
                    res.json(heroes.comment);
                })
                .catch(next);
        })
        .catch(next);
})
  .put((req,res,next)=>{
    res.statusCode = 405;
    res.send("Method not supported");

})
.delete((req,res,next)=>{
    heroes.findById(req.params.id)
    .then((heroes)=>{
        heroes.comment = [];
        heroes.save()
        .then((heroes)=>{
            res.json(heroes.comment);
        })
        .catch(next)
    })
    .catch(next);
})

router.route('/:id/comment/:cid')
.get((req,res,next)=>{
    Heroes.findById(req.params.id)
    .then((heroes)=>{
       let comment = heroes.comment.id(req.params.cid);
            res.json(comment);
        })
        .catch(next);
    
})
.post((req,res,next)=>{
    res.statusCode = 405;
    res.send("Method not supported");
 })
 .put((req,res,next)=>{
     Heroes.findById(req.params.id)
     .then((heroes)=>{
         let reply= heroes.comment.id(req.params.cid);
         reply.comment = req.body.comment;
         heroes.save()
        .then((heroes)=>{
            res.json(heroes.comment)
        })
        .catch(next);
     })
     .catch(next);
 })
 .delete((req,res,next)=>{
     Heroes.findById(req.params.id)
     .then((heroes)=>{
          heroes.comment.pull(req.params.cid);
          heroes.save()
        .then((heroes)=>{
            res.json(heroes.comment);
        })
        .catch(next);
            

     })
     .catch(next);
 })



module.exports=router;