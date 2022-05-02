import React, { useEffect, useContext, useReducer } from "react";
import reducer from "../reducer/hero_reducer";
import axios from "axios";

const HeroContext = React.createContext();

const initialState = {
  hero_lists: [],
  hero_loading: false,
  hero_highlight: "",
  isHeroClicked: false,
  hero_ability: {},
  hero_ability_loading: false,
  remain_point: 0,
  isPointChanged: false,
};

export const HeroProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const url = "https://hahow-recruit.herokuapp.com/heroes";
  const getHeroes = async () => {
    dispatch({ type: "GET_HEROES_BEGIN" });
    try {
      const response = await axios(url);
      const heroes = response.data;
      dispatch({ type: "GET_HEROES_SUCCESS", payload: heroes });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getHeroes();
  }, []);

  // If a user clicks a hero card, then highlight the card with a deeper background color
  const highLightCard = (id) => {
    dispatch({ type: "SELECTED_HERO_CARD", payload: id });
  };

  const fetchSingleHero = async (url) => {
    dispatch({ type: "GET_SINGLE_HERO_BEGIN" });
    try {
      const response = await axios.get(url);
      const heroData = response.data;
      dispatch({ type: "GET_SINGLE_HERO_SUCCESS", payload: heroData });
    } catch (error) {
      console.log(error);
    }
  };

  function addPoints(e) {
    let { name } = e.target;
    let { point } = e.target.dataset;
    dispatch({ type: "ADD_HERO_POINT", payload: { name, point } });
  }

  function minusPoints(e) {
    let { name } = e.target;
    let { point } = e.target.dataset;
    dispatch({ type: "MINUS_HERO_POINT", payload: { name, point } });
  }

  const handleSave = async (e, url, profile) => {
    e.preventDefault();
    try {
      await axios.patch(url, profile, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      dispatch({ type: "SAVE_HERO_POINT" });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <HeroContext.Provider
      value={{
        ...state,
        highLightCard,
        fetchSingleHero,
        addPoints,
        minusPoints,
        handleSave,
      }}
    >
      {children}
    </HeroContext.Provider>
  );
};

export const useHeroesContext = () => {
  return useContext(HeroContext);
};
