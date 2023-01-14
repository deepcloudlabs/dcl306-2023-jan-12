import Container from "./component/common/card/container";
import Card from "./component/common/card/card";
import CardHeader from "./component/common/card/card-header";
import CardBody from "./component/common/card/card-body";
import FormGroup from "./component/common/output/form-group";
import SelectBox from "./component/common/input/select-box";
import {useEffect, useState} from "react";
import Label from "./component/common/output/label";
import Button from "./component/common/input/button";
import {tradeData} from "./utility/market-util";
import TableHeader from "./component/common/table/table-header";
import TableBody from "./component/common/table/table-body";
import Table from "./component/common/table/table";
import io from "socket.io-client";
import {Line} from "react-chartjs-2";
import {CategoryScale, Chart as ChartJS, Tooltip, Legend, LinearScale, LineElement, PointElement, Title} from "chart.js";

const socket = io("ws://localhost:5555");
const options = {
    responsive: true,
    animation: false,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'BINANCE Market Data',
        }
    }
};

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

function Market() {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [{
            label: 'BTC-USDT Price',
            fill: false,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderDashOffset: 0.0,
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: []
        }]
    });
    const [symbol, setSymbol] = useState("BTCUSDT");
    const [windowSize, setWindowSize] = useState(10);
    const [trades, setTrades] = useState([]);
    const [monitoringButtonState, setMonitoringButtonState] = useState({
        status: false,
        bgColor: "bg-success",
        label: "Start"
    });
    useEffect(() => {
        socket.on("trade", (trade) => {
            if (!monitoringButtonState.status) return;
            setTrades(trades => {
                let newTrades = [...trades, trade];
                if (newTrades.length > windowSize) {
                    const start = newTrades.length - windowSize;
                    return newTrades.slice(start);
                }
                return newTrades;
            });
            setChartData(chartData => {
                let newChardData = {...chartData};
                newChardData.datasets = [...chartData.datasets];
                newChardData.datasets[0].data = [...chartData.datasets[0].data, trade.price];
                newChardData.labels = [...chartData.labels, trade.timestamp];
                if (newChardData.labels.length > windowSize) {
                    const start = newChardData.labels.length - windowSize;
                    newChardData.labels = newChardData.labels.slice(start);
                }
                if (newChardData.datasets[0].data.length > windowSize) {
                    const start = newChardData.datasets[0].data.length - windowSize;
                    newChardData.datasets[0].data = newChardData.datasets[0].data.slice(start);
                }
                return newChardData;
            })
        });
        return () => {
            socket.off("trade");
        }
    });

    function changeMonitoring(event) {
        const newMonitoringButtonState = {...monitoringButtonState};

        if (newMonitoringButtonState.status) {
            newMonitoringButtonState.label = "Start";
            newMonitoringButtonState.bgColor = "bg-success";
        } else {
            newMonitoringButtonState.label = "Stop";
            newMonitoringButtonState.bgColor = "bg-danger";
        }
        newMonitoringButtonState.status = !monitoringButtonState.status;
        setMonitoringButtonState(newMonitoringButtonState);
    }

    return (
        <Container>
            <Card>
                <CardHeader title="Market Data"/>
                <CardBody>
                    <FormGroup className="form-floating">
                        <SelectBox id="symbol"
                                   value={symbol}
                                   options={["BTCUSDT", "ETHBTC", "BNBBTC"]}
                                   handleChange={event => setSymbol(event.target.value)}/>
                        <Label label="Symbol" htmlFor="symbol"></Label>
                    </FormGroup>
                    <FormGroup className="form-floating">
                        <SelectBox id="windowSize"
                                   value={windowSize}
                                   options={[10, 25, 50, 100, 250]}
                                   handleChange={event => setWindowSize(Number(event.target.value))}/>
                        <Label label="Window Size" htmlFor="windowSize"></Label>
                    </FormGroup>
                    <FormGroup>
                        <Button id="stopMonitor"
                                label={monitoringButtonState.label}
                                click={changeMonitoring}
                                bgColor={monitoringButtonState.bgColor}></Button>
                    </FormGroup>
                    <FormGroup>
                        <Line data={chartData}
                              width={640}
                              height={490}
                              options={options}/>
                    </FormGroup>
                    <FormGroup>
                        <Table>
                            <TableHeader columns="No,Sequence,Trade ID,Symbol,Price,Quantity,Volume,Timestamp"/>
                            <TableBody>
                                {
                                    trades.map((trade, idx) =>
                                        <tr key={trade.sequence}>
                                            <td>{idx + 1}</td>
                                            <td>{trade.sequence}</td>
                                            <td>{trade.tradeId}</td>
                                            <td>{trade.symbol}</td>
                                            <td>{trade.price}</td>
                                            <td>{trade.quantity}</td>
                                            <td>{Number(trade.price * trade.quantity).toFixed(0)}</td>
                                            <td>{trade.timestamp}</td>
                                        </tr>
                                    )
                                }
                            </TableBody>
                        </Table>
                    </FormGroup>
                </CardBody>
            </Card>
        </Container>
    );
}

export default Market;
