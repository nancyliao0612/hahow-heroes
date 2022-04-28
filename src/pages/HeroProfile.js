import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import Alert from "../components/Alert";

function HeroProfile() {
  const { heroId } = useParams();
  const [profile, setProfile] = useState({});
  const [remainPoint, setRemainPoint] = useState(0);
  const [isPointChanged, setIsPointChanged] = useState(false);
  const [isSaveClicked, setIsSavedClicked] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    type: "",
    msg: "",
  });

  const url = `https://hahow-recruit.herokuapp.com/heroes/${heroId}/profile`;

  const fetchSingleHero = async () => {
    try {
      const response = await axios.get(url);
      const heroData = response.data;
      setProfile(heroData);
      console.log(heroData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSingleHero();
    setRemainPoint(0);
    setIsPointChanged(false);
  }, [heroId]);

  const { str, int, agi, luk } = profile;

  // Increase single hero's point
  function addPoints(e) {
    let { name } = e.target;
    let { point } = e.target.dataset;
    if (remainPoint !== 0) {
      setProfile((prevPoint) => {
        return { ...prevPoint, [name]: Number(point) + 1 };
      });
      setRemainPoint((prevRemainPoint) => prevRemainPoint - 1);
      setIsPointChanged(true);
    }
  }

  // Decrease single hero's point
  function minusPoints(e) {
    let { name } = e.target;
    let { point } = e.target.dataset;
    if (point > 0) {
      setProfile((prevPoint) => {
        return { ...prevPoint, [name]: Number(point) - 1 };
      });
      setRemainPoint((prevRemainPoint) => prevRemainPoint + 1);
      setIsPointChanged(true);
    }
  }

  const handleSave = async (e) => {
    e.preventDefault();
    // if users changed one hero point without saving it, but switch to anthoer hero's profile

    try {
      await axios.patch(url, profile, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setIsSavedClicked(true);
      showAlert(true, "success", "value changed");
    } catch (error) {
      console.log(error);
    }
  };

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  return (
    <Wrapper>
      {alert.show && (
        <Alert
          {...alert}
          removeAlert={showAlert}
          isSaveClicked={isSaveClicked}
        />
      )}
      <form onSubmit={handleSave}>
        {Object.keys(profile).map((key, index) => {
          const value = profile[key];
          return (
            <div key={index}>
              <span>{key}</span>
              <button
                type="button"
                onClick={addPoints}
                name={key}
                data-point={value}
                disabled={remainPoint === 0 ? true : false}
              >
                +
              </button>
              <span>{value}</span>
              <button
                type="button"
                onClick={minusPoints}
                name={key}
                data-point={value}
              >
                -
              </button>
            </div>
          );
        })}
        <section>
          <p>剩餘點數：{remainPoint}</p>
          <button
            className="submit-btn"
            disabled={remainPoint === 0 ? false : true}
          >
            儲存
          </button>
        </section>
      </form>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  // border: solid 1px;
  margin-top: 2rem;
  padding: 2rem 3rem;
  font-size: 1.8rem;
  background-color: var(--clr-primary-3);
  position: relative;

  div {
    margin-bottom: 2rem;
  }

  span {
    display: inline-block;
    text-align: center;
  }

  span:nth-child(1) {
    margin-right: 3rem;
    width: 3rem;
  }

  span:last-of-type {
    width: 3rem;
  }

  button:nth-child(n) {
    border-style: none;
    border-radius: 0.5rem;
    font-size: 2.4rem;
    color: var(--clr-primary-1);
    background: white;
    margin: 0 2rem;
    height: 5rem;
    width: 5rem;
    cursor: pointer;
  }

  section {
    position: absolute;
    // border: solid 1px;
    bottom: 3rem;
    right: 3rem;
  }

  section p {
    margin-bottom: 1rem;
  }

  section .submit-btn {
    font-size: 2rem;
    margin: 0;
    width: 20rem;
  }

  button:disabled {
    cursor: not-allowed;
    opacity: 55%;
  }
`;

export default HeroProfile;
