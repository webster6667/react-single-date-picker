import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import _asyncToGenerator from '@babel/runtime/helpers/asyncToGenerator';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import _regeneratorRuntime from '@babel/runtime/regenerator';
import React, { useState } from 'react';
import { blockClassesConcat, bemClassName, elementClassesConcat } from 'bem-components-connector';
import { getMonthNameByMonthIndex, getNextMonth, getPrevMonth, getLastDateOfMonth, getDayOfMonthNumber, getFirstDateOfMonth, getDayOfWeekNumber, getDateByDayOfMonthNumber, isDatesEqual } from 'date-helper-js';

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var SvgArrow = (({
  styles = {},
  ...props
}) => /*#__PURE__*/React.createElement("svg", _extends({
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 240.823 240.823"
}, props), /*#__PURE__*/React.createElement("path", {
  d: "M183.189 111.816L74.892 3.555c-4.752-4.74-12.451-4.74-17.215 0-4.752 4.74-4.752 12.439 0 17.179l99.707 99.671-99.695 99.671c-4.752 4.74-4.752 12.439 0 17.191 4.752 4.74 12.463 4.74 17.215 0l108.297-108.261c4.68-4.691 4.68-12.511-.012-17.19z"
})));

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = ".single-date-picker {\n  display: inline-flex;\n  flex-direction: column;\n}\n.single-date-picker__header {\n  display: flex;\n  flex-direction: column;\n}\n.single-date-picker__nav {\n  display: flex;\n  align-items: center;\n  padding: 5px 0;\n}\n.single-date-picker__open-date {\n  display: flex;\n  margin: 0 auto;\n}\n.single-date-picker__open-date span {\n  align-items: center;\n  justify-content: center;\n  margin: 0 2px;\n  font-size: 12px;\n  color: black;\n}\n.single-date-picker__arrow {\n  position: relative;\n  width: 20px;\n  height: 20px;\n  cursor: pointer;\n}\n.single-date-picker__arrow svg {\n  width: 10px;\n  fill: slategrey;\n}\n.single-date-picker__arrow:hover svg {\n  fill: black;\n}\n.single-date-picker__arrow_left svg {\n  transform: rotate(180deg);\n  transform-origin: center;\n}\n.single-date-picker__arrow_left:hover {\n  transform: translateX(-1px);\n}\n.single-date-picker__arrow_right:hover {\n  transform: translateX(1px);\n}\n.single-date-picker__header-row {\n  display: flex;\n  padding: 5px 0;\n}\n.single-date-picker__day-of-week {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  width: 25px;\n  height: 25px;\n  margin: 1px;\n  color: silver;\n  font-size: 9px;\n}\n.single-date-picker__table {\n  display: flex;\n  flex-direction: column;\n}\n.single-date-picker__date-row {\n  display: flex;\n}\n.single-date-picker__date-cell {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  width: 21px;\n  height: 21px;\n  margin: 1px;\n  font-size: 12px;\n  cursor: pointer;\n  border: 2px solid transparent;\n}\n.single-date-picker__date-cell:hover:not(.single-date-picker__date-cell_selected) {\n  border-radius: 50%;\n  border-color: silver;\n}\n.single-date-picker__date-cell_prev,\n.single-date-picker__date-cell_next {\n  opacity: .5;\n}\n.single-date-picker__date-cell_selected {\n  cursor: auto;\n  border-radius: 50%;\n  border: 2px solid #d8d7d7;\n  background-color: #d8d7d7;\n}\n";
styleInject(css_248z);

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var block = bemClassName('single-date-picker');

var Arrow = function Arrow(_ref) {
  var _ref$duration = _ref.duration,
      duration = _ref$duration === void 0 ? 'left' : _ref$duration,
      onClick = _ref.onClick,
      _ref$children = _ref.children,
      children = _ref$children === void 0 ? null : _ref$children;
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    className: elementClassesConcat(block(), 'arrow', _defineProperty({}, duration, true))
  }, children ? children : /*#__PURE__*/React.createElement(SvgArrow, null));
};

