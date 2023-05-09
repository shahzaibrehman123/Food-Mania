import { useState } from "react";
import Cart from "./components/Cart/Cart.js";
import Header from "./components/Layout/Header";
import Meal from "./components/Meals/Meal";
import CardProvider from "./store/CardProvider.js";

function App() {
  const [ cartIsShown, setcartIsShown ] = useState(false);

  const showCartHandler = () => {
    setcartIsShown(true);
  };

  const hideCardHandler = () => {
    setcartIsShown(false);
  }

  return (
    <CardProvider>
      { cartIsShown && <Cart onClick={hideCardHandler}/>}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meal />
      </main>
    </CardProvider>
  );
}

export default App;
