import React, {FC, ReactElement, useState} from "react";
import ReactDOM from 'react-dom'

import {blockClassesConcat, bemClassName, elementClassesConcat} from 'bem-components-connector'
import {
    getFirstDateOfMonth,
    getLastDateOfMonth,
    getMonthNameByMonthIndex,
    getNextMonth,
    getPrevMonth,
    getDayOfWeekNumber,
    getDayOfMonthNumber,
    getDateByDayOfMonthNumber,
    isDatesEqual
} from 'date-helper-js'

import SvgArrow from './img/arrow.svg'

import './style.less'


import {
    SetDateProps,
    moveDirection,
    arrowDirection,
    DateTableProps,
    MonthStatus,
    SingleDataPickerProps,
    HookProps,
    NavigationProps
} from "./types"

const block = bemClassName('single-date-picker')

const Arrow: FC<{duration: typeof arrowDirection, onClick, children}> = ({duration = 'left', onClick, children = null}) => {
    return (<div onClick={onClick} className={elementClassesConcat(block(), 'arrow', {[duration]: true})} >
        {children ? children : <SvgArrow />}
    </div>)
}

const DayOfWeekList: FC<{dayOfWeekArray?: string[]}> = ({dayOfWeekArray}) => {

    const dayOfWeekList = dayOfWeekArray.map((item, key) => {
        return (<span className={block('day-of-week')} key={key}>
            {item}
        </span>)
    })

    return (<div className={block('header-row')}>
        {dayOfWeekList}
    </div>)
}

const Navigation = ({monthNamesArray, openMonthDate, setOpenMonthDate, selectedDate, setSelectedDate, arrowContent, navContentLayout, beforeChangeMonth, afterChangeMonth, beforeChangeYear, afterChangeYear}:NavigationProps) => {

    const openMonthIndex = openMonthDate.getMonth(),
          openMonthName = getMonthNameByMonthIndex(openMonthIndex, monthNamesArray),
          openMontYearNumber = openMonthDate.getFullYear(),
          navHookData = {openMonthDate, setOpenMonthDate, openMonthName, openMontYearNumber, selectedDate, setSelectedDate},
          changeMonthAction = async (duration: typeof moveDirection) => {
              const needMonth = duration === 'next' ? getNextMonth(openMonthDate) : getPrevMonth(openMonthDate),
                    isYearWasChanged = openMonthDate.getFullYear() !== needMonth.getFullYear()

              //?????? ???? ?????????? ????????????
              if (typeof beforeChangeMonth === 'function') {
                  await beforeChangeMonth(navHookData)
              }

              //?????? ???? ?????????? ????????
              if (typeof beforeChangeYear === 'function' && isYearWasChanged) {
                  await beforeChangeYear(navHookData)
              }

              //?????????????? ??????????
              setOpenMonthDate(() => {
                  return needMonth
              })

              //?????? ?????????? ?????????? ????????????
              if (typeof afterChangeMonth === 'function') {
                  await afterChangeMonth(navHookData)
              }

              //?????? ?????????? ?????????? ????????
              if (typeof afterChangeYear === 'function' && isYearWasChanged) {
                  await afterChangeYear(navHookData)
              }

          },
          navContent = typeof navContentLayout === "function" ? navContentLayout({...navHookData, changeMonthAction}) : null


    return (<div className={block('nav')}>

        {navContent
            ? <>{navContent}</>
            : <>
                <Arrow duration={'left'} onClick={() => changeMonthAction("prev")} >{arrowContent}</Arrow>

                <div className={block('open-date')}>
                            <span className={block('month-name')} >
                                {openMonthName}
                            </span>
                    <span className={block('full-year')} >
                                {openMontYearNumber}
                            </span>
                </div>

                <Arrow duration={'right'} onClick={() => changeMonthAction('next')} >{arrowContent}</Arrow>
              </>
        }



    </div>)

}

const pushCellsToTable = (cellContentLayout: (hookData:HookProps) => ReactElement | null,
                          selectedDate: Date | null,
                          setSelectedDate: SetDateProps,
                          beforeCellClick,
                          afterCellClick
) => {
    let table: ReactElement[] = [],
        row: ReactElement[] = []


    return (monthStatus: typeof MonthStatus, pushMonth: Date, monthDaysCount: number = 0, cellModifier = '', dayForStartIteration: number = null) => {

            Array(monthDaysCount).fill('').forEach((_, key: number) => {
                let iterationStep = ++key,
                    dateNumber = dayForStartIteration ? dayForStartIteration + iterationStep : iterationStep,
                    cellDate =  getDateByDayOfMonthNumber(pushMonth, dateNumber),
                    isSelectedCell: boolean = selectedDate !== null ? isDatesEqual(cellDate, selectedDate) : false,
                    cellClasses = elementClassesConcat(block(), 'date-cell',{[cellModifier]: Boolean(cellModifier), selected: isSelectedCell}),
                    hookData = {monthStatus, cellDate, selectedDate, dateNumber},
                    cellContent = typeof cellContentLayout === 'function' ? cellContentLayout(hookData) : dateNumber


                row.push(<div
                    key={cellDate.getTime()}
                    className={cellClasses}
                    onClick={async () => {

                        //?????? ???? ??????????
                        if (typeof beforeCellClick === 'function') {
                            await beforeCellClick(cellDate)
                        }

                        setSelectedDate(() => cellDate)

                        //?????? ?????????? ??????????
                        if (typeof afterCellClick === 'function') {
                            await afterCellClick(cellDate)
                        }

                    }}
                >
                    {cellContent}
                </div>)

                if (row.length === 7) {
                    table.push(<div
                            key={table.length}
                            className={block('date-row')}
                            >
                        {row}
                    </div>)
                    row = []
                }
            })

            return [table]

    }

}

