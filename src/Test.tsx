import ja from "date-fns/esm/locale/ja";
import moment from "moment";
import { Fragment, useState } from "react";
import ReactDatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import getMonth from "date-fns/getMonth";
import getYear from "date-fns/getYear";
import _ from "lodash";
import { Box, Divider, Flex, Heading, Input, Stack } from "@chakra-ui/react";

import { PrimaryButton } from "./button/PrimaryButton";
import { Button1 } from "./button/Button1";
registerLocale("ja", ja);
const years = _.range(2000, getYear(new Date()) + 1, 1);
const months = Array.from(Array(12).keys());

export const Test = () => {
  const parseAsMoment = (dateTimeStr: string) => {
    return moment.utc(dateTimeStr, "YYYY-MM-DDTHH:mm:00Z", "ja").utcOffset(9);
  };
  const toUtcIso8601str = (momentInstance) => {
    return momentInstance.clone().utc().format("YYYY-MM-DDTHH:mm:00Z");
  };
  const [startDate, setStartDate] = useState(toUtcIso8601str(moment()));
  const [endDate, setEndDate] = useState(toUtcIso8601str(moment()));
  const handleChangeStart = (selectedDate: string) => {
    setStartDate(toUtcIso8601str(moment(selectedDate)));
  };
  const handleChangeEnd = (selectedDate: string) => {
    setEndDate(toUtcIso8601str(moment(selectedDate)));
  };
  // 表示フラグ
  const [showFlag, setshowFlag] = useState(false);
  const onClickAdd = () => {
    console.log("startDate", parseAsMoment(startDate).format("YYYY/MM/DD"));
    console.log("endDate", parseAsMoment(endDate).format("YYYY/MM/DD"));
    setshowFlag(!showFlag);
  };
  const onClickSwitchShowFlag = () => {
    setshowFlag(!showFlag);
  };

  return (
    <Fragment>
      <div className="input-area">
        <Input
          placeholder="日付を入力"
          value={
            startDate &&
            parseAsMoment(startDate).format("YYYY/MM/DD") +
              "~" +
              parseAsMoment(endDate).format("YYYY/MM/DD")
          }
          onClick={onClickSwitchShowFlag}
          style={{ float: `left` }}
        />
        <br />
        {showFlag && (
          <>
            <div>
              <div style={{ float: `left` }}>
                <ReactDatePicker
                  inline
                  locale="ja"
                  selected={moment(startDate).toDate()}
                  selectsStart
                  startDate={moment(startDate).toDate()}
                  endDate={moment(endDate).toDate()}
                  onChange={handleChangeStart}
                  customInput={
                    <button>
                      {startDate &&
                        parseAsMoment(startDate).format("YYYY/MM/DD")}
                    </button>
                  }
                  renderCustomHeader={({
                    date,
                    changeYear,
                    changeMonth,
                    decreaseMonth,
                    increaseMonth,
                    prevMonthButtonDisabled,
                    nextMonthButtonDisabled
                  }) => (
                    <div>
                      <title>開始日</title>
                      <Button1
                        onClick={decreaseMonth}
                        disabled={prevMonthButtonDisabled}
                      >
                        {`＜`}
                      </Button1>
                      <select
                        value={getYear(date)}
                        onChange={({ target: { value } }) => changeYear(value)}
                      >
                        {years.map((option) => (
                          <option key={option} value={option}>
                            {option}年
                          </option>
                        ))}
                      </select>
                      <select
                        value={getMonth(date)}
                        onChange={({ target: { value } }) => changeMonth(value)}
                      >
                        {months.map((option) => (
                          <option key={option} value={option}>
                            {option + 1}月
                          </option>
                        ))}
                      </select>
                      <Button1
                        onClick={increaseMonth}
                        disabled={nextMonthButtonDisabled}
                      >
                        {`＞`}
                      </Button1>
                    </div>
                  )}
                />
              </div>
              <div style={{ float: `left` }}>
                <ReactDatePicker
                  inline
                  locale="ja"
                  selected={moment(endDate).toDate()}
                  selectsEnd
                  startDate={moment(startDate).toDate()}
                  endDate={moment(endDate).toDate()}
                  onChange={handleChangeEnd}
                  customInput={
                    <button>
                      {endDate && parseAsMoment(endDate).format("YYYY/MM/DD")}
                    </button>
                  }
                  renderCustomHeader={({
                    date,
                    changeYear,
                    changeMonth,
                    decreaseMonth,
                    increaseMonth,
                    prevMonthButtonDisabled,
                    nextMonthButtonDisabled
                  }) => (
                    <div>
                      <Button1
                        onClick={decreaseMonth}
                        disabled={prevMonthButtonDisabled}
                      >
                        {`＜`}
                      </Button1>
                      <select
                        value={getYear(date)}
                        onChange={({ target: { value } }) => changeYear(value)}
                      >
                        {years.map((option) => (
                          <option key={option} value={option}>
                            {option}年
                          </option>
                        ))}
                      </select>
                      <select
                        value={getMonth(date)}
                        onChange={({ target: { value } }) => changeMonth(value)}
                      >
                        {months.map((option) => (
                          <option key={option} value={option}>
                            {option + 1}月
                          </option>
                        ))}
                      </select>
                      <Button1
                        onClick={increaseMonth}
                        disabled={nextMonthButtonDisabled}
                      >
                        {`＞`}
                      </Button1>
                    </div>
                  )}
                />
              </div>
              <br />
            </div>
            <PrimaryButton onClick={onClickAdd}>確定</PrimaryButton>
          </>
        )}
      </div>
      <br />
    </Fragment>
  );
};
