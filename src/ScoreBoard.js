import React, { useContext, useState } from "react";
import styled from "styled-components";
import { GameContext } from "./gamecontext";

const Container = styled.div`
    position: fixed;
    height: 100vh;
    top: 0;
    right: 0;
    width: ${props => (props.visable ? "85vw" : "0px")};
    transition: width 350ms ease-in-out;
    max-width: 350px;
`;

const ScoreButton = styled.div`
    position: absolute;
    top: 50vh;
    width: 40px;
    left: -40px;
    font-size: 1rem;
    padding: 30px 5px;
    grid-column-start: 1;
    grid-column-end: 2;
    align-self: center;
    writing-mode: vertical-rl;
    transform: rotateZ(180deg) translateY(50%);
    background-color: green;
    box-shadow: 0px 0px 8px 2px green;
    border-radius: 0px 10px 10px 0px;
`;

const ScoreContent = styled.div`
    height: 100vh;
    margin: 0;
    background-color: var(--americanriver);
    color: white;
    display: grid;
    align-content: center;
    grid-template-columns: 1fr auto auto auto;
    width: 100%;
    padding: 10px;
    > div {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        padding: 5px 5px;
        opacity: ${props => (props.visable ? 1 : 0.1)};
        transition: opacity 150ms ease-in;
    }
    > div:nth-child(4n + 1) {
        text-align: left;
    }

    > div:nth-child(4n + 4) {
        text-align: right;
    }
    position: relative;
    border-radius: 15px 0px 0px 15px;
`;

const ScoreBoard = () => {
    const [visable, setVisable] = useState(false);
    const [gameState] = useContext(GameContext);

    const p = JSON.parse(JSON.stringify(gameState.players));
    let playerscore = p
        .sort((first, second) => second.score - first.score)
        .map(player => {
            const strike =
                player.strike > 0
                    ? "Strike: " + new Array(player.strike).fill("|")
                    : null;
            return (
                <React.Fragment key={player.name}>
                    <div>{player.name}</div>
                    <div style={{ color: "var(--orangeville)" }}>
                        {strike}
                    </div>
                    <div>Score:</div>
                    <div>{player.score}</div>
                </React.Fragment>
            );
        });

    return (
        <Container visable={visable}>
            <ScoreButton onClick={() => setVisable(!visable)}>
                Score
            </ScoreButton>
            <ScoreContent visable={visable}>{playerscore}</ScoreContent>
        </Container>
    );
};

export default ScoreBoard;
