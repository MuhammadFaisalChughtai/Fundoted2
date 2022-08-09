import React from "react";
import StripeBtn from "./stripeBtn";
function Payment() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Stripe Checkout - ReactJS</p>
        <StripeBtn />
      </header>
    </div>
  );
}

export default Payment;
