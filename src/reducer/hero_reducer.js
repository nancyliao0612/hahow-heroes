const heroes_reducer = (state, action) => {
  if (action.type === "GET_HEROES_BEGIN") {
    return { ...state, hero_loading: true };
  }

  if (action.type === "GET_HEROES_SUCCESS") {
    return { ...state, hero_lists: action.payload, hero_loading: false };
  }

  if (action.type === "SELECTED_HERO_CARD") {
    return { ...state, hero_highlight: action.payload, isHeroClicked: true };
  }

  if (action.type === "GET_SINGLE_HERO_BEGIN") {
    return { ...state, hero_ability_loading: true };
  }

  if (action.type === "GET_SINGLE_HERO_SUCCESS") {
    return {
      ...state,
      hero_ability: action.payload,
      remain_point: 0,
      isPointChanged: false,
      hero_ability_loading: false,
    };
  }

  if (action.type === "ADD_HERO_POINT") {
    const { remain_point } = state;
    const { name, point } = action.payload;
    if (remain_point !== 0) {
      return {
        ...state,
        hero_ability: {
          ...state.hero_ability,
          [name]: Number(point) + 1,
        },
        remain_point: remain_point - 1,
        isPointChanged: true,
      };
    }
  }

  if (action.type === "MINUS_HERO_POINT") {
    const { remain_point } = state;
    const { name, point } = action.payload;
    if (Number(point) > 0) {
      return {
        ...state,
        hero_ability: {
          ...state.hero_ability,
          [name]: Number(point) - 1,
        },
        remain_point: remain_point + 1,
        isPointChanged: true,
      };
    }
  }

  if (action.type === "SAVE_HERO_POINT") {
    return {
      ...state,
      isPointChanged: false,
    };
  }
};

export default heroes_reducer;
