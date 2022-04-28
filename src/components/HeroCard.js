import styled from "styled-components";
import { Link } from "react-router-dom";
import { useHeroesContext } from "../context/hero_context";

function HeroCard(props) {
  const { id, name, image } = props;
  const { highLightCard, hero_highlight, isPointChanged } = useHeroesContext();

  return (
    <Wrapper>
      <Link
        to={`/heroes/${id}`}
        onClick={() => highLightCard(id)}
        // if an user changes hero's ability, then the user needs to save her/his modification before switching to another hero's profile
        className={
          hero_highlight === id
            ? "selected"
            : isPointChanged
            ? "disabled"
            : null
        }
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
  .disabled {
    opacity: 30%;
    pointer-events: none;
  }
`;

export default HeroCard;
