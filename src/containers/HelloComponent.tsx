import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import {
    Card,
} from 'reactstrap';
import {
    dynamicPropTypes,
    TComponentSate,
    TDispatchToPropsParams,
    TMapStateToProps,
    TPassedProps,
    TProps
} from '../store/helloComponent/types';
// import * as Selectors from '../store/helloComponent/selectors';

// import * as Actions from '../store/helloComponent/action';

class ChannelPage extends Component<TProps, TComponentSate> {

    static propTypes = dynamicPropTypes;

    public constructor(props: TProps) {
        super(props);
    }

    /**
     * Render channel page
     * @returns {any}
     */
    public render() {
        return (
            <Card className={'helloComponent'}>
                <div className={'helloContent'}>
                    <h1>Welcome to super Chat!</h1>
                    <h2>Pick the channel left to start chatting.</h2>
                    <br/>
                    <h2>Enjoy:)</h2>
                </div>
            </Card>
        );
    }
}

export default connect<TMapStateToProps, TDispatchToPropsParams, TPassedProps>(
    (state) => ({
        // state to props
    }),
    {
        // dispatch functions
    }
)(ChannelPage);