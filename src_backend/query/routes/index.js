const express = require('express')
const router = express.Router()

const database = require('../helpers/database')

/* GET home page. */
router.get('/', (req, res) => {
  let node = req.query.node ? req.query.node : 'sb1'

  database(`SELECT * 
            FROM bbta3_bams_suramadu_test 
            WHERE node='${node}' 
            LIMIT 200`
  )

  console.log(node, Date.now() * 1000)
  res.status(200).json({
    status: 'STREAMING...'
  })
})

module.exports = router
