const express = require('express')

const router = express.Router()

const database = require('../helpers/database')

/* GET home page. */
router.get('/', (req, res) => {
  let node = req.query.node ? req.query.node : 'sb1'
  let sekarang = Math.floor(new Date().getTime()/1000.0) * 1000  // dalam ms

  if (req.query.tanggal_waktu) {
    const pilihan_waktu = new Date(req.query.tanggal_waktu)
    sekarang = pilihan_waktu.getTime()
  }

  const durasi = 1.08e+7  // 1 hari = 8.64e+7 ms, 3 jam = 1.08e+7 ms
  const kemarin = sekarang - durasi  // dalam ms
  const unique_id = req.query.uid ? req.query.uid : 'uid'

  console.log('lama', kemarin)
  console.log('baru', sekarang)

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
