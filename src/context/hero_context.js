import React, { useEffect, useContext, useReducer } from "react";
import reducer from "../reducers/hero_reducer";
import axios from "axios";

const HeroContext = React.createContext();

const initialState = {
  hero_lists: [],
  isHeroClicked: false,
  hero_highlight: "",
};

export const HeroProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Fetch heroes
  const getHeroes = async () => {
    const url = "https://hahow-recruit.herokuapp.com/heroes";
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

  // Highlight the hero card with a deeper background color if a user clicks it
  const highLightCard = (id) => {
    dispatch({ type: "SELECTED_HERO_CARD", payload: id });
  };

  return (
    <HeroContext.Provider value={{ ...state, highLightCard }}>
      {children}
    </HeroContext.Provider>
  );
};

// make sure use
export const useHeroesContext = () => {
  return useContext(HeroContext);
};
