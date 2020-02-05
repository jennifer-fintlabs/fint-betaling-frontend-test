import React from 'react';
import { Route } from 'react-router-dom';
import DashboardContainer from '../../feature/dashboard/dashboard-container';
import PaymentContainer from '../../feature/payment/payment_container';
import PaymentHistoryContainer from '../../feature/payment_history/payment_history_container';
import LogOutContainer from '../../feature/log_out/log_out_container';
import SendToInvoiceContainer from '../../feature/payment/send_payment_to_invoice/send_to_invoice_container';
import SentToExternalContainer from '../../feature/payment/sent_payment_to_external/sent_to_external_container';


const Routes = () => (
    <div>
        <Route exact path="/" component={DashboardContainer} />
        <Route exact path="/betaling/ny" component={PaymentContainer} />
        <Route exact path="/betaling/historikk" component={PaymentHistoryContainer} />
        <Route exact path="/betaling/send" component={SendToInvoiceContainer} />
        <Route exact path="/betaling/sendt" component={SentToExternalContainer} />
        <Route exact path="/logg-ut" component={LogOutContainer} />

    </div>

);

export default Routes;