var DayOfWeekList = function DayOfWeekList(_ref2) {
  var _ref2$dayOfWeekArray = _ref2.dayOfWeekArray,
      dayOfWeekArray = _ref2$dayOfWeekArray === void 0 ? ['П', 'В', 'С', 'Ч', 'П', 'С', 'В'] : _ref2$dayOfWeekArray;
  var dayOfWeekList = dayOfWeekArray.map(function (item, key) {
    return /*#__PURE__*/React.createElement("span", {
      className: block('day-of-week'),
      key: key
    }, item);
  });
  return /*#__PURE__*/React.createElement("div", {
    className: block('header-row')
  }, dayOfWeekList);
};

var Navigation = function Navigation(_ref3) {
  var openMonthDate = _ref3.openMonthDate,
      setOpenMonthDate = _ref3.setOpenMonthDate,
      selectedDate = _ref3.selectedDate,
      setSelectedDate = _ref3.setSelectedDate,
      arrowContent = _ref3.arrowContent,
      navContentLayout = _ref3.navContentLayout,
      beforeChangeMonth = _ref3.beforeChangeMonth,
      afterChangeMonth = _ref3.afterChangeMonth,
      beforeChangeYear = _ref3.beforeChangeYear,
      afterChangeYear = _ref3.afterChangeYear;

  var openMonthIndex = openMonthDate.getMonth(),
      openMonthName = getMonthNameByMonthIndex(openMonthIndex),
      openMontYearNumber = openMonthDate.getFullYear(),
      navHookData = {
    openMonthDate: openMonthDate,
    setOpenMonthDate: setOpenMonthDate,
    openMonthName: openMonthName,
    openMontYearNumber: openMontYearNumber,
    selectedDate: selectedDate,
    setSelectedDate: setSelectedDate
  },
      changeMonthAction = /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(duration) {
      var needMonth, isYearWasChanged;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              needMonth = duration === 'next' ? getNextMonth(openMonthDate) : getPrevMonth(openMonthDate), isYearWasChanged = openMonthDate.getFullYear() !== needMonth.getFullYear(); //Хук до смены месяца

              if (!(typeof beforeChangeMonth === 'function')) {
                _context.next = 4;
                break;
              }

              _context.next = 4;
              return beforeChangeMonth(navHookData);

            case 4:
              if (!(typeof beforeChangeYear === 'function' && isYearWasChanged)) {
                _context.next = 7;
                break;
              }

              _context.next = 7;
              return beforeChangeYear(navHookData);

            case 7:
              //Сменить месяц
              setOpenMonthDate(function () {
                return needMonth;
              }); //Хук после смены месяца

              if (!(typeof afterChangeMonth === 'function')) {
                _context.next = 11;
                break;
              }

              _context.next = 11;
              return afterChangeMonth(navHookData);

            case 11:
              if (!(typeof afterChangeYear === 'function' && isYearWasChanged)) {
                _context.next = 14;
                break;
              }

              _context.next = 14;
              return afterChangeYear(navHookData);

            case 14:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function changeMonthAction(_x) {
      return _ref4.apply(this, arguments);
    };
  }(),
      navContent = typeof navContentLayout === "function" ? navContentLayout(_objectSpread(_objectSpread({}, navHookData), {}, {
    changeMonthAction: changeMonthAction
  })) : null;

  return /*#__PURE__*/React.createElement("div", {
    className: block('nav')
  }, navContent ? /*#__PURE__*/React.createElement(React.Fragment, null, navContent) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Arrow, {
    duration: 'left',
    onClick: function onClick() {
      return changeMonthAction("prev");
    }
  }, arrowContent), /*#__PURE__*/React.createElement("div", {
    className: block('open-date')
  }, /*#__PURE__*/React.createElement("span", {
    className: block('month-name')
  }, openMonthName), /*#__PURE__*/React.createElement("span", {
    className: block('full-year')
  }, openMontYearNumber)), /*#__PURE__*/React.createElement(Arrow, {
    duration: 'right',
    onClick: function onClick() {
      return changeMonthAction('next');
    }
  }, arrowContent)));
};

