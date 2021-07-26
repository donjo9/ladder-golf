import styled, { css } from "styled-components";
import { Link } from "@reach/router";

const ButtonStyle = css`
    border: 0;
    box-shadow: 0 0 5px 0 var(--greendarnertail);
    margin: 10px;
    background-color: var(--electronblue);
    border-radius: 10px;
    padding: 5px;
    color: var(--citylight);
    max-width: 300px;
    min-width: 100px;
    text-decoration: none;
    text-align: center;
    font-size: 16px;
    font-family: var(--font-family);
`;
const LinkButton = styled(Link)`
    ${ButtonStyle}
    display: inline-block;
`;
const Button = styled.button`
    ${ButtonStyle}
`;

const ButtonControl = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
`;

export { LinkButton, Button, ButtonControl };
