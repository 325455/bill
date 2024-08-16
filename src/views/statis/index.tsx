import React, { memo, useEffect, useState } from 'react';
import { StatisWrapper } from './style';
import { CalendarO } from '@react-vant/icons';
import { DatePicker } from 'zarm';
import dayjs from 'dayjs';
import * as echarts from 'echarts';
import taxios from '@/services';

interface IBill {
  billId: number;
  billType: string;
  createAt: string;
  money: number;
  remark: string;
}

const Statis: React.FC = () => {
  const [date, setDate] = useState(new Date());
  const [isShowDatePicker, setIsShowDatePicker] = useState(false);
  const [list, setList] = useState<any>({});

  useEffect(() => {
    getList();
  }, [date]);

  //服务器返回的一个月的数据
  let lineChart;
  let roseChart: echarts.ECharts;
  const getList = async () => {
    const { data } = await taxios.get(`/bill/getBillList/全部类型/${+date}`);
    setList(data.list);
    const [lineChartSeries, roseChartSeries] = conutStatis(data.list);
    generBarChart(lineChartSeries);
    generRoseChart(roseChartSeries);
  };

  //计算两个图表的数据
  const conutStatis = (list: []) => {
    //初始化数据,该月的每天
    let _lineChartSeries: any = [[], []];
    let _roseChartSeries: any = [[], []];
    const tempDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    for (let i = 1; i <= tempDate.getDate(); i++) {
      _lineChartSeries[0].push(0);
      _lineChartSeries[1].push(0);
    }
    //lineChartSeries[0]收入，[1]支出
    list.forEach((bill: IBill) => {
      //计算柱状图数据
      const index = dayjs(+bill.createAt).date();
      bill.billType === '收入' && (_lineChartSeries[0][index - 1] += +bill.money);
      bill.billType === '支出' && (_lineChartSeries[1][index - 1] += +bill.money);
      //计算饼图数据
      //如果remark已经存在，就增加金额，不存在就创建相应的对象
      if (bill.billType === '收入') {
        for (let i = 0; i < _roseChartSeries[0].length; i++) {
          if (bill.remark === _roseChartSeries[0][i].name) {
            _roseChartSeries[0][i].value += bill.money;
            return;
          }
        }
        _roseChartSeries[0].push({ name: bill.remark, value: bill.money });
      }
      if (bill.billType === '支出') {
        for (let i = 0; i < _roseChartSeries[1].length; i++) {
          if (bill.remark === _roseChartSeries[1][i].name) {
            _roseChartSeries[1][i].value += bill.money;
            return;
          }
        }
        _roseChartSeries[1].push({ name: bill.remark, value: bill.money });
      }
      //排序
      _roseChartSeries[0].sort((a: any, b: any) => a.value - b.value);
      _roseChartSeries[1].sort((a: any, b: any) => a.value - b.value);
    });
    return [_lineChartSeries, _roseChartSeries];
  };

  const generBarChart = (lineChartSeries: any) => {
    lineChart = echarts.init(document.getElementById('line-chart'), null);
    const lineChartOptons = {
      title: {
        text: '每日收支统计',
        textStyle: {
          fontSize: '14px',
        },
      },
      xAxis: {
        data: getLineChartXAxis(),
      },
      legend: {
        top: '0',
        right: '0',
        width: 150,
        itemWidth: 20,
      },
      dataZoom: [
        {
          moveHandleSize: 18,
          height: 18,
          bottom: 18,
          startValue: date.getDate() - 4,
          endValue: date.getDate(),
        },
      ],
      grid: {
        left: '10px',
        right: '10px',
        top: '45px',
        bottom: '60px',
      },
      tooltip: {
        formatter: `${dayjs(date).format('YYYY-MM')}-{b} {a} {c} 元`,
        textStyle: {
          fontSize: 10,
        },
        padding: [2, 4],
      },
      yAxis: {},
      series: [
        {
          type: 'bar',
          name: '支出',
          barMinHeight: 3,
          data: lineChartSeries[1],
          label: {
            show: true,
            position: 'top',
            textStyle: {
              fontSize: 9,
            },
          },
          barGap: '30%',
          barCategoryGap: '40%',
        },
        {
          type: 'bar',
          name: '收入',
          barMinHeight: 3,
          data: lineChartSeries[0],
          label: {
            show: true,
            position: 'top',
            textStyle: {
              fontSize: 9,
            },
          },
        },
      ],
    };
    lineChart.setOption(lineChartOptons);
  };

  const generRoseChart = (roseChartSeries: any) => {
    roseChart = echarts.init(document.getElementById('rose-chart'), null);
    const roseChartOptons = {
      title: {
        text: '收支构成',
        textStyle: {
          fontSize: '14px',
        },
      },
      grid: {
        containLabel: true,
      },
      legend: {
        top: 0,
        right: 0,
        selected: {
          支出: true,
          收入: false,
        },
        data: [{ name: '支出' }, { name: '收入' }],
      },
      tooltip: {},
      series: [
        {
          type: 'pie',
          name: '收入',
          radius: '55%',
          center: ['50%', '60%'],
          data: roseChartSeries[0],
          label: { width: 50, alignTo: 'labelLine', formatter: '{b}: {d}%', overflow: 'break' },
        },
        {
          type: 'pie',
          name: '支出',
          radius: '55%',
          center: ['50%', '60%'],
          data: roseChartSeries[1],
          label: { width: 200, alignTo: 'labelLine', formatter: '{b}: {d}%' },
        },
      ],
    };
    roseChart.setOption(roseChartOptons);
    //设置legend互斥
    roseChart.on('legendselectchanged', (params: any) => {
      const name: '支出' | '收入' = params.name;
      roseChartOptons.legend.selected = {
        支出: false,
        收入: false,
      };
      roseChartOptons.legend.selected[name] = true;
      roseChart.setOption(roseChartOptons);
    });
  };

  //获取x轴数据
  const getLineChartXAxis = () => {
    let days: number[] = [];
    //下个月第0天
    const tempDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    for (let i = 1; i <= tempDate.getDate(); i++) {
      days.push(i);
    }
    return days;
  };

  const confirmHandle = (value: any) => {
    setDate(value);
    setIsShowDatePicker(false);
  };

  return (
    <StatisWrapper>
      <div className="total">
        <div className="date" onClick={() => setIsShowDatePicker(true)}>
          <span>{dayjs(date).format('YYYY-MM')}</span>
          <CalendarO style={{ transform: 'translateY(3px)', fontSize: '17px' }} />
        </div>
        <div className="total-expense">共支出</div>
        <div className="total-expense-money">￥100.00</div>
        <div className="total-pay">共收入￥299.00</div>
      </div>
      <div className="bill-statis">
        <div id="line-chart"></div>
        <div id="rose-chart"></div>
      </div>
      <DatePicker
        visible={isShowDatePicker}
        value={date}
        columnType={['year', 'month']}
        onCancel={() => setIsShowDatePicker(false)}
        onConfirm={confirmHandle}
      />
    </StatisWrapper>
  );
};

export default memo(Statis);
