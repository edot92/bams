export const processData = (topic, split_character, store) => {
  if (topic.payload) {
    const node = topic.payload.toString().slice(0, 3)
    const raw_sensor = topic.payload.toString().slice(11, topic.payload.toString().length)

    // let sensor = store.getters['node/nodeGetter']

    for (let index = 11; index <= raw_sensor.length + split_character; index += split_character) {
      const sensor_item_raw = topic.payload
        .toString()
        .slice(index, index + split_character)
      const sensor_item = Buffer.from(
        sensor_item_raw,
        "hex"
      ).readFloatBE(0).toFixed(5)

      if (node == "sb2") {
        if (index >= 11 && index <= 803) {
          store.commit('node/nodeMutation', {node: 'sb2_acc1', value: sensor_item})
        } else if (index >= 811 && index <= 1603) {
          store.commit('node/nodeMutation', {node: 'sb2_acc2', value: sensor_item})
        } else if (index >= 1611 && index <= 2403) {
          store.commit('node/nodeMutation', {node: 'sb2_acc3', value: sensor_item})
        } else if (index == 2411) {
          store.commit('node/nodeMutation', {node: 'sb2_ane1', value: sensor_item})
        } else if (index == 2419) {
          store.commit('node/nodeMutation', {node: 'sb2_ane2', value: toCompass(sensor_item)})
        } else if (index == 2427) {
          store.commit('node/nodeMutation', {node: 'sb2_ane3', value: sensor_item})
        }
      } else if (node == "sb1") {
        if (index >= 11 && index <= 803) {
          store.commit('node/nodeMutation', {node: 'sb1_acc1', value: sensor_item})
        } else if (index >= 811 && index <= 1603) {
          store.commit('node/nodeMutation', {node: 'sb1_acc2', value: sensor_item})
        } else if (index == 1611) {
          store.commit('node/nodeMutation', {node: 'sb1_ane1', value: sensor_item})
        } else if (index == 1619) {
          store.commit('node/nodeMutation', {node: 'sb1_ane2', value: toCompass(sensor_item)})
        } else if (index == 1627) {
          store.commit('node/nodeMutation', {node: 'sb1_ane3', value: sensor_item})
        }
      } else {
        if (index >= 11 && index <= 803) {
          if (node == 'sb3') {store.commit('node/nodeMutation', {node: 'sb3_acc1', value: sensor_item})}
          else if (node == 'sb4') {store.commit('node/nodeMutation', {node: 'sb4_acc1', value: sensor_item})}
          else if (node == 'sb5') {store.commit('node/nodeMutation', {node: 'sb5_acc1', value: sensor_item})}
          else if (node == 'sb6') {store.commit('node/nodeMutation', {node: 'sb6_acc1', value: sensor_item})}
        } else if (index >= 811 && index <= 1603) {
          if (node == 'sb3') {store.commit('node/nodeMutation', {node: 'sb3_acc2', value: sensor_item})}
          else if (node == 'sb4') {store.commit('node/nodeMutation', {node: 'sb4_acc2', value: sensor_item})}
          else if (node == 'sb5') {store.commit('node/nodeMutation', {node: 'sb5_acc2', value: sensor_item})}
          else if (node == 'sb6') {store.commit('node/nodeMutation', {node: 'sb6_acc2', value: sensor_item})}
        }
      }
    }
  }
}

const toCompass = degree => {
  var val = Math.floor((degree / 45) + 0.5)
  var arr = ["UT", "TL", "TM", "TG", "SL", "BD", "BR", "BL"]

  return arr[(val % 8)]
}
