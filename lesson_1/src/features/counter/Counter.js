import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux/es/exports'
import { increment, decrement, reset, incrementByAmount } from './counterSlice'
export default function Counter() {
    const count = useSelector((state) => state.counter.count)
    const dispatch = useDispatch();
    const [incrementAmount, setIncrementAmount] = useState(0);
    const addValue = Number(incrementAmount) || 0;

    function resetAll(){
        setIncrementAmount(0)
        dispatch(reset())
    }
  return (
    <section>
        <p>{count}</p>
        <div>
            <button onClick={() => dispatch(increment())}>+</button>
            <button onClick={() => dispatch(decrement())}>-</button>
            <input type="text" value={incrementAmount} onChange={(e) => setIncrementAmount(e.target.value)}/>
        </div>
        <div>
        <button onClick={() => dispatch(incrementByAmount(addValue))}>Add amount</button>
        <button onClick={resetAll}>Reset</button>
        </div>
    </section>
  )
}
