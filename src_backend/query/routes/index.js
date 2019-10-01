const express = require('express')
const uuidv1 = require('uuid/v1')

const router = express.Router()

const database = require('../helpers/database')

/* GET home page. */
router.get('/', (req, res) => {
  let node = req.query.node ? req.query.node : 'sb1'
  let sekarang = Math.floor(new Date().getTime()/1000.0) * 1000  // dalam ms

  if (req.query.tanggal_waktu) {
    const pilihan_waktu = new Date(req.query.tanggal_waktu)
    sekarang = pilihan_waktu.getTime()/1000.0
  }

  const durasi = 8.64e+7  // 1 hari dalam ms
  const kemarin = sekarang - durasi  // dalam ms
  const unique_id = uuidv1()

  database(`SELECT *, META().id 
            FROM bbta3_bams_suramadu_test 
            WHERE node='${node}' AND META().id BETWEEN '${kemarin.toString()}' AND '${sekarang.toString()}'
  `, unique_id)

  res.status(200).json({
    id: unique_id,
    status: 'STREAMING...',
  })
})

module.exports = router
