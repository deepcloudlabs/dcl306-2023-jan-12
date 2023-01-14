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

const socket = io("ws://localhost:5555");
function Market() {
    const [symbol, setSymbol] = useState("BTCUSDT");
    const [windowSize, setWindowSize] = useState(25);
    const [trades, setTrades] = useState([]);
    const [monitoringButtonState, setMonitoringButtonState] = useState({
        status: false,
        bgColor: "bg-success",
        label: "Start"
    });
    useEffect(()=>{
        socket.on("trade", (trade)=>{
            setTrades([...trades, trade]);
        });
        return ()=>{

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
                                   options={[25, 50, 100, 250]}
                                   handleChange={event => setWindowSize(event.target.value)}/>
                        <Label label="Window Size" htmlFor="windowSize"></Label>
                    </FormGroup>
                    <FormGroup>
                        <Button id="stopMonitor"
                                label={monitoringButtonState.label}
                                click={changeMonitoring}
                                bgColor={monitoringButtonState.bgColor}></Button>
                    </FormGroup>
                    <FormGroup>
                        <Table>
                            <TableHeader columns="Sequence,Trade ID,Symbol,Price,Quantity,Volume,Timestamp"/>
                            <TableBody>
                                {
                                    trades.map((trade, idx) =>
                                        <tr key={trade.sequence}>
                                            <td>{trade.sequence * idx}</td>
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
