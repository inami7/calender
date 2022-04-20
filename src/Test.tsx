import React, { FC, Fragment, memo, useMemo, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "./Calendar.css";
import { Input } from "@chakra-ui/react";
import { Calendar2 } from "./Calendar2";

export const Test: FC = memo(() => {
  // 表示フラグ
  const [showFlag, setshowFlag] = useState(false);
  const onClickSwitchShowFlag = () => {
    setshowFlag(!showFlag);
  };
  const onClickBack = (start: string, end: string) => {
    const selectdate = start + "~" + end;
    console.log(selectdate);
  };

  return (
    <Fragment>
      <div className="input-area">
        <Input
          placeholder="日付を入力"
          onClick={onClickSwitchShowFlag}
          style={{ float: `left` }}
        />
        <br />
        {!showFlag && <Calendar2 onClickBack={onClickBack} />}
      </div>
      <br />
    </Fragment>
  );
});
