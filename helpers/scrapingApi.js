import * as cheerio from 'cheerio';
export const getAllGemeineTrends = async () => {
    try {
        const chartData = [];
        const response = await fetch("https://trends24.in/germany/")
        const result = await response.text()
        const $ = cheerio.load(result)

        const trends = {
        }

        $('.list-container ol').first().find('li').each((index, ele) => {
            const $ele = $(ele);
            const trend = $ele.find('a').text()
            trends[`${index + 1}`] = trend;
            chartData.push(trends);
        })

        const formatedData = [{
            'latest': Object.fromEntries(Object.entries(chartData[0]).slice(0, 20)),
            '1 hour': Object.fromEntries(Object.entries(chartData[1]).slice(0, 20)),
            '2 hour': Object.fromEntries(Object.entries(chartData[2]).slice(0, 20)),
            '3 hour': Object.fromEntries(Object.entries(chartData[3]).slice(0, 20)),
            '4 hour': Object.fromEntries(Object.entries(chartData[4]).slice(0, 20)),
            '5 hour': Object.fromEntries(Object.entries(chartData[5]).slice(0, 20)),
            '6 hour': Object.fromEntries(Object.entries(chartData[6]).slice(0, 20)),
            '7 hour': Object.fromEntries(Object.entries(chartData[7]).slice(0, 20)),
            '8 hour': Object.fromEntries(Object.entries(chartData[8]).slice(0, 20)),
            '9 hour': Object.fromEntries(Object.entries(chartData[9]).slice(0, 20)),
            '10 hour': Object.fromEntries(Object.entries(chartData[10]).slice(0, 20)),
            '11 hour': Object.fromEntries(Object.entries(chartData[11]).slice(0, 20)),
            '12 hour': Object.fromEntries(Object.entries(chartData[12]).slice(0, 20)),
            '13 hour': Object.fromEntries(Object.entries(chartData[13]).slice(0, 20)),
            '14 hour': Object.fromEntries(Object.entries(chartData[14]).slice(0, 20)),
            '15 hour': Object.fromEntries(Object.entries(chartData[16]).slice(0, 20)),
        }]

        return formatedData[0].latest

    } catch (error) {
        throw new Error(error)
    }
}