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
                <h1>Spillets gang</h1>
                <h3>Efter tur:</h3>
                <p>
                    Ved spillets start trækkes lod om, hvem der skal begynde. I
                    de efterfølgende spil kastes i henhold til de tidligere
                    spilleresultater (fra lavest til højeste point).
                </p>
                <h3>Spillets start:</h3>
                <p>
                    Den første spiller kaster Mölkky-pinden mod keglerne og
                    prøver at vælte så mange som muligt. Mölkky-pinden skal
                    altid kastes med et underhåndskast.
                </p>
                <h3>Væltede kegler:</h3>
                <p>
                    En kegle regnes ikke som væltet, hvis den læner sig op ad en
                    anden kegle eller ligger på Mölkky-pinden. Efter et kast
                    stilles alle kegler op igen, på samme sted som de faldt.
                </p>
                <h3>Point: </h3>
                <p>
                    Hvis 1 kegle væltes, er nummeret på keglen lig med antal
                    point. Hvis flere kegler væltes, tælles point for samtlige
                    væltede kegler.
                </p>
                <h3>Spillets afslutning:</h3>
                <p>
                    Hvis en spiller ikke vælter kegler ved tre kast i træk, er
                    denne person ude af spillet og skal skrive point. Spillet
                    afsluttes, når en spiller har fået nøjagtigt 50 point. Hvis
                    en spiller får over 50 point, halveres de til 25 point, og
                    spilleren fortsætter.
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

const FadeTransitionRouter = props => (
    <Location>
        {({ location }) => (
            <TransitionGroupContainer>
                <CSSTransition
                    key={location.key}
                    classNames="fade"
                    timeout={380}
                >
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
            <Header>Mölkky</Header>
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
