import {format} from "date-fns/esm";
import {routes} from "@/router";
import {addDays} from "date-fns";

/**
 * 一个居民信息转来转去的工具
 * @param residents
 * @returns {*}
 */
export const ConvertResidentInformation = {
    /**
     * 将居民信息转换成表格数据
     * 1. 编辑数据应该将时间字符串转换成时间戳
     * @param resident
     * @returns {*}
     * @constructor
     */
    TableToEditForm: (resident) => {
        resident.inParkTime = resident.inParkTime.map(([start, end]) => {
            return [new Date(start).getTime(), new Date(end).getTime()]
        })
        return resident
    },

    /**
     * 将表格数据转换成API数据
     * 1. 将时间戳转换成时间字符串，并转换成 JSON 字符串
     * 2. 将tags数组转换成字符串
     * @param resident
     * @returns {*}
     * @constructor
     */
    EditFormToAPI: (resident) => {
        resident.inParkTime = resident.inParkTime.map(([start, end]) => {
            return [format(new Date(start), 'yyyy-MM-dd'), format(new Date(end), 'yyyy-MM-dd')]
        })
        resident.inParkTime = JSON.stringify(resident.inParkTime)
        resident.tags = resident.tags.join(',')
        return resident
    },

    /**
     * 将API数据转换成表格数据
     * 1. 将时间JSON字符串转换成时间戳的字符串数组
     * 2. 将tags字符串转换成数组
     * @param resident
     * @returns {*}
     * @constructor
     */
    APIToTable: (resident) => {
        resident.inParkTime = JSON.parse(resident.inParkTime)
        if (resident.tags.length > 0) {
            resident.tags = resident.tags.split(',')
        } else {
            resident.tags = []
        }
        return resident
    },

    /**
     * 将表格数据转换成编辑数据
     * 1. 将时间戳转换成时间字符串
     * @param resident
     * @returns {*}
     * @constructor
     */
    EditFormToTable: (resident) => {
        resident.inParkTime = resident.inParkTime.map(([start, end]) => {
            return [format(new Date(start), 'yyyy-MM-dd'), format(new Date(end), 'yyyy-MM-dd')]
        })
        return resident
    }
}

export const currentRouterName = () => {
    const hash = window.location.hash.substring(1)
    for (let route of routes) {
        if (route.path === hash) {
            return route.name
        }
    }
}

export const DateUtils = {
    /**
     * 将时间戳转换成时间字符串
     * @param timestamp
     * @returns {string}
     */
    timestampToString: (timestamp) => {
        return format(new Date(timestamp), 'yyyy-MM-dd')
    },

    /**
     * 获得今天之后的日期字符串数组
     * @param days          天数
     * @param containToday 是否包含今天
     * @returns {*[]}
     */
    getDaysAfterToday: (days, containToday = true) => {
        const today = new Date();
        const dates = [];
        for (let i = containToday ? 0 : 1; i <= days; i++) {
            const date = addDays(today, i);
            dates.push(format(date, 'yyyy-MM-dd'));
        }
        return dates;
    },

    subDays: (date, days) => {
        date = new Date(date);
        return format(addDays(date, -days), 'yyyy-MM-dd')
    }
}