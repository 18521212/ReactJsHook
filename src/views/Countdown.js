import { clear } from "@testing-library/user-event/dist/clear";
import React, {useState, useEffect} from "react";

class CountDown extends React.Component {
    state = {
        count: 10
    }

    componentDidMount() {
        this.timer = setInterval(() => {
            this.setState({
                count: this.state.count - 1
            })
        }, 1000);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.count !== this.state.count && this.state.count === 0) {
            if (this.timer) {
                clearInterval(this.timer);
                // this.props.onTimesup();
                console.log('prev ',prevState.count, 'state', this.state.count)
            }
        }
        //clearInterval(this.timer)
        console.log('c')
    }

    componentWillUnmount() {
        if (this.timer) {
            clearInterval(this.timer);
        }
    }

    render() {
        return (
            <div>{this.state.count} class</div>
        )
    }
}

const NewCountDown = (props) => {
    const [count, setCount] = useState(10);

    useEffect(() => {
        console.log('start')
        if (count === 0) {
            //props.onTimesup();
            return;
        }

        let timer = setInterval(() => {
           setCount(count -1); 
        }, 1000);

        return () => {
            clearInterval(timer)
            console.log('return')
        }
    }, [count]);

    return (
        <div>{count} hooks</div>
    )
}

export {CountDown, NewCountDown};