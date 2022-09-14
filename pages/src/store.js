function createStore(initialState) {
    let currentState = initialState;
    const listeners = new Set();
    let initialRender = false;
    return {
        getState: () => currentState,
        setState: (newState) => {
            currentState = newState;
            listeners.forEach(listener => listener(currentState));
        },
        subscribe: (listener) => {
            listeners.add(listener);
            return () => listeners.delete(listener)
        },
        serverInitialize: (initialState) => {
            if (!initialRender) {
                currentState = initialState
                initialRender = true
            }
        }
    }
}

const store = createStore({
    value1: 2,
    value2: 5
});

export default store;