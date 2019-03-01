import { Component, OnInit } from '@angular/core';
import { SwPush, SwUpdate } from '@angular/service-worker';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = environment.production;

  readonly VAPID_PUBLIC_KEY = 'BLSKBIHrsFCeLUO3FwI95mfSubQiZlno-CTZPDBBoTH6P4CQ-SnEZtlBNM-TWRlk-u3Q36JdjLLk69WYNWJ2rOw';

  // keys = {
  //   "publicKey": "BLSKBIHrsFCeLUO3FwI95mfSubQiZlno-CTZPDBBoTH6P4CQ-SnEZtlBNM-TWRlk-u3Q36JdjLLk69WYNWJ2rOw",
  //   "privateKey": "d-FafnJ0zkCN3zH0Vvz9arsvCX15oMk8WmyJyBjWFM0"
  // };

  constructor(private swUpdate: SwUpdate,
              private swPush: SwPush) {
  }

  public subscribeToNotifications(): void {

    this.swPush.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC_KEY
    })
      .then((subscription) => console.log(JSON.stringify(subscription)))
      .catch(err => console.error('Could not subscribe to notifications', err));
  }

  public ngOnInit() {

    if (this.swUpdate.isEnabled) {

      this.swUpdate.available.subscribe(() => {

        if (confirm("New version available. Load New Version?")) {
          window.location.reload();
        }

      });

    }



  }
}
