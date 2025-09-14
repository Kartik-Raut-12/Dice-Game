import styled from "styled-components"
import NumberSelector from "./NumberSelector"
import TotalScore from "./TotalScore"
import RoleDice from "./RoleDice"
import { useState } from "react";
import { Button, OutlineButton } from "../styled/Button";
import Rules from "./Rules";

const GamePlay = () => {
    const [score, setScore] = useState(0);
    const [selectedNumber, setSelectedNumber] = useState();
    const [currentDice, setCurrentDice] = useState(1);
    const [error, setError] = useState("");
    const [showRules, setShowRules] = useState(false);

    const generateRandomNumber = (min, max) => {
        return Math.floor(Math.random() * (max - min) + min);
    }

    const roleDice = () => {
        if (!selectedNumber) {
            setError("You have not selected any number");
            return;
        }

        const randomNumber = generateRandomNumber(1, 7);
        setCurrentDice(randomNumber);

        if (selectedNumber === randomNumber) {
            setScore((prev) => prev + randomNumber);
        }
        else {
            setScore((prev) => prev - 2);
        }

        setSelectedNumber(undefined); //for clearing the number after dice is clicked
    };

    const resetScore = () => {
        setScore(0);
        setCurrentDice(1);
    }


    return (
        <MainContainer>
            <div className="top_section">
                <TotalScore score={score} />
                <NumberSelector
                    error={error}
                    setError={setError}
                    selectedNumber={selectedNumber}
                    setSelectedNumber={setSelectedNumber}
                />
            </div>
            <div>
                <RoleDice
                    currentDice={currentDice}
                    roleDice={roleDice}
                />
            </div>
            <div className="btns">
                <OutlineButton
                    onClick={resetScore}>
                        Reset
                </OutlineButton>
                <Button onClick={() => setShowRules((prev) => !prev)}>
                    {showRules ? "Hide Rules" : "Show Rules"}
                </Button>
            </div>
            <div>
                {
                    showRules ? <Rules/> : null

                }
            </div>
        </MainContainer>
    )
}
export default GamePlay

const MainContainer = styled.div`
padding-top: 70px;
    .top_section {
        display:flex;
        justify-content: space-around;
        align-items: end;
    }
    .btns{
        margin-top: 40px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 10px;
    }
`;