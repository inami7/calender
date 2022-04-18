import { getDay } from "date-fns";
import ja from "date-fns/esm/locale/ja";
import moment from "moment";
import { Fragment, useState } from "react";
import ReactDatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Calendar.css";
registerLocale("ja", ja);

export const Calendar = () => {
  const parseAsMoment = (dateTimeStr: string) => {
    return moment.utc(dateTimeStr, "YYYY-MM-DDTHH:mm:00Z", "ja").utcOffset(9);
  };
  const toUtcIso8601str = (momentInstance: any) => {
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
  const isWeekday = (date: Date) => {
    const day = getDay(date);
    return day !== 0 && day !== 6;
  };
  return (
    <Fragment>
      <div className="input-area">
        <input
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
                showPreviousMonths
                customInput={
                  <button>
                    {startDate && parseAsMoment(startDate).format("YYYY/MM/DD")}
                  </button>
                }
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
                filterDate={isWeekday}
                customInput={
                  <button>
                    {endDate && parseAsMoment(endDate).format("YYYY/MM/DD")}
                  </button>
                }
              />
            </div>
            <br />
            <button onClick={onClickAdd}>確定</button>
          </div>
        )}
      </div>
      <br />
    </Fragment>
  );
};
