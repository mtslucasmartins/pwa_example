import { Component } from '@angular/core';
import { SwPush } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pwa-zapcontabil';

  readonly VAPID_PUBLIC_KEY = 'BLSKBIHrsFCeLUO3FwI95mfSubQiZlno-CTZPDBBoTH6P4CQ-SnEZtlBNM-TWRlk-u3Q36JdjLLk69WYNWJ2rOw';

  // keys = {
  //   "publicKey": "BLSKBIHrsFCeLUO3FwI95mfSubQiZlno-CTZPDBBoTH6P4CQ-SnEZtlBNM-TWRlk-u3Q36JdjLLk69WYNWJ2rOw",
  //   "privateKey": "d-FafnJ0zkCN3zH0Vvz9arsvCX15oMk8WmyJyBjWFM0"
  // };

  constructor(
    private swPush: SwPush) { }

  public subscribeToNotifications(): void {

    this.swPush.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC_KEY
    })
      .then((subscription) => console.log(JSON.stringify(subscription)))
      .catch(err => console.error('Could not subscribe to notifications', err));
  }

}
