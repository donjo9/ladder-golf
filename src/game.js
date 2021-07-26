import React, { useState, useContext } from "react";
import { GameContext, SAVE_SCORE_FOR_PLAYER, UNDO_MOVE } from "./gamecontext";
import styled from "styled-components";
import { Button, LinkButton, ButtonControl } from "./buttons";
import Modal from "./modal";
import CurrentScoreBoard from "./ScoreBoard";
import { Redirect } from "@reach/router";

const PinBoard = styled.div`
    margin: 20px auto;
    display: grid;
    max-width: 312px;
    justify-items: center;
    grid-template-areas: ". t7 t7 t8 t8 t9 t9 ." "t5 t5 t11 t11 t12 t12 t6 t6" ". t3 t3 t10 t10 t4 t4 ." ". . t1 t1 t2 t2 . .";
`;

const Pin = styled.div`
    width: 74px;
    height: 74px;
    font-size: 1rem;
    text-align: center;
    padding: 2px;
    border-radius: 50%;
    background-color: ${props =>
        props.selected ? "var(--electronblue)" : "var(--mintleaf)"};
    color: var(--citylight);
    line-height: 74px;
    grid-area: ${props => "t" + props.pin};
    margin: 2px;
`;

const ScoreBoard = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: auto 1fr auto auto auto;
`;

const ScoreBoardLabel = styled.div`
    padding: 0 5px;
`;

const NameDisplay = styled.div`
    padding: 0 10px;
`;
const ScoreDisplay = styled.div`
    text-align: center;
    width: 74px;
`;
const LoosersList = styled.ul`
    list-style: none;
    color: var(--orangeville);
    margin: 0;
    padding: 0;
    li {
        text-align: center;
    }
`;

const Pins = [7, 8, 9, 5, 11, 12, 6, 3, 10, 4, 1, 2];

const Game = () => {
    const [gameState, dispatch] = useContext(GameContext);
    const [selectedPins, setSelectedPins] = useState([]);

    if (gameState.players.length <= 0) {
        return <Redirect noThrow from="/game" to="/" />;
    }
    const PinRows = Pins.map(pin => {
        return (
            <Pin
                selected={selectedPins.includes(pin)}
                pin={pin}
                key={pin}
                onClick={() => {
                    const pins = [...selectedPins];
                    const pinindex = pins.indexOf(pin);
                    if (pinindex !== -1) {
                        pins.splice(pinindex, 1);
                    } else {
                        pins.push(pin);
                    }
                    setSelectedPins(pins);
                }}
            >
                {pin}
            </Pin>
        );
    });

    return (
        <div className="page">
            <Modal visable={gameState.winner}>
                !! WINNER !!{" "}
                {gameState.winner ? <div>{gameState.winner.name}</div> : null}
                <ButtonControl>
                    <LinkButton to="/">Home</LinkButton>
                </ButtonControl>
            </Modal>
            <ScoreBoard>
                <ScoreBoardLabel>Player: </ScoreBoardLabel>
                <NameDisplay>
                    {gameState.players[gameState.currentPlayer].name}
                </NameDisplay>
                <ScoreBoardLabel style={{color: "var(--orangeville)"}}>
                    
                    {gameState.players[gameState.currentPlayer].strike
                        ? "Strike: " + new Array(
                              gameState.players[gameState.currentPlayer].strike
                          ).fill("|")
                        : null}
                </ScoreBoardLabel>

                <ScoreBoardLabel>Score:</ScoreBoardLabel>
                <ScoreDisplay>
                    {gameState.players[gameState.currentPlayer].score}/50
                </ScoreDisplay>
            </ScoreBoard>
            <PinBoard>{PinRows}</PinBoard>
            <ButtonControl>
                <Button
                    onClick={() => {
                        dispatch({
                            type: SAVE_SCORE_FOR_PLAYER,
                            payload: {
                                score: selectedPins
                            }
                        });
                        setSelectedPins([]);
                    }}
                >
                    Save
                </Button>
                <Button
                    onClick={() => {
                        dispatch({
                            type: UNDO_MOVE
                        });
                        setSelectedPins([]);
                    }}
                >
                    Undo
                </Button>
                <LinkButton to="/">End Game</LinkButton>
            </ButtonControl>
            <LoosersList>
                {gameState.loosers.map(player => (
                    <li key={player.name}>{player.name}</li>
                ))}
            </LoosersList>
            <CurrentScoreBoard />
        </div>
    );
};

export default Game;
