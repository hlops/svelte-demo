import * as rxjs from "rxjs";
import * as rxjsOperators from "rxjs/operators";
import { Repo } from "./Client";

const modifiedRepos = new rxjs.Subject<Repo>();

abstract class Tracker {
  private readonly subscriptions: rxjs.Unsubscribable[] = [];

  public subscribe(subscription: rxjs.Unsubscribable): void {
    this.subscriptions.push(subscription);
  }

  public subscribeStore(unsubscribe: () => void): void {
    this.subscriptions.push({ unsubscribe });
  }

  public onDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}

const DEBOUNCE_TIME = 3000;

export class ModifiedReposTracker extends Tracker {
  constructor() {
    super();
    this.subscribe(
      modifiedRepos
        .pipe(rxjsOperators.buffer(modifiedRepos.pipe(rxjsOperators.debounceTime(DEBOUNCE_TIME))))
        .subscribe(value => {
          console.log(
            "value was changed:",
            value.map(r => [r.id, r.watchers_count, r.description])
          );
        })
    );
  }

  public push(repo: Repo): void {
    modifiedRepos.next({
      id: repo.id,
      name: repo.name,
      description: repo.description,
      html_url: repo.html_url,
      watchers_count: repo.watchers_count
    });
  }
}