var pushCellsToTable = function pushCellsToTable(cellContentLayout, selectedDate, setSelectedDate, beforeCellClick, afterCellClick) {
  var table = [],
      row = [];
  return function (monthStatus, pushMonth) {
    var monthDaysCount = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var cellModifier = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
    var dayForStartIteration = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
    Array(monthDaysCount).fill('').forEach(function (_, key) {
      var _elementClassesConcat2;

      var iterationStep = ++key,
          dateNumber = dayForStartIteration ? dayForStartIteration + iterationStep : iterationStep,
          cellDate = getDateByDayOfMonthNumber(pushMonth, dateNumber),
          isSelectedCell = selectedDate !== null ? isDatesEqual(cellDate, selectedDate) : false,
          cellClasses = elementClassesConcat(block(), 'date-cell', (_elementClassesConcat2 = {}, _defineProperty(_elementClassesConcat2, cellModifier, Boolean(cellModifier)), _defineProperty(_elementClassesConcat2, "selected", isSelectedCell), _elementClassesConcat2)),
          hookData = {
        monthStatus: monthStatus,
        cellDate: cellDate,
        selectedDate: selectedDate,
        dateNumber: dateNumber
      },
          cellContent = typeof cellContentLayout === 'function' ? cellContentLayout(hookData) : dateNumber;
      row.push( /*#__PURE__*/React.createElement("div", {
        key: cellDate.getTime(),
        className: cellClasses,
        onClick: /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
          return _regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  if (!(typeof beforeCellClick === 'function')) {
                    _context2.next = 3;
                    break;
                  }

                  _context2.next = 3;
                  return beforeCellClick(cellDate);

                case 3:
                  setSelectedDate(function () {
                    return cellDate;
                  }); //Хук после клика

                  if (!(typeof afterCellClick === 'function')) {
                    _context2.next = 7;
                    break;
                  }

                  _context2.next = 7;
                  return afterCellClick(cellDate);

                case 7:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }))
      }, cellContent));

      if (row.length === 7) {
        table.push( /*#__PURE__*/React.createElement("div", {
          key: table.length,
          className: block('date-row')
        }, row));
        row = [];
      }
    });
    return [table];
  };
};

