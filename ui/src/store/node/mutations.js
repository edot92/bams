export function nodeMutation (state, payload) {
    state.number = payload.number
    if ('client' in payload) state.client = payload.client
}
