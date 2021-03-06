/*
 *  Copyright (c) 2017, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 *  WSO2 Inc. licenses this file to you under the Apache License,
 *  Version 2.0 (the "License"); you may not use this file except
 *  in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing,
 *  software distributed under the License is distributed on an
 *  "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 *  KIND, either express or implied.  See the License for the
 *  specific language governing permissions and limitations
 *  under the License.
 *
 */

import React, { Component } from 'react';

export default class Widget extends Component {
    constructor() {
        super();
        this.getDashboardAPI = this.getDashboardAPI.bind(this);
    }



    render () {
        let styles = {
            padding: '30px 15px 15px 15px'
        };
        return (
            <div style={styles}>  
                {this.renderWidget()}
            </div>
        );
    }

    /**
     * Returns the dashboards API functions.
     */
    getDashboardAPI() {
        let that = this;
        function getStateObject() {
            // De-serialize the object in suitable format
            return (window.location.hash === '' || window.location.hash === '#') ? 
                {} : JSON.parse(window.location.hash.substr(1));   
        }

        function setStateObject(state) {
            // Serialize the object in suitable format
            window.location.hash = JSON.stringify(state);
        }

        function getLocalState() {
            let allStates = getStateObject();
            return allStates.hasOwnProperty(that.props.id) ? allStates[that.props.id] : {};
        }

        function setLocalState(state) {
            let allStates = getStateObject();
            allStates[that.props.id] = state;
            setStateObject(allStates);
        } 

        return {
            state: {
                get: function(key) {
                    let state = getLocalState();
                    return state.hasOwnProperty(key) ? state[key] : null; 
                },
                set: function(key, value) {
                    let state = getLocalState();
                    state[key] = value;
                    setLocalState(state);
                }
            }
        };
    }
}