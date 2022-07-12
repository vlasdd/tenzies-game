import React from "react";
import Die from "./Die";
import { nanoid } from "nanoid"
import { useWindowSize } from '@react-hook/window-size'
import Confetti from 'react-confetti'

export default function App() {
    const [firstDate, setFirstDate] = React.useState(Math.ceil(new Date().getTime() / 1000));
    const [takenTime, setTakenTime] = React.useState(null);
    const [dice, setDice] = React.useState(allNewDice());
    const [tenzies, setTenzies] = React.useState(false);
    const [amountOfRolls, setAmountOfRolls] = React.useState(0);
    const [record, setRecord] = React.useState(parseInt(localStorage.getItem("record")) || 0);
    const { width, height } = useWindowSize();

    React.useEffect(() => {
        let firstValue = dice[0].value;
        for (let i = 0; i < dice.length; i++) {
            if (!dice[i].isHeld || dice[i].value != firstValue) {
                break;
            }

            if (i == 9) {
                setTenzies(true);
                setTakenTime(Math.ceil(new Date().getTime() / 1000) - firstDate);
                if (!parseInt(localStorage.getItem("record"), 10) || parseInt(localStorage.getItem("record"), 10) > amountOfRolls) {
                    localStorage.setItem("record", JSON.stringify(amountOfRolls))
                    setRecord(parseInt(localStorage.getItem("record")), 10)
                }
            }
        }
    }, [dice])

    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push({
                value: Math.ceil(Math.random() * 6),
                isHeld: false,
                id: nanoid()
            })
        }
        return newDice
    }

    function isHeldToggle(id) {
        setDice(prevDice => prevDice.map(elem => {
            return id != elem.id ? { ...elem } : { ...elem, isHeld: !elem.isHeld }
        }))
    }

    function createNewNumbers() {
        if (!tenzies) {
            setDice(prevDice => prevDice.map(elem => {
                return elem.isHeld ? { ...elem } : { ...elem, value: Math.ceil(Math.random() * 6) }
            }))
            setAmountOfRolls(prevAmount => prevAmount + 1)
        }
        else {
            setTenzies(false)
            setDice(allNewDice())
            setAmountOfRolls(0)
            setFirstDate(Math.ceil(new Date().getTime() / 1000));
            setTakenTime(null);
        }
    }

    const dies = dice.map(elem => {
        return <Die
            value={elem.value}
            isHeld={elem.isHeld}
            key={elem.id}
            isHeldToggle={() => isHeldToggle(elem.id)}
        />
    })

    return (
        <div className="wrapper">
            {tenzies && <Confetti
                width={width}
                height={height}
            />}
            <main className="col-11 col-sm-9 col-md-8 col-lg-7">
                <div className="information">
                    <h1 className="title">Tenzies</h1>
                    <p className="instructions">Roll until all dice are the same.
                        Click each die to freeze it at its current value between rolls.</p>
                    {takenTime && <p className="instructions">This game has taken {takenTime} seconds</p>}
                </div>
                <div className="dies--container">
                    {dies}
                </div>
                <div className="add--info">
                    <h1 className="instructions">Rolls: {amountOfRolls}</h1>
                    <h1 className="instructions">Your record: {record}</h1>
                </div>
                <button className="roll--button" onClick={createNewNumbers}>{tenzies ? "New game" : "Roll"}</button>
            </main>
        </div>
    )
}