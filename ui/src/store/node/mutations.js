export function nodeMutation (state, payload) {
    state[payload.node] = payload.value
}
