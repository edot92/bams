export const processData = (payload, store) => {
  if (payload.node == "sb2") {
    store.commit('node/nodeMutation', {node: 'sb2_acc1', value: payload.acc1 ? payload.acc1.toFixed(4) : 0})
    store.commit('node/nodeMutation', {node: 'sb2_acc2', value: payload.acc2 ? payload.acc2.toFixed(4) : 0})
    store.commit('node/nodeMutation', {node: 'sb2_acc3', value: payload.acc3 ? payload.acc3.toFixed(4) : 0})
    store.commit('node/nodeMutation', {node: 'sb2_ane1', value: payload.kecepatan ? payload.kecepatan.toFixed(1) : 0})
    store.commit('node/nodeMutation', {node: 'sb2_ane2', value: payload.kompas ? toCompass(payload.kompas) : ''})
  } else if (payload.node == "sb1") {
    store.commit('node/nodeMutation', {node: 'sb1_acc1', value: payload.acc1 ? payload.acc1.toFixed(4) : 0})
    store.commit('node/nodeMutation', {node: 'sb1_acc2', value: payload.acc2 ? payload.acc2.toFixed(4) : 0})
    store.commit('node/nodeMutation', {node: 'sb1_ane1', value: payload.kecepatan.toFixed(1)})
    store.commit('node/nodeMutation', {node: 'sb1_ane2', value: payload.kompas ? toCompass(payload.kompas) : ''})
  }
  else if (payload.node == 'sb3') {
    store.commit('node/nodeMutation', {node: 'sb3_acc1', value: payload.acc1 ? payload.acc1.toFixed(4) : 0})
    store.commit('node/nodeMutation', {node: 'sb3_acc2', value: payload.acc2 ? payload.acc2.toFixed(4) : 0})
  }
  else if (payload.node == 'sb4') {
    store.commit('node/nodeMutation', {node: 'sb4_acc1', value: payload.acc1 ? payload.acc1.toFixed(4) : 0})
    store.commit('node/nodeMutation', {node: 'sb4_acc2', value: payload.acc2 ? payload.acc2.toFixed(4) : 0})
  }
  else if (payload.node == 'sb5') {
    store.commit('node/nodeMutation', {node: 'sb5_acc1', value: payload.acc1 ? payload.acc1.toFixed(4) : 0})
    store.commit('node/nodeMutation', {node: 'sb5_acc2', value: payload.acc2 ? payload.acc2.toFixed(4) : 0})
  }
  else if (payload.node == 'sb6') {
    store.commit('node/nodeMutation', {node: 'sb6_acc1', value: payload.acc1 ? payload.acc1.toFixed(4) : 0})
    store.commit('node/nodeMutation', {node: 'sb6_acc2', value: payload.acc2 ? payload.acc2.toFixed(4) : 0})
  }
}

const toCompass = degree => {
  var val = Math.floor((degree / 45) + 0.5)
  var arr = ["UT", "TL", "TM", "TG", "SL", "BD", "BR", "BL"]

  return arr[(val % 8)]
}
