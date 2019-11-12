import React from 'react';
import {Route} from 'react-router-dom';
import DashboardContainer from '../../feature/dashboard/dashboard_container';
import PaymentContainer from '../../feature/payment/payment_container';
import PaymentHistoryContainer from '../../feature/payment_history/payment_history_container';
import LogOutContainer from '../../feature/log_out/log_out_container';
import SendToInvoiceContainer from '../../feature/payment/send_payment_to_invoice/send_to_invoice_container';
import SentToExternalContainer from '../../feature/payment/sent_payment_to_external/sent_to_external_container';


const Routes = () => (
    <div>
        <Route exact path="/" component={DashboardContainer}/>
        <Route exact path="/opprett-ordre" component={PaymentContainer}/>
        <Route exact path="/ordrehistorikk" component={PaymentHistoryContainer}/>
        <Route exact path="/logg-ut" component={LogOutContainer}/>
        <Route exact path="/send-ordrer" component={SendToInvoiceContainer}/>
        <Route exact path="/ordre-sendt" component={SentToExternalContainer}/>

    </div>

);

export default Routes;
