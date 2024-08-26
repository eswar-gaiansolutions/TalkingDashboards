import React from 'react';
import ReactEChartsCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import {
    PieChart as Pie,
} from 'echarts/charts';
import {
    GridComponent,
    TooltipComponent,
    TitleComponent,
} from 'echarts/components';
import {
    CanvasRenderer,
    // SVGRenderer,
} from 'echarts/renderers';
import { PieChartFallBackData } from './PieChartFallBackData';

export default function PieChart({
    title = "Apps Revenue Per District",
    chartData = PieChartFallBackData }) {

    echarts.use(
        [TitleComponent, TooltipComponent, GridComponent, Pie, CanvasRenderer]
    );

    let option = {
        title: {
            text: title,
            left: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'horizontal',
            bottom: 'bottom'
        },
        series: [
            {
                type: 'pie',
                radius: '50%',
                data: chartData,
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };

    return <ReactEChartsCore
        echarts={echarts}
        option={option}
        notMerge={true}
        lazyUpdate={true}
    />
}

