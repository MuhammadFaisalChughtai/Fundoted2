import React, { Fragment } from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
const stripeBtn = ({
  amount,
  pid,
  catogary,
  title,
  author,
  discription,
  image,
  goal,
  days,
  pledged,
  noOfBackers,
  expDate,
  expectedDonation,
  maximumDonation,
  city,
  country,
  funding,
}) => {
  const publishableKey =
    "pk_test_51LQyMDKrhyc13hMnHkZoiJaXAyIj50XvYJVbI1z6Tg6vWKy5RbOj5E3hA5yjpbeiCneuOOW1CS85HT43a81HRC2d002LSxbi9n";
  amount = amount && amount * 10;
  amount = amount && amount * 10;
  const onToken = (token) => {
    const body = {
      amount: amount,
      token: token,
      pid,
      catogary,
      title,
      author,
      discription,
      image,
      goal,
      days,
      pledged,
      noOfBackers,
      expDate,
      expectedDonation,
      maximumDonation,
      city,
      country,
      funding,
    };
    axios
      .post("http://localhost:5000/api/v4/campaign/fund-now", body)
      .then((response) => {
        console.log(response);
        alert("Payment Success");
      })
      .catch((error) => {
        console.log("Payment Error: ", error);
        alert("Payment Error");
      });
  };
  return (
    <StripeCheckout
      label="Fund Now" //Component button text
      name="Fundoted" //Modal Header
      description="Support Us"
      panelLabel="Go Premium" //Submit button in modal
      amount={amount} //Amount in cents $9.99
      token={onToken}
      stripeKey={publishableKey}
      image="https://www.pngitem.com/pimgs/m/581-5813504_avatar-dummy-png-transparent-png.png" //Pop-in header image
      billingAddress={true}
    />
  );
};
export default stripeBtn;