const DateTable = ({openMonthDate, selectedDate, setSelectedDate, cellContentLayout, beforeCellClick, afterCellClick}:DateTableProps) => {

    //???????? ??????????
    const prevMonth = getPrevMonth(openMonthDate),
          nextMonth = getNextMonth(openMonthDate)

    //?????????????????? ??????????(type Data, type Number) ?????????????????????? ????????????
    const lastDateOfPrevMonth = getLastDateOfMonth(prevMonth),
          lastDateNumberOfPrevMonth = getDayOfMonthNumber(lastDateOfPrevMonth)

    //?????????????? ???????? ?????????????????? ????????????
    const firstDateOfMonth = getFirstDateOfMonth(openMonthDate),
          lastDateOfMonth =  getLastDateOfMonth(openMonthDate)

    //?????? ???????????? ?????????????? ?????? ?????????????????? ????????????
    const dayOfWeekFirstDayOfMonth = getDayOfWeekNumber(firstDateOfMonth), //???????? ???????????? ?????????????? ?????????? ????????????
          dayOfWeekLastDayOfMonth = getDayOfWeekNumber(lastDateOfMonth) //???????? ???????????? ???????????????????? ?????????? ????????????
    
    //??????-???? ?????????????? ????????????
    let prevMonthDaysCount = dayOfWeekFirstDayOfMonth ? dayOfWeekFirstDayOfMonth - 1 : 6,
        openMontDaysCount = getDayOfMonthNumber(lastDateOfMonth),
        nextMonthDaysCount = dayOfWeekLastDayOfMonth ? 8 - dayOfWeekLastDayOfMonth : 0


    //?????????????? ?????????????????? ??????????????
    const pushCells = pushCellsToTable(cellContentLayout, selectedDate, setSelectedDate, beforeCellClick, afterCellClick)

    //???????? ?????????????????????? ????????????
    pushCells('prev', prevMonth, prevMonthDaysCount, 'prev', (lastDateNumberOfPrevMonth - prevMonthDaysCount))

    //???????? ???????????????? ????????????
    const [tableBeforeAddNextMonthCells] = pushCells('open', openMonthDate, openMontDaysCount)


    //???????????????????? ???????????????? ???????? ?????????????????????? ???????????? ?????? ??????
    if (tableBeforeAddNextMonthCells.length === 4) {
        nextMonthDaysCount = nextMonthDaysCount ? nextMonthDaysCount + 7 : 14
    }

    //???????????????? ?????????????????????? ???????????? ????????, ?????? ?????????? ?????????????? ??????
    if (tableBeforeAddNextMonthCells.length === 5) nextMonthDaysCount = nextMonthDaysCount || 7

    const [table] = pushCells('next', nextMonth, nextMonthDaysCount, 'next')

    return (<div className={block('table')}>
        {table}
    </div>)
}


export default function SingleDatePicker({
                                             className = '',
                                             modifiers = {},
                                             openDate = new Date(),
                                             value,
                                             monthNamesArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                                             dayOfWeekArray = ['M', 'T', 'W', 'T', 'F', 'ST', 'SN'],
                                             cellContentLayout,
                                             navContentLayout,
                                             arrowContent,
                                             beforeChangeMonth,
                                             afterChangeMonth,
                                             beforeChangeYear,
                                             afterChangeYear,
                                             beforeCellClick,
                                             afterCellClick
                                         }:SingleDataPickerProps) {

    const [selectedDate, setSelectedDate] = useState(value),
          [openMonthDate, setOpenMonthDate] = useState(openDate)

    const blockClasses = blockClassesConcat(block(), modifiers, className)
    
    return (<div className={blockClasses} >

        <div className={block('header')}>
            {Navigation({monthNamesArray, openMonthDate, setOpenMonthDate, selectedDate, arrowContent, navContentLayout, setSelectedDate, beforeChangeMonth, afterChangeMonth, beforeChangeYear, afterChangeYear})}
            {DayOfWeekList({dayOfWeekArray})}
        </div>


        {DateTable({openMonthDate, selectedDate, setSelectedDate, cellContentLayout, beforeCellClick, afterCellClick})}

    </div>)
}
