import React, { useEffect, useContext, useReducer } from "react";
import reducer from "../reducers/hero_reducer";
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
  isSaveClicked: false,
  alert: {
    show: false,
    type: "",
    msg: "",
  },
};

export const HeroProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Fetch heroes
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

  // Highlight the hero card with a deeper background color if a user clicks it
  const highLightCard = (id) => {
    dispatch({ type: "SELECTED_HERO_CARD", payload: id });
  };

  // fetch single hero ability
  const fetchSingleHero = async (url, id) => {
    dispatch({ type: "GET_SINGLE_HERO_BEGIN" });
    try {
      const response = await axios.get(url);
      const heroData = response.data;
      dispatch({ type: "GET_SINGLE_HERO_SUCCESS", payload: heroData });
    } catch (error) {
      console.log(error);
    }
  };

  // Increase single hero's point
  function addPoints(e) {
    let { name } = e.target;
    let { point } = e.target.dataset;

    dispatch({ type: "ADD_HERO_POINT", payload: { name, point } });
  }

  // decrease single hero's point
  function minusPoints(e) {
    let { name } = e.target;
    let { point } = e.target.dataset;

    dispatch({ type: "MINUS_HERO_POINT", payload: { name, point } });
  }

  const handleSave = async (e, url, profile) => {
    e.preventDefault();
    // if users changed one hero point without saving it, but switch to anthoer hero's profile
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

  const showAlert = (show, type, msg) => {
    dispatch({ type: "SHOW_ALERT_MESSAGE", payload: { show, type, msg } });
  };
  const removeAlert = () => {
    dispatch({ type: "REMOVE_ALERT_MESSAGE" });
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
        showAlert,
        removeAlert,
      }}
    >
      {children}
    </HeroContext.Provider>
  );
};

// make sure use
export const useHeroesContext = () => {
  return useContext(HeroContext);
};
