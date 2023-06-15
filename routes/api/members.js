const express = require('express');
const uuid = require('uuid');
const router = express.Router();
let members = require('../../Members');

// Gets all members
router.get('/', (req, res) => {
    res.json(members);
});

// Get single member
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);

    /// Filtering members with id. There should be only 
    /// one member with id.
    let filteredMembers = members.filter((member) => {
        return member.id === id;
    });

    if (filteredMembers.length > 0) {
        res.json(filteredMembers[0]);
    } else {
        res.status(400).json({ error: 'NOT_FOUND', message: `Member with id ${id} not found` });
    }
});

// Create member
router.post('/', (req, res) => {
    if (!req.body.name || !req.body.email) {
        return res.status(400).json({ message: 'Please include name and email.' });
    }

    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active',
    }

    members.push(newMember);

    res.json(members);
});

// Update member
router.put('/:id', (req, res) => {
    if (!req.params.id) {
        return res.status(400).json({ message: 'Please include id.' });
    }

    const indexWithId = members.findIndex((member) => member.id === parseInt(req.params.id));

    if (indexWithId === -1) {
        return res.status(400).json({ message: `Member with id ${req.params.id} is not found.` });
    }

    members[indexWithId].name = req.body.name || members[indexWithId].name;
    members[indexWithId].email = req.body.email || members[indexWithId].email;

    res.json(members);
});

// Delete member
router.delete('/:id', (req, res) => {
    if (!req.params.id) {
        return res.status(400).json({ message: 'Please include id.' });
    }

    const indexWithId = members.findIndex((member) => member.id === parseInt(req.params.id));

    if (indexWithId === -1) {
        return res.status(400).json({ message: `Member with id ${req.params.id} is not found` });
    }

    members = members.filter((member) => member.id !== parseInt(req.params.id));

    res.json(members);
})

module.exports = router;
