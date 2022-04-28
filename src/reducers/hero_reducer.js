const heroes_reducer = (state, action) => {
  if (action.type === "GET_HEROES_SUCCESS") {
    return { ...state, hero_lists: action.payload };
  }
  if (action.type === "SELECTED_HERO_CARD") {
    return { ...state, hero_highlight: action.payload, isHeroClicked: true };
  }
};

export default heroes_reducer;