var DateTable = function DateTable(_ref6) {
  var openMonthDate = _ref6.openMonthDate,
      selectedDate = _ref6.selectedDate,
      setSelectedDate = _ref6.setSelectedDate,
      cellContentLayout = _ref6.cellContentLayout,
      beforeCellClick = _ref6.beforeCellClick,
      afterCellClick = _ref6.afterCellClick;
  //Пред месяц
  var prevMonth = getPrevMonth(openMonthDate),
      nextMonth = getNextMonth(openMonthDate); //Последнее число(type Data, type Number) предыдущего месяца

  var lastDateOfPrevMonth = getLastDateOfMonth(prevMonth),
      lastDateNumberOfPrevMonth = getDayOfMonthNumber(lastDateOfPrevMonth); //Крайние даты открытого месяца

  var firstDateOfMonth = getFirstDateOfMonth(openMonthDate),
      lastDateOfMonth = getLastDateOfMonth(openMonthDate); //Дни недели крайних дат открытого месяца

  var dayOfWeekFirstDayOfMonth = getDayOfWeekNumber(firstDateOfMonth),
      //День недели первого числа месяца
  dayOfWeekLastDayOfMonth = getDayOfWeekNumber(lastDateOfMonth); //День недели последнего числа месяца
  //Кол-во каждого месяца

  var prevMonthDaysCount = dayOfWeekFirstDayOfMonth ? dayOfWeekFirstDayOfMonth - 1 : 6,
      openMontDaysCount = getDayOfMonthNumber(lastDateOfMonth),
      nextMonthDaysCount = dayOfWeekLastDayOfMonth ? 8 - dayOfWeekLastDayOfMonth : 0; //Функция генерация таблици

  var pushCells = pushCellsToTable(cellContentLayout, selectedDate, setSelectedDate, beforeCellClick, afterCellClick); //Даты предыдущего месяца

  pushCells('prev', prevMonth, prevMonthDaysCount, 'prev', lastDateNumberOfPrevMonth - prevMonthDaysCount); //Даты текущего месяца

  var _pushCells = pushCells('open', openMonthDate, openMontDaysCount),
      _pushCells2 = _slicedToArray(_pushCells, 1),
      tableBeforeAddNextMonthCells = _pushCells2[0]; //Подсчитать добавить одну недостающую строку или две


  if (tableBeforeAddNextMonthCells.length === 4) {
    nextMonthDaysCount = nextMonthDaysCount ? nextMonthDaysCount + 7 : 14;
  } //Добавить закрывающие строку даты, или целую строчку дат


  if (tableBeforeAddNextMonthCells.length === 5) nextMonthDaysCount = nextMonthDaysCount || 7;

  var _pushCells3 = pushCells('next', nextMonth, nextMonthDaysCount, 'next'),
      _pushCells4 = _slicedToArray(_pushCells3, 1),
      table = _pushCells4[0];

  return /*#__PURE__*/React.createElement("div", {
    className: block('table')
  }, table);
};

function SingleDatePicker(_ref7) {
  var _ref7$className = _ref7.className,
      className = _ref7$className === void 0 ? '' : _ref7$className,
      _ref7$modifiers = _ref7.modifiers,
      modifiers = _ref7$modifiers === void 0 ? {} : _ref7$modifiers,
      _ref7$openDate = _ref7.openDate,
      openDate = _ref7$openDate === void 0 ? new Date() : _ref7$openDate,
      value = _ref7.value,
      cellContentLayout = _ref7.cellContentLayout,
      navContentLayout = _ref7.navContentLayout,
      arrowContent = _ref7.arrowContent,
      beforeChangeMonth = _ref7.beforeChangeMonth,
      afterChangeMonth = _ref7.afterChangeMonth,
      beforeChangeYear = _ref7.beforeChangeYear,
      afterChangeYear = _ref7.afterChangeYear,
      beforeCellClick = _ref7.beforeCellClick,
      afterCellClick = _ref7.afterCellClick;

  var _useState = useState(value),
      _useState2 = _slicedToArray(_useState, 2),
      selectedDate = _useState2[0],
      setSelectedDate = _useState2[1],
      _useState3 = useState(openDate),
      _useState4 = _slicedToArray(_useState3, 2),
      openMonthDate = _useState4[0],
      setOpenMonthDate = _useState4[1];

  var blockClasses = blockClassesConcat(block(), modifiers, className);
  return /*#__PURE__*/React.createElement("div", {
    className: blockClasses
  }, /*#__PURE__*/React.createElement("div", {
    className: block('header')
  }, Navigation({
    openMonthDate: openMonthDate,
    setOpenMonthDate: setOpenMonthDate,
    selectedDate: selectedDate,
    arrowContent: arrowContent,
    navContentLayout: navContentLayout,
    setSelectedDate: setSelectedDate,
    beforeChangeMonth: beforeChangeMonth,
    afterChangeMonth: afterChangeMonth,
    beforeChangeYear: beforeChangeYear,
    afterChangeYear: afterChangeYear
  }), /*#__PURE__*/React.createElement(DayOfWeekList, null)), DateTable({
    openMonthDate: openMonthDate,
    selectedDate: selectedDate,
    setSelectedDate: setSelectedDate,
    cellContentLayout: cellContentLayout,
    beforeCellClick: beforeCellClick,
    afterCellClick: afterCellClick
  }));
}

export default SingleDatePicker;
