import styled from "styled-components";


export const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    margin-top: -5rem;
    div{
        background: #FFF;
        padding: 1.5rem;
        border-radius:0.25rem;
        color: var(--title);

        header{ 
            display:flex;
            align-items: center;
            justify-content: space-between;
        }
        strong{
            display: block;
            margin-top: 1rem;
            font-weight: 500;
            font-size: 2rem;
            line-height: 3rem;
        }
        &.hightlight-background-positiv{
            background-color: var(--green);
            color: white;
        }
        &.hightlight-background-negative{
            background-color: var(--red);
            color: white;
        }
    }
`