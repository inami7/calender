import React, { FC, Fragment, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "./Calendar.css";
import { Input } from "@chakra-ui/react";
import { Calendar2 } from "./Calendar2";

let total: string = "";

export const Test: FC = () => {
  // 表示フラグ
  const [showFlag, setshowFlag] = useState(false);
  const onClickSwitchShowFlag = () => {
    setshowFlag(!showFlag);
  };

  const onClickBack = (start: string, end: string) => {
    total = start + "~" + end;
    setshowFlag(!showFlag);
    console.log(total);
    return total;
  };
  return (
    <Fragment>
      <div className="input-area">
        <Input
          placeholder="日付を入力"
          onClick={onClickSwitchShowFlag}
          style={{ float: `left` }}
          value={total}
        />
        <br />
        {!showFlag && <Calendar2 onClickBack={onClickBack} />}
      </div>
      <br />
    </Fragment>
  );
};
