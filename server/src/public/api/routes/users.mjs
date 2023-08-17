import express from 'express';
import db from '../../../lib/database.mjs';
import { ObjectId } from 'mongodb';

const router = express.Router();

router.get('/:user', async(req,res) => {
    let collection = await db.collection('users');
    let user = await collection.findOne({username: req.params.user});

    if(!user){
        let newUserAck = await collection.insertOne({
            username: req.params.user,
            tasks: []
        });
        
        let newUser = await collection.findOne({_id: newUserAck.insertedId});
        res.send(newUser).status(200);
    }else{
        let query = {_id: {$in: user.tasks}};
        let userTasksResult = await db.collection('tasks')
            .find(query)
            .toArray();
        
        user.tasks = user.tasks.map((taskId) => {
            return userTasksResult.find((task) => {
                return task._id.toString() === taskId.toString();
            });
        });
    
        res.send(user).status(200);
    }
});

router.put("/", async(req,res) => {
    let ids = req.body.tasks.map((task) => new ObjectId(task._id));
    let updatedUser = await db.collection('users').updateOne({username: req.body.username}, {$set: {tasks: ids}});

    res.send(updatedUser).status(200);
})

export default router;