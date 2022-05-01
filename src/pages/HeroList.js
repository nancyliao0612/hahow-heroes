import { Route, Switch } from "react-router-dom";
import HeroCard from "../components/HeroCard";
import styled from "styled-components";
import HeroProfile from "./HeroProfile";
import { useHeroesContext } from "../context/hero_context";
import Loading from "../components/Loading";

function HeroList() {
  const { hero_lists, isHeroClicked, hero_loading } = useHeroesContext();

  if (hero_loading) {
    return <Loading />;
  }

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
  margin-top: 5rem;
  padding: 1.5rem;
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-auto-rows: 25rem;
  // background-color: var(--clr-primary-2);
  padding: 0 270px;

  @media screen and (max-width: 768px) {
    padding: 0 10%;
  }
`;

export default HeroList;
