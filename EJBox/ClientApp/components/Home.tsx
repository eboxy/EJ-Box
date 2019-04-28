import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { PlayerMachine } from './PlayerMachine';


export class Home extends React.Component<RouteComponentProps<{}>, {}> {


    

    public render() {

        return <div>
            { /* 
            Home komponenten utskrift  
            */}
            
            

            <PlayerMachine
                
            />
        </div>;
    }
}