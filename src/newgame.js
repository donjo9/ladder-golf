import React, { useState, useContext } from "react";
import styled from "styled-components";
import Modal from "./modal";
import { ButtonControl, LinkButton, Button } from "./buttons";
import { GameContext } from "./gamecontext";

const Container = styled.section`
    display: grid;
`;
const InputControl = styled.input`
    border: 0;
    padding: 5px 10px;
    margin: 15px 0px;
    background-color: var(--electronblue);
    color: white;
    font-size: 1rem;
`;

const PlayerList = styled.ul`
    list-style: none;
    margin: 25px auto;
    padding: 0;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    max-width: 300px;
    align-self: center;
`;

const PlayerListItem = styled.li`
    position: relative;
    font-size: 1.2rem;
    width: 100%;
    text-align: center;
    margin-bottom: 10px;
    padding: 0 15px;
    &::after {
        content: "";
        left: 0;
        bottom: 0;
        width: 100%;
        position: absolute;
        height: 1px;
        background-color: transparent;
        box-shadow: 1px 0 3px 0 white;
    }
`;

const NewGame = () => {
    const [isAddingPlayer, setIsAddingPlayer] = useState(false);
    const [newPlayer, setNewPlayer] = useState("");
    const [gameState, dispatch] = useContext(GameContext);
    const AddNewPlayer = () => {
        if (newPlayer !== "") {
            dispatch({
                type: "ADD_NEW_PLAYER",
                payload: newPlayer
            });
            setNewPlayer("");
            setIsAddingPlayer(false);
        }
    };

    return (
        <Container className="page">
            <Modal visable={isAddingPlayer}>
                <InputControl
                    autoFocus
                    value={newPlayer}
                    onChange={e => setNewPlayer(e.target.value)}
                    onKeyDown={e => {
                        if (e.key === "Enter") {
                            AddNewPlayer();
                        } else if (e.key === "Escape") {
                            setIsAddingPlayer(false);
                        }
                    }}
                />
                <ButtonControl>
                    <Button onClick={() => AddNewPlayer()}>Add</Button>
                    <Button onClick={() => setIsAddingPlayer(false)}>
                        Cancel
                    </Button>
                </ButtonControl>
            </Modal>
            <ButtonControl>
                <Button onClick={() => setIsAddingPlayer(true)}>
                    Add Player
                </Button>
                <LinkButton to="/">Cancel</LinkButton>
                {gameState.players.length > 1 ? (
                    <LinkButton to="/game">Start Game</LinkButton>
                ) : null}
            </ButtonControl>
            <PlayerList>
                {gameState.players.length > 0
                    ? gameState.players.map(player => (
                          <PlayerListItem key={player.name}>
                              {player.name}
                          </PlayerListItem>
                      ))
                    : null}
            </PlayerList>
        </Container>
    );
};

export default NewGame;
