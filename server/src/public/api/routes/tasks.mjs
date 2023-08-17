import express from 'express';
import db from '../../../lib/database.mjs';
import { ObjectId } from 'mongodb';

const router = express.Router();

router.get('/:user', async(req,res) => {
    let collection = await db.collection('tasks');
    let result = await collection.find({createdBy: req.params.user, completed: false})
        .toArray();

    res.send(result).status(200);
});

router.post('/', async(req,res) => {
    let collection = await db.collection('tasks');
    let task = {
        ...req.body,
        createdAt: new Date(),
        completed: false,
        completedAt: null
    }

    //Add the task reference to the user's list of tasks, so we can retain task order
    let result = await collection.insertOne(task);
    let update = {$push: {tasks: result.insertedId}}
    await db.collection('users').updateOne({username: req.body.createdBy}, update);
    
    res.send(result).status(200);
});

router.put('/complete', async(req,res) => {
    let update = {
        $set: {
            completed: true,
            completedAt: new Date()
        }
    }
    await db.collection('tasks').updateOne({_id: new ObjectId(req.body._id)}, update);
    await db.collection('users').updateOne({username: req.body.createdBy},{$pull: {tasks: new ObjectId(req.body._id)}});
    res.send().status(200);
});

router.delete('/delete', async(req,res) => {
    await db.collection('tasks').deleteOne({_id: new ObjectId(req.body._id)});
    await db.collection('users').updateOne({username: req.body.createdBy},{$pull: {tasks: new ObjectId(req.body._id)}});
    res.send().status(204);
});

export default router;