const { useState, useEffect } = require("react")

const TopButton = () => {
  const [scrollFlag, setScrollFlag] = useState(initState);

  const updateScroll = () => {
    const { scrollY } = window;
    scrollY > 10 ? setScrollFlag(true) : setScrollFlag(flase);
  };
  const handleScroll = throttle(updateScroll, 100);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const moveToTop = () => (document.documentElement.scrollTop = 0);

  return scrollFlag ? (
    <S.TopButton.Layout onClick={moveToTop}></S.TopButton.Layout>
  )

}