import { Route, Switch } from "react-router-dom";
import HeroCard from "../components/HeroCard";
import styled from "styled-components";
import HeroProfile from "./HeroProfile";
import { useHeroesContext } from "../context/hero_context";

function HeroList() {
  const { hero_lists, isHeroClicked } = useHeroesContext();

  const herocard = hero_lists.map((hero) => {
    return <HeroCard {...hero} key={hero.id} />;
  });

  return (
    <>
      <Wrapper>{herocard}</Wrapper>
      {isHeroClicked && (
        <Switch>
          <Route path={`/heroes/:heroId`}>
            <HeroProfile />
          </Route>
        </Switch>
      )}
    </>
  );
}

const Wrapper = styled.section`
  // border: solid 1px;
  margin-top: 5rem;
  padding: 1.5rem;
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
  grid-auto-rows: 25rem;
  background-color: var(--clr-primary-2);

  a {
    background: var(--clr-primary-3);
  }
`;

export default HeroList;
