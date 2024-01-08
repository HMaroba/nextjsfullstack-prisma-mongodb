import React from "react";

type Props = {
  name: string;
  gender: "male" | "female";
  phoneNumber: string;
};

const LearnProps = ({ name, gender, phoneNumber }: Props) => {
  return (
    <div>
      <p>
        My name is {name} , my phone number is {phoneNumber} and i am {gender}
      </p>
    </div>
  );
};

export default LearnProps;
