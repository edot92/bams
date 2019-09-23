export const processData = (topic, split_character, ms) => {
  if (topic.payload) {
    const node = topic.payload.toString().slice(0, 3)
    const raw_sensor = topic.payload.toString().slice(11, topic.payload.toString().length)

    let sensor = {
      sb1_acc1: 0, sb1_acc2: 0, sb1_ane1: 0, sb1_ane2: 0, sb1_ane3: 0,
      sb2_acc1: 0, sb2_acc2: 0, sb2_acc3: 0, sb2_ane1: 0, sb2_ane2: 0, sb2_ane3: 0,
      sb3_acc1: 0, sb3_acc2: 0, 
      sb4_acc1: 0, sb4_acc2: 0,
      sb5_acc1: 0, sb5_acc2: 0,
      sb6_acc1: 0, sb6_acc2: 0,
    }

    for (let index = 11; index <= raw_sensor.length + split_character; index += split_character) {
      const sensor_item_raw = topic.payload
        .toString()
        .slice(index, index + split_character)
      const sensor_item = Buffer.from(
        sensor_item_raw,
        "hex"
      ).readFloatBE(0).toFixed(3)

      if (node == "sb2") {
        if (index >= 11 && index <= 803) {
          sensor.sb2_acc1 = sensor_item
        } else if (index >= 811 && index <= 1603) {
          sensor.sb2_acc2 = sensor_item
        } else if (index >= 1611 && index <= 2403) {
          sensor.sb2_acc3 = sensor_item
        } else if (index == 2411) {
          sensor.sb2_ane1 = sensor_item
        } else if (index == 2419) {
          sensor.sb2_ane2 = sensor_item
        } else if (index == 2427) {
          sensor.sb2_ane3 = sensor_item
        }
      } else if (node == "sb1") {
        if (index >= 11 && index <= 803) {
          sensor.sb1_acc1 = sensor_item
        } else if (index >= 811 && index <= 1603) {
          sensor.sb1_acc2 = sensor_item
        } else if (index == 1611) {
          sensor.sb1_ane1 = sensor_item
        } else if (index == 1619) {
          sensor.sb1_ane2 = sensor_item
        } else if (index == 1627) {
          sensor.sb1_ane3 = sensor_item
        }
      } else {
        if (index >= 11 && index <= 803) {
          if (node == 'sb3') {sensor.sb3_acc1 = sensor_item}
          else if (node == 'sb4') {sensor.sb4_acc1 = sensor_item}
          else if (node == 'sb5') {sensor.sb5_acc1 = sensor_item}
          else if (node == 'sb6') {sensor.sb6_acc1 = sensor_item}
        } else if (index >= 811 && index <= 1603) {
          if (node == 'sb3') {sensor.sb3_acc2 = sensor_item}
          else if (node == 'sb4') {sensor.sb4_acc2 = sensor_item}
          else if (node == 'sb5') {sensor.sb5_acc2 = sensor_item}
          else if (node == 'sb6') {sensor.sb6_acc2 = sensor_item}
        }
      }
    }

    return sensor
  }
}
