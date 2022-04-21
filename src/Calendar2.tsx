import ja from "date-fns/esm/locale/ja";
import moment from "moment";
import { FC, Fragment, useState } from "react";
import ReactDatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Calendar.css";
import getMonth from "date-fns/getMonth";
import getYear from "date-fns/getYear";
import _ from "lodash";

import { Button1 } from "./button/Button1";
import { PrimaryButton } from "./button/PrimaryButton";

type Props = {
  onClickBack: (val: any) => void;
};

registerLocale("ja", ja);
const years = _.range(2000, getYear(new Date()) + 1, 1);
const months = Array.from(Array(12).keys());

export const Calendar2: FC<Props> = (props: Props) => {
  const { onClickBack } = props;
  const parseAsMoment = (dateTimeStr: string) => {
    return moment.utc(dateTimeStr, "YYYY-MM-DDTHH:mm:00Z", "ja").utcOffset(9);
  };
  const toUtcIso8601str = (momentInstance: any) => {
    return momentInstance.clone().utc().format("YYYY-MM-DDTHH:mm:00Z");
  };
  const [startDate, setStartDate] = useState(toUtcIso8601str(moment()));
  const [endDate, setEndDate] = useState(toUtcIso8601str(moment()));
  const handleChangeStart = (selectedDate: Date | null) => {
    setStartDate(toUtcIso8601str(moment(selectedDate)));
  };
  const handleChangeEnd = (selectedDate: Date | null) => {
    setEndDate(toUtcIso8601str(moment(selectedDate)));
  };

  return (
    <Fragment>
      <div className="input-area">
        <br />
        {
          <>
            <div>
              <div style={{ float: `left` }}>
                <p className="startendtitle">開始日</p>
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
                <p className="startendtitle">終了日</p>
                <ReactDatePicker
                  inline
                  locale="ja"
                  selected={moment(endDate).toDate()}
                  selectsEnd
                  startDate={moment(startDate).toDate()}
                  endDate={moment(endDate).toDate()}
                  onChange={handleChangeEnd}
                  minDate={moment(startDate).toDate()}
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
            <PrimaryButton
              onClick={() =>
                onClickBack(
                  parseAsMoment(startDate).format("YYYY/MM/DD"),
                  parseAsMoment(endDate).format("YYYY/MM/DD")
                )
              }
            >
              確定
            </PrimaryButton>
          </>
        }
      </div>
      <br />
    </Fragment>
  );
};
