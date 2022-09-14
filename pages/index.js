import { createContext, useContext } from 'react'
import { useSyncExternalStore } from 'react'
import store from './src/store'

const ServerContext = createContext()

const useStore = (selector = (state) => state) =>
  useSyncExternalStore(
    store.subscribe,
    () => selector(store.getState()),
    // eslint-disable-next-line react-hooks/rules-of-hooks
    () => selector(useContext(ServerContext))
  );



const IncrementIcon = ({ item }) => (
  <button
    onClick={() => {
      const state = store.getState();
      store.setState({
        ...state,
        [item]: state[item] + 1
      })
    }
    }
  >Increment--{item}
  </button>
)

const Displayvalue = ({ item }) => (
  <div>{item}  = {useStore(state => state[item])}</div>
)


function App({ initialState }) {
  console.log('opo', initialState)
  store.serverInitialize(initialState);
  return (
    <ServerContext.Provider value={initialState}>
      <div className="container">
        <IncrementIcon item='value1' />
        <Displayvalue item='value1' />
        <IncrementIcon item='value2' />
        <Displayvalue item='value2' />
      </div>
    </ServerContext.Provider>
  )
}

export function getServerSideProps(context) {
  return {
    props: {
      initialState: {
        value1: 21,
        value2: 24
      }
    }
  }
}

export default App
