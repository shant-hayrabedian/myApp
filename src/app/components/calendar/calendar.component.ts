import {Component, OnDestroy, OnInit} from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import { formatDate } from '@fullcalendar/angular';
import {Subject, timer} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit , OnDestroy {
  birthday = new Date();
  // dates = {
  //   today: formatDate(new Date(), {
  //     month: 'long',
  //     year: 'numeric',
  //     day: 'numeric'
  //   })
  // };
  today;
  counter = timer(0, 1000);

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    weekends: true,
    dateClick: this.handleDateClick.bind(this), // bind is important!
    events: [
      { title: 'event 1', date: '2021-03-27' },
      { title: 'event 2', date: '2022-03-30' }
    ]
  };
  private unsubscribe$: Subject<any> = new Subject<any>();
  constructor() { }

  ngOnInit(): void {
    this.counter.pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
      this.todayDate();
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
  }

  todayDate() {
    const date = new Date();
    const second = date.getSeconds();
    const minute = date.getMinutes();
    const hour = date.getHours();
    this.today = hour + ':' + minute + ':' + second;
    // return 'Todays Date Is: ' + Object.values(this.dates)
    return ' , The Time Is: ' + this.today;
  }

  handleDateClick(arg) {
    alert('date click! ' + arg.dateStr);
  }

}
