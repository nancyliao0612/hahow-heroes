import axios from "axios";
import { useEffect, useState } from "react";
import HeroCard from "../components/HeroCard";
import styled from "styled-components";

function HeroList() {
  const [heroList, setHeroList] = useState([]);

  const getHeroes = async () => {
    const url = "https://hahow-recruit.herokuapp.com/heroes";
    try {
      const response = await axios(url);
      const heroes = response.data;
      setHeroList(heroes);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getHeroes();
  }, []);

  const herocard = heroList.map((hero) => {
    return <HeroCard {...hero} key={hero.id} />;
  });

  return <Wrapper>{herocard}</Wrapper>;
}

const Wrapper = styled.section`
  // border: solid 1px;
  margin-top: 50px;
  padding: 15px;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  grid-auto-rows: 250px;
  background-color: var(--clr-primary-2);
`;

export default HeroList;
