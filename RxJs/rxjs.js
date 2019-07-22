const { fromEvent, of, interval, empty } = rxjs;
const { map, filter, switchMap, merge, scan, tap } = rxjs.operators;
// const { map, filter } = rxjs.operators;

const obsButton = document.getElementById('obs-btn');


// Use 'fromEvent' helper function to create an observable from Event
// Accept to arguments, first is target and second the event
const btnObservable$ = fromEvent(obsButton, 'click');

// To create a subscription, you call the 'subscribe' method,
// supplying a function (or object) - also known as an 'observer'
// This is where you can decide how to react( which mean reactive programing) to each event.
const btnSubscription = btnObservable$.subscribe(event => console.log(event));
// console.log('btnSubscription: ', btnSubscription);

// Also we can pass to 'subscribe' method, observer object against cb function, which include properties:
// next, error and complete
const btnSubscription2 = btnObservable$.subscribe({
    next: event => console.log('next method from observer object'),
    error: error => console.log('error method from observer object'),
    complete: () => console.log('observer complete')
});

btnSubscription.unsubscribe();


/*
 *
 * Methods
 *
 */

// Sources:
const documentClick$ = fromEvent(document, 'click'); // Observable - click event on document
const interval_1s$ = interval(1000); // Observable - numbers each second

/*
 * 'of'
 * Allows you to deliver values in a sequence
 *
 * of(1, 2, 3) In this case it will emit 1,2,3 in order
 */

const dataSource$ = of(1, 2, 3, 5, 10); // create the stream of values: type number in this case

dataSource$.pipe(
    // multiple each value in 2
    map(value => value * 2),
    filter(value => value > 6)
).subscribe(value => console.log('value: ', value));

// I know:
// do (tap), of, interval, merge, empty, scan

// Need to learn:
// SwitchMap, MergeMap, forkJoin,

// Simple operators:

// 1. interval

/*const source = interval(100);
const subscribe = source.subscribe(val => console.log('val', val));

setTimeout(() => {
    subscribe.unsubscribe();
}, 3100);*/

// 2. merge

// 2.1 merge as the static method
/*merge(
    documentClick$, interval_1s$
).subscribe(event => console.log(event));*/

// 2.2 merge as instance method
// documentClick$.pipe(merge(interval_1s$)).subscribe(console.log);


// 3. empty
/*empty().subscribe({
    next: () => console.log('Next'),
    complete: () => console.log('Complete Empty observable!')
});*/

// 4. scan
// scan - create state

interval_1s$.pipe(
    tap(console.log),
    scan((acc, currValue) => {
        return acc + currValue;
    })
).subscribe(console.log);


/*
 * 1. SwitchMap
 *
 * Useful for canceling previous request and subscribe to the new one, on each new value comes
 */

// let btnSubscription3 = fromEvent(document, 'click')
//     .pipe(
//         // restart counter on every click
//         interval(2000)
//     )
//     .subscribe(console.log);

// Examples:


// 1. Restart interval on every click

// Just subscribe to each observable individually
// documentClick$.subscribe(event => console.log(Object.prototype.toString.call(event)));
// interval_1s$.subscribe(event => console.log(event));

// Now we want to restart timer on each click event
// For that we can use switchMap!

documentClick$.pipe(
    switchMap(() => interval_1s$)
).subscribe(event => console.log(event));

// 2. Countdown timer with pause and resume

