import styled from "styled-components";
import { Link } from "react-router-dom";
import { useHeroesContext } from "../context/hero_context";

function HeroCard(props) {
  const { id, name, image } = props;
  const { highLightCard, hero_highlight } = useHeroesContext();

  return (
    <Wrapper>
      <Link
        to={`/heroes/${id}`}
        onClick={() => highLightCard(id)}
        className={hero_highlight === id ? "selected" : null}
      >
        <img src={image} alt={image} />
        <h3>{name}</h3>
      </Link>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  // border: solid 1px;
  cursor: pointer;

  a {
    display: block;
    padding: 0.5rem;
    background-color: var(--clr-primary-3);
    height: 100%;
    width: 100%;
  }
  img {
    width: 100%;
    height: 70%;
    object-fit: cover;
  }
  h3 {
    text-align: center;
    height: 30%;
    padding: 2rem 0;
    font-size: 1.8rem;
  }
  .selected {
    // border: solid 2px red;
    background-color: var(--clr-primary-1);
    color: var(--clr-primary-2);
  }
`;

export default HeroCard;
