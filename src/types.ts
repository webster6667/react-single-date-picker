import {ReactElement} from "react";

export let moveDirection: 'next' | 'prev'
export let arrowDirection: 'left' | 'right'
export let MonthStatus: 'prev' | 'open' | 'next'

export interface HookProps {
    monthStatus: typeof  MonthStatus,
    cellDate: Date,
    selectedDate: Date | null,
    dateNumber: number
}

export interface NavHookProps {
    openMonthDate: Date,
    setOpenMonthDate: SetDateProps,
    openMonthName: string,
    openMontYearNumber: number,
    selectedDate: Date | null,
    setSelectedDate: SetDateProps,
    changeMonthAction?(duration: typeof moveDirection):any
}

export interface SetDateProps {
    (setFormFunc: (date: Date) => Date)
}

export interface NavigationProps {
    monthNamesArray: string[],
    openMonthDate: Date,
    setOpenMonthDate: SetDateProps,
    selectedDate: Date | null,
    setSelectedDate: SetDateProps,
    arrowContent?:ReactElement | null,
    navContentLayout?(navHookData:NavHookProps):ReactElement,
    beforeChangeMonth?(navHookData:NavHookProps):any,
    afterChangeMonth?(navHookData:NavHookProps):any,
    beforeChangeYear?(navHookData:NavHookProps):any,
    afterChangeYear?(navHookData:NavHookProps):any
}

export interface DateTableProps {
    openMonthDate: Date,
    selectedDate: Date | null,
    setSelectedDate: SetDateProps,
    cellContentLayout?(hookData:HookProps):ReactElement,
    beforeCellClick?:any,
    afterCellClick?:any,
}

export interface SingleDataPickerProps {
    className?: string,
    modifiers?: {
        [key: string]: boolean
    },
    openDate?: Date,
    value?: Date | null,
    dayOfWeekArray?: string[],
    monthNamesArray?: string[],
    cellContentLayout?(hookData:HookProps):ReactElement,
    navContentLayout?(navHookData:NavHookProps):ReactElement,
    arrowContent?:ReactElement | null,
    beforeChangeMonth?:any,
    afterChangeMonth?:any,
    beforeChangeYear?:any,
    afterChangeYear?:any,
    beforeCellClick?:any,
    afterCellClick?:any,
}