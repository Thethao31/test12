const express = require('express')
const app = express()
const { Shoes } = require('./models')

app.use(express.json())

const db = require('./models')

app.post('/', async (req, res) => {
    try {
        const shoe = req.body
        await Shoes.create(shoe)

        res.status(200).json({
            message: 'create post successfully',
            shoes: shoe,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Something went wrong' })
    }
})

app.get('/', async (req, res) => {
    try {
        const shoes = await Shoes.findAll({
            attributes: { exclude: ['createdAt', 'updatedAt'] },
        })
        res.status(200).json({ shoes })
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' })
    }
})

db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log('Server running on port 3001')
    })
})
