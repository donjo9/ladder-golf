import React, { useContext } from "react";
import styled from "styled-components";
import { Router, navigate, Location } from "@reach/router";
import Game from "./game";
import NewGame from "./newgame";
import GameStore, { GameContext, NEW_GAME } from "./gamecontext";
import { LinkButton, Button } from "./buttons";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const Header = styled.header`
  text-transform: uppercase;
  text-align: center;
  font-size: 3rem;
  color: var(--brigthyarrow);
  font-weight: 600;
`;

const HomeContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const RulesPageContainer = styled.div`
  margin: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const RulesPage = () => {
  return (
    <RulesPageContainer className="page">
      <LinkButton to="/" style={MenuButton}>
        Home
      </LinkButton>
      <div>
        <h3>Rules</h3>
        <p>
          Ladder Golf ® is played with 2 or more players or teams. Each player
          has 3 golf ball bolas. A bola is 2 golf balls attached by a nylon
          rope. The object of the game is to wrap your bolas around the steps of
          the ladder. The ladder consists of 3 steps, a top, middle and a bottom
          step.
        </p>
        <h3>Playing the Game:</h3>
        <p>
          Prior to game play a line must be set 5 paces from the ladder. This is
          the called the toss line. The official toss line is 15 feet away but
          most players measure 5 paces from the game ladder to set the toss
          line. This allows for a closer toss line for children’s games. Ladder
          Golf is played in rounds, each round consists of all players tossing 3
          bolas. A coin toss is used to decide which player or team will toss
          first. The first player must toss all 3 bolas before the next player
          is able to toss his or her bolas. Bolas can be tossed in anyway the
          player chooses, as long as they are tossed individually and can be
          bounced off the ground. The winner of the round earns the first toss
          in the next round. Games are played to an exact point total of 21. In
          order to win, a player must be the only one to score exactly 21 points
          after the completion of a round. If a player goes over the exact point
          total, that players points for that round do not count. For example: A
          player with 18 points needs 3 points to get the exact score of 21 in
          order to win. If that player has 5 points hanging on the ladder after
          all the players have tossed all strands, none of those points count
          and the player will enter the next round with 18 points again needing
          3 points to win. In the case of a tie, the players that tie will play
          as many overtime rounds as needed until one player ends a complete
          round 2 points ahead of the other player. The 2 point rule only
          applies in overtime rounds. During regular play any player can win as
          long as that player is the only one to score an exact total of 21
          points at the end of that round no matter how many points the other
          players have.
        </p>
        <h3>Etiquette of the Game:</h3>
        <p>
          Basic etiquette of Ladder Golf ® states that contestants should make
          as many remarks, sounds or movements as possible during play in order
          to distract the opponent’s during play. Touching the player during
          tossing is never allowed. In the course of play no contestant is to
          walk to the ladder prior to completion of the current round of play.
        </p>
        <h3>Scoring:</h3>
        <p>
          After all teams have tossed all their bolas, scoring is determined by
          the bolas that are still hanging from the steps. Players can knock-off
          bolas during the course of the game, in fact knocking-off other
          players bolas is encouraged and a good way to play defensively. bolas
          that are knocked off during play do not count as points. Only bolas
          that are left hanging after all bolas are tossed are counted as
          points.
        </p>
        <h3>Points: </h3>
        <p>
          Points are determined by which step your bola wraps around. The top
          step is worth 3 points the middle step is worth 2 points and the
          bottom step is only worth 1 point. Players can score an optional bonus
          of 1 point by hanging all 3 bolas from the same step or by hanging a
          bola on all 3 (1-2-3) steps in one round. The highest amount of points
          available per player is 10. This is accomplished by hanging all 3
          bolas on the top (3 point) step
        </p>
      </div>
    </RulesPageContainer>
  );
};

const TransitionRouter = styled(Router)`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  &.fade-enter {
    transform: translateX(100%);
    opacity: 0.01;
  }

  &.fade-enter.fade-enter-active {
    transform: translateX(0%);
    opacity: 1;
    transition-property: transform, opacity;
    transition-duration: 350ms;
    transition-timing-function: ease-in-out;
  }

  &.fade-exit {
    transform: translateX(0%);
    opacity: 1;
    transition-property: transform, opacity;
    transition-duration: 150ms;
  }

  &.fade-exit-active {
    opacity: 0.01;
    transform: translateX(-50%);
  }
`;

const MenuButton = { width: "80%" };

const Home = () => {
  const [, dispatch] = useContext(GameContext);
  return (
    <HomeContainer className="page">
      <Button
        style={MenuButton}
        onClick={() => {
          navigate("newgame");
          dispatch({ type: NEW_GAME });
        }}
      >
        New Game
      </Button>
      <LinkButton style={MenuButton} to="rules">
        Rules
      </LinkButton>
    </HomeContainer>
  );
};

const TransitionGroupContainer = styled(TransitionGroup)`
  flex: 1;
  position: relative;
`;

const FadeTransitionRouter = (props) => (
  <Location>
    {({ location }) => (
      <TransitionGroupContainer>
        <CSSTransition key={location.key} classNames="fade" timeout={380}>
          {/* the only difference between a router animation and
                any other animation is that you have to pass the
                location to the router so the old screen renders
                the "old location" */}
          <TransitionRouter location={location}>
            {props.children}
          </TransitionRouter>
        </CSSTransition>
      </TransitionGroupContainer>
    )}
  </Location>
);

function App() {
  return (
    <>
      <Header>Ladder Golf</Header>
      <GameStore>
        <FadeTransitionRouter>
          <Game path="game" />
          <NewGame path="newgame" />
          <Home path="/" />
          <RulesPage path="/rules" />
        </FadeTransitionRouter>
      </GameStore>
    </>
  );
}

export default App;
